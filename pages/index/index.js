/**
 * 首页：灵感配方流 Palette Flow
 * 展示精选配色方案，支持氛围筛选和色彩探索
 */

const paletteData = require('../../data/palettes');
const colorUtil = require('../../utils/color');
const app = getApp();

// 每日推荐文案池
const dailyTips = [
  '试试大地色系，秋冬永不出错',
  '蓝色是最百搭的非黑白色',
  '同色系穿搭最显高级',
  '撞色不可怕，比例是关键',
  '一身不超过三个颜色',
  '用点缀色提亮整体造型',
  '冷暖对比让穿搭更有层次'
];

Page({
  data: {
    palettes: [], // 当前展示的配色方案
    currentVibe: 'all', // 当前氛围筛选
    exploreColor: null, // 当前探索的颜色
    showExploreToast: false,
    loading: false,
    refreshing: false,
    hasMore: true,
    page: 1,
    pageSize: 6,

    // 每日推荐
    showDailyTip: false,
    dailyTipText: '',

    // 详情弹窗
    showDetail: false,
    detailPalette: null,
    vibeTagMap: {
      chill: '☕ 日常',
      pro: '💼 职场',
      date: '💕 约会',
      art: '🎨 艺术'
    },

    // 新手引导
    showOnboarding: false,

    // 分享海报
    showSharePoster: false,
    posterPalette: null
  },

  onLoad(options) {
    // 检查是否需要新手引导
    this.checkOnboarding();

    // 显示每日推荐
    this.showDailyRecommend();

    // 处理 URL 参数（如从分享链接进入）
    if (options.paletteId) {
      this.handleSharedPalette(options.paletteId);
    }

    this.loadPalettes();
  },

  onShow() {
    // 设置自定义 tabBar 选中状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 });
    }

    // 检查是否有跨页面传递的色彩探索请求
    const pendingColor = app.consumePendingColorExplore();
    if (pendingColor) {
      this.onColorClick({ detail: { color: pendingColor } });
      return;
    }

    // 刷新收藏状态
    if (this.data.palettes.length > 0) {
      this.setData({ palettes: [...this.data.palettes] });
    }
  },

  // 检查是否需要显示新手引导
  checkOnboarding() {
    try {
      const hasOnboarded = wx.getStorageSync('hasOnboarded');
      if (!hasOnboarded) {
        this.setData({ showOnboarding: true });
      }
    } catch (e) {
      // 存储读取失败，不显示引导
    }
  },

  // 新手引导完成
  onOnboardingComplete() {
    this.setData({ showOnboarding: false });
    try {
      wx.setStorageSync('hasOnboarded', true);
    } catch (e) {
      // 静默失败
    }
  },

  // 每日推荐逻辑
  showDailyRecommend() {
    const today = new Date().toDateString();
    // 用日期做种子，每天推荐不同内容
    const seed = today.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const tipIndex = seed % dailyTips.length;

    this.setData({
      showDailyTip: true,
      dailyTipText: dailyTips[tipIndex]
    });
  },

  // 处理分享链接中的配色方案
  handleSharedPalette(paletteId) {
    const palette = paletteData.getPaletteById(paletteId);
    if (palette) {
      setTimeout(() => {
        this.setData({
          showDetail: true,
          detailPalette: palette
        });
      }, 500);
    }
  },

  // 加载配色方案
  loadPalettes(reset = true) {
    if (this.data.loading) return;

    this.setData({ loading: true });

    setTimeout(() => {
      let allPalettes;

      if (this.data.exploreColor) {
        allPalettes = paletteData.getColorVariations(this.data.exploreColor.hex);
      } else {
        allPalettes = paletteData.filterByVibe(this.data.currentVibe);
      }

      // 下拉刷新时随机打乱顺序
      if (reset && this.data.refreshing) {
        allPalettes = this.shuffleWithSeed(allPalettes);
      }

      const page = reset ? 1 : this.data.page;
      const start = (page - 1) * this.data.pageSize;
      const end = start + this.data.pageSize;
      const newPalettes = allPalettes.slice(start, end);

      this.setData({
        palettes: reset ? newPalettes : [...this.data.palettes, ...newPalettes],
        page: page + 1,
        hasMore: end < allPalettes.length,
        loading: false,
        refreshing: false
      });
    }, 100);
  },

  // 随机打乱数组（每次刷新不同顺序）
  shuffleWithSeed(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  // 氛围筛选变化
  onVibeChange(e) {
    const { value } = e.detail;

    this.setData({
      currentVibe: value,
      exploreColor: null,
      showExploreToast: false,
      page: 1
    });

    this.loadPalettes(true);

    const vibeLabels = paletteData.vibeLabels;
    wx.showToast({
      title: `切换到${vibeLabels[value]}`,
      icon: 'none',
      duration: 1500
    });
  },

  // 色块点击 - 触发色彩探索
  onColorClick(e) {
    const { color } = e.detail;

    this.setData({
      exploreColor: color,
      showExploreToast: true,
      currentVibe: 'all',
      page: 1
    });

    this.loadPalettes(true);

    setTimeout(() => {
      this.setData({ showExploreToast: false });
    }, 3000);
  },

  // 清除探索状态
  clearExplore() {
    this.setData({
      exploreColor: null,
      showExploreToast: false,
      page: 1
    });

    this.loadPalettes(true);
  },

  // 卡片点击 - 显示详情
  onCardTap(e) {
    const { palette } = e.detail;

    this.setData({
      showDetail: true,
      detailPalette: palette
    });
  },

  // 关闭详情
  closeDetail() {
    this.setData({ showDetail: false });
  },

  // 阻止事件冒泡
  preventClose() {},

  // 显示海报
  showPoster() {
    this.setData({
      showSharePoster: true,
      posterPalette: this.data.detailPalette
    });
  },

  // 关闭海报
  closePoster() {
    this.setData({ showSharePoster: false });
  },

  // 收藏状态变化
  onCollectChange(e) {
    // 收藏状态已在组件内处理
  },

  // 下拉刷新
  onRefresh() {
    this.setData({ refreshing: true, page: 1 });
    this.loadPalettes(true);
  },

  // 加载更多
  onLoadMore() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadPalettes(false);
    }
  },

  // 分享配置
  onShareAppMessage(options) {
    const palette = options.target?.dataset?.palette || this.data.detailPalette;

    if (palette) {
      return {
        title: `${palette.emoji} 这个穿搭配方绝了！朋友都问我怎么搭的`,
        path: `/pages/index/index?paletteId=${palette.id}`,
        imageUrl: palette.image || ''
      };
    }

    return {
      title: '每天打开衣柜不知道穿什么？这个配色神器帮你 10 秒搞定',
      path: '/pages/index/index'
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '穿搭配色不用想，打开就有现成配方',
      query: ''
    };
  }
});

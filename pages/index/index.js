/**
 * 首页：灵感配方流 Palette Flow
 * 展示精选配色方案，支持氛围筛选和色彩探索
 */

const paletteData = require('../../data/palettes');
const colorUtil = require('../../utils/color');

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

    // 详情弹窗
    showDetail: false,
    detailPalette: null
  },

  onLoad() {
    this.loadPalettes();
  },

  onShow() {
    // 设置自定义 tabBar 选中状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 });
    }

    // 刷新收藏状态
    if (this.data.palettes.length > 0) {
      this.setData({ palettes: [...this.data.palettes] });
    }
  },

  // 加载配色方案
  loadPalettes(reset = true) {
    if (this.data.loading) return;

    this.setData({ loading: true });

    // 模拟加载延迟
    setTimeout(() => {
      let allPalettes;

      // 根据筛选条件获取数据
      if (this.data.exploreColor) {
        // 色彩探索模式
        allPalettes = paletteData.getColorVariations(this.data.exploreColor.hex);
      } else {
        // 普通筛选模式
        allPalettes = paletteData.filterByVibe(this.data.currentVibe);
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
    }, 500);
  },

  // 氛围筛选变化
  onVibeChange(e) {
    const { value } = e.detail;

    // 清除色彩探索状态
    this.setData({
      currentVibe: value,
      exploreColor: null,
      showExploreToast: false,
      page: 1
    });

    this.loadPalettes(true);

    // 显示筛选反馈
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
      currentVibe: 'all', // 重置筛选
      page: 1
    });

    this.loadPalettes(true);

    // 3秒后隐藏提示
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

  // 防止详情内容点击冒泡
  preventClose() {
    // 空函数，阻止事件冒泡
  },

  // 收藏状态变化
  onCollectChange(e) {
    const { palette, isCollected } = e.detail;
    console.log('收藏状态变化:', palette.name, isCollected);
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
        title: `${palette.emoji} ${palette.name} - 你的穿搭配方`,
        path: `/pages/index/index?paletteId=${palette.id}`,
        imageUrl: palette.image || ''
      };
    }

    return {
      title: 'ColorMate - 不再凭感觉，穿搭有配方',
      path: '/pages/index/index'
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: 'ColorMate - 你的口袋色彩配方库',
      query: ''
    };
  }
});

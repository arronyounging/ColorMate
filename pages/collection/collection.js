/**
 * 收藏页面
 * 展示用户收藏的配色方案
 */

const app = getApp();

Page({
  data: {
    collections: [], // 收藏列表
    showDetail: false,
    detailPalette: null
  },

  onLoad() {
    this.loadCollections();
  },

  onShow() {
    // 设置自定义 tabBar 选中状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 });
    }

    // 每次显示时刷新收藏列表
    this.loadCollections();
  },

  // 加载收藏数据
  loadCollections() {
    const collections = app.globalData.collections || [];
    this.setData({ collections });
  },

  // 卡片点击 - 显示详情
  onCardTap(e) {
    const { palette } = e.detail;

    this.setData({
      showDetail: true,
      detailPalette: palette
    });
  },

  // 色块点击
  onColorClick(e) {
    const { color } = e.detail;

    // 使用全局数据传递，首页 onShow 时会检查
    app.setPendingColorExplore(color);

    // 跳转到首页
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  // 收藏状态变化
  onCollectChange(e) {
    const { isCollected } = e.detail;

    if (!isCollected) {
      // 刷新列表
      this.loadCollections();

      // 如果是在详情弹窗中取消收藏，关闭弹窗
      if (this.data.showDetail) {
        this.closeDetail();
      }
    }
  },

  // 从详情弹窗中取消收藏
  removePalette() {
    const palette = this.data.detailPalette;

    if (palette) {
      wx.showModal({
        title: '取消收藏',
        content: `确定要取消收藏「${palette.name}」吗？`,
        confirmText: '确定',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            app.removeCollection(palette.id);
            this.closeDetail();
            this.loadCollections();

            wx.showToast({
              title: '已取消收藏',
              icon: 'none'
            });
          }
        }
      });
    }
  },

  // 关闭详情弹窗
  closeDetail() {
    this.setData({ showDetail: false });
  },

  // 防止点击穿透
  preventClose() {
    // 空函数，阻止事件冒泡
  },

  // 跳转到灵感页
  goToExplore() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  // 分享配置
  onShareAppMessage(options) {
    const palette = options.target?.dataset?.palette || this.data.detailPalette;

    if (palette) {
      return {
        title: `${palette.emoji} ${palette.name} - 我收藏的穿搭配方`,
        path: `/pages/index/index?paletteId=${palette.id}`,
        imageUrl: palette.image || ''
      };
    }

    return {
      title: 'ColorMate - 不再凭感觉，穿搭有配方',
      path: '/pages/index/index'
    };
  }
});

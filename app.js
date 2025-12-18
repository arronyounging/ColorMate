// ColorMate - 您的口袋色彩配方库
// Slogan: 不再凭感觉，穿搭有配方。

App({
  globalData: {
    userInfo: null,
    collections: [], // 用户收藏的配色方案
    currentFilter: 'all', // 当前筛选条件
    pendingColorExplore: null, // 待处理的色彩探索（跨页面通信）
    maxCollections: 100 // 最大收藏数量
  },

  onLaunch() {
    // 初始化收藏数据
    this.loadCollections();
  },

  // 全局错误处理
  onError(error) {
    console.error('全局错误:', error);
    // 可以在这里上报错误日志
  },

  // 加载收藏数据
  loadCollections() {
    try {
      const collections = wx.getStorageSync('collections') || [];
      this.globalData.collections = collections;
    } catch (error) {
      console.error('加载收藏数据失败:', error);
      this.globalData.collections = [];
    }
  },

  // 保存收藏
  saveCollection(palette) {
    const collections = this.globalData.collections;
    const exists = collections.find(item => item.id === palette.id);

    if (exists) {
      return false;
    }

    // 检查收藏数量上限
    if (collections.length >= this.globalData.maxCollections) {
      wx.showToast({
        title: `最多收藏${this.globalData.maxCollections}个配方`,
        icon: 'none'
      });
      return false;
    }

    try {
      collections.unshift(palette);
      this.globalData.collections = collections;
      wx.setStorageSync('collections', collections);
      return true;
    } catch (error) {
      console.error('保存收藏失败:', error);
      // 回滚
      collections.shift();
      wx.showToast({
        title: '保存失败，请重试',
        icon: 'none'
      });
      return false;
    }
  },

  // 取消收藏
  removeCollection(paletteId) {
    try {
      const collections = this.globalData.collections.filter(
        item => item.id !== paletteId
      );
      this.globalData.collections = collections;
      wx.setStorageSync('collections', collections);
      return true;
    } catch (error) {
      console.error('取消收藏失败:', error);
      wx.showToast({
        title: '操作失败，请重试',
        icon: 'none'
      });
      return false;
    }
  },

  // 检查是否已收藏
  isCollected(paletteId) {
    return this.globalData.collections.some(item => item.id === paletteId);
  },

  // 设置待探索的颜色（跨页面通信）
  setPendingColorExplore(color) {
    this.globalData.pendingColorExplore = color;
  },

  // 获取并清除待探索的颜色
  consumePendingColorExplore() {
    const color = this.globalData.pendingColorExplore;
    this.globalData.pendingColorExplore = null;
    return color;
  }
});

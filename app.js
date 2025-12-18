// ColorMate - 您的口袋色彩配方库
// Slogan: 不再凭感觉，穿搭有配方。

App({
  globalData: {
    userInfo: null,
    collections: [], // 用户收藏的配色方案
    currentFilter: 'all', // 当前筛选条件
    currentColor: null // 当前探索的颜色
  },

  onLaunch() {
    // 初始化收藏数据
    this.loadCollections();
  },

  // 加载收藏数据
  loadCollections() {
    const collections = wx.getStorageSync('collections') || [];
    this.globalData.collections = collections;
  },

  // 保存收藏
  saveCollection(palette) {
    const collections = this.globalData.collections;
    const exists = collections.find(item => item.id === palette.id);

    if (!exists) {
      collections.unshift(palette);
      this.globalData.collections = collections;
      wx.setStorageSync('collections', collections);
      return true;
    }
    return false;
  },

  // 取消收藏
  removeCollection(paletteId) {
    const collections = this.globalData.collections.filter(
      item => item.id !== paletteId
    );
    this.globalData.collections = collections;
    wx.setStorageSync('collections', collections);
  },

  // 检查是否已收藏
  isCollected(paletteId) {
    return this.globalData.collections.some(item => item.id === paletteId);
  }
});

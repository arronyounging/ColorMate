/**
 * 自定义 TabBar 组件
 */

Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: '/pages/index/index',
        text: '灵感',
        icon: '✨'
      },
      {
        pagePath: '/pages/studio/studio',
        text: '搭配室',
        icon: '📷'
      },
      {
        pagePath: '/pages/collection/collection',
        text: '收藏',
        icon: '💝'
      }
    ]
  },

  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;

      wx.switchTab({
        url: url.startsWith('/') ? url : '/' + url
      });

      this.setData({
        selected: data.index
      });
    }
  }
});

/**
 * Vibe Filter 氛围滤镜组件
 * 用于筛选不同风格的配色方案
 */

Component({
  properties: {
    // 当前选中的筛选值
    current: {
      type: String,
      value: 'all'
    }
  },

  data: {
    filters: [
      { value: 'all', label: '全部', icon: '✨' },
      { value: 'chill', label: '松弛日常', icon: '☕' },
      { value: 'pro', label: '职场气场', icon: '💼' },
      { value: 'date', label: '约会浪漫', icon: '💕' },
      { value: 'art', label: '艺术撞色', icon: '🎨' }
    ]
  },

  methods: {
    // 筛选项点击
    onFilterTap(e) {
      const value = e.currentTarget.dataset.value;

      if (value !== this.properties.current) {
        this.triggerEvent('change', { value });

        // 震动反馈
        wx.vibrateShort({ type: 'light' });
      }
    }
  }
});

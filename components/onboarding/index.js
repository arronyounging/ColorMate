/**
 * 新手引导组件
 * 首次使用时展示，帮助用户理解核心功能
 */

Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },

  data: {
    currentStep: 0
  },

  methods: {
    // 下一步
    nextStep() {
      const next = this.data.currentStep + 1;
      if (next <= 2) {
        this.setData({ currentStep: next });
        wx.vibrateShort({ type: 'light' });
      }
    },

    // 完成引导
    finish() {
      this.setData({ currentStep: 0 });
      this.triggerEvent('complete');
      wx.vibrateShort({ type: 'medium' });
    },

    // 阻止滚动穿透
    preventScroll() {
      return;
    }
  }
});

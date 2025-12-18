/**
 * Color Bar 动态比例色条组件
 * 展示配色方案的颜色比例关系
 */

Component({
  properties: {
    // 颜色数组 [{hex, name, ratio, role}]
    colors: {
      type: Array,
      value: []
    },
    // 是否显示比例说明
    showLegend: {
      type: Boolean,
      value: false
    }
  },

  data: {
    activeColor: null
  },

  methods: {
    // 色块点击
    onSegmentTap(e) {
      const color = e.currentTarget.dataset.color;

      // 显示提示
      this.setData({ activeColor: color.hex });

      // 自动隐藏提示
      setTimeout(() => {
        this.setData({ activeColor: null });
      }, 2000);

      // 触发颜色点击事件
      this.triggerEvent('colorclick', {
        color: color
      });

      // 震动反馈
      wx.vibrateShort({ type: 'light' });
    }
  }
});

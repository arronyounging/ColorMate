/**
 * ColorMate Card 颜伴卡组件
 * 产品核心视觉单元
 */

const app = getApp();

Component({
  properties: {
    // 配色方案数据
    palette: {
      type: Object,
      value: {
        id: '',
        name: '配色方案',
        emoji: '🎨',
        colors: [],
        image: '',
        insight: {}
      }
    },
    // 是否显示动画
    animate: {
      type: Boolean,
      value: true
    },
    // 卡片索引（用于动画延迟）
    index: {
      type: Number,
      value: 0
    }
  },

  data: {
    isCollected: false,
    imageLoaded: false,
    imageError: false,
    animateClass: '',
    defaultImage: '/images/placeholder.svg'
  },

  lifetimes: {
    attached() {
      this.checkCollectionStatus();
      if (this.properties.animate) {
        this.playEnterAnimation();
      }
    }
  },

  observers: {
    'palette.id': function(id) {
      if (id) {
        this.checkCollectionStatus();
      }
    }
  },

  methods: {
    // 检查收藏状态
    checkCollectionStatus() {
      const paletteId = this.properties.palette?.id;
      if (paletteId) {
        const isCollected = app.isCollected(paletteId);
        this.setData({ isCollected });
      }
    },

    // 播放入场动画
    playEnterAnimation() {
      const delay = this.properties.index * 100;
      setTimeout(() => {
        this.setData({ animateClass: 'fade-in' });
      }, delay);
    },

    // 卡片点击事件
    onCardTap() {
      this.triggerEvent('cardtap', {
        palette: this.properties.palette
      });
    },

    // 色块点击事件（触发同色探索）
    onColorClick(e) {
      const { color } = e.detail;
      this.triggerEvent('colorclick', {
        color,
        palette: this.properties.palette
      });
    },

    // 收藏按钮点击
    onCollectTap() {
      const palette = this.properties.palette;
      const isCollected = this.data.isCollected;

      if (isCollected) {
        // 取消收藏
        app.removeCollection(palette.id);
        this.setData({ isCollected: false });
        wx.showToast({
          title: '已取消收藏',
          icon: 'none',
          duration: 1500
        });
      } else {
        // 添加收藏
        const success = app.saveCollection(palette);
        if (success) {
          this.setData({ isCollected: true });
          wx.showToast({
            title: '已收藏配方',
            icon: 'success',
            duration: 1500
          });
          // 触发收藏动画
          this.playCollectAnimation();
        }
      }

      this.triggerEvent('collectchange', {
        palette,
        isCollected: !isCollected
      });
    },

    // 收藏动画
    playCollectAnimation() {
      wx.vibrateShort({ type: 'light' });
    },

    // 图片加载完成
    onImageLoad() {
      this.setData({ imageLoaded: true, imageError: false });
    },

    // 图片加载失败
    onImageError() {
      this.setData({
        imageLoaded: true,
        imageError: true
      });
    }
  }
});

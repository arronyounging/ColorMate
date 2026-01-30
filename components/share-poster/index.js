/**
 * 分享海报生成组件
 * 使用 Canvas 2D 绘制精美配方卡海报
 */

Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    palette: {
      type: Object,
      value: null
    }
  },

  data: {
    canvasReady: false
  },

  observers: {
    'show, palette': function(show, palette) {
      if (show && palette) {
        this.drawPoster();
      }
    }
  },

  methods: {
    // 绘制海报
    drawPoster() {
      const query = this.createSelectorQuery();
      query.select('#posterCanvas')
        .fields({ node: true, size: true })
        .exec((res) => {
          if (!res || !res[0]) return;

          const canvas = res[0].node;
          const ctx = canvas.getContext('2d');
          const dpr = wx.getWindowInfo().pixelRatio;
          const width = 300;
          const height = 450;

          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.scale(dpr, dpr);

          this.renderPoster(ctx, width, height);
          this.setData({ canvasReady: true });
        });
    },

    // 渲染海报内容
    renderPoster(ctx, w, h) {
      const palette = this.properties.palette;
      if (!palette) return;

      // 背景
      ctx.fillStyle = '#FAFAFA';
      this.roundRect(ctx, 0, 0, w, h, 16);
      ctx.fill();

      // 顶部色条区域
      const barY = 30;
      const barH = 50;
      const barX = 24;
      const barW = w - 48;

      // 绘制配方名
      ctx.fillStyle = '#1A1A1A';
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`${palette.emoji} ${palette.name}`, barX, barY - 8);

      // 绘制色条
      let currentX = barX;
      palette.colors.forEach((color, index) => {
        const segW = (barW * color.ratio) / 100;
        ctx.fillStyle = color.hex;

        if (index === 0) {
          this.roundRectLeft(ctx, currentX, barY, segW, barH, 10);
        } else if (index === palette.colors.length - 1) {
          this.roundRectRight(ctx, currentX, barY, segW, barH, 10);
        } else {
          ctx.fillRect(currentX, barY, segW, barH);
        }
        ctx.fill();
        currentX += segW;
      });

      // 绘制颜色标注
      let labelY = barY + barH + 28;
      palette.colors.forEach((color) => {
        // 色点
        ctx.fillStyle = color.hex;
        this.roundRect(ctx, barX, labelY, 14, 14, 3);
        ctx.fill();

        // 色名
        ctx.fillStyle = '#1A1A1A';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(color.name, barX + 22, labelY + 11);

        // 比例
        ctx.fillStyle = '#999999';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`${color.ratio}%`, w - barX, labelY + 11);

        labelY += 26;
      });

      // 分割线
      const divY = labelY + 12;
      ctx.strokeStyle = '#EEEEEE';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(barX, divY);
      ctx.lineTo(w - barX, divY);
      ctx.stroke();

      // 穿搭配色展示区（用色块拼贴替代图片）
      const previewY = divY + 16;
      const previewH = h - previewY - 70;

      // 创意色块布局
      this.drawColorPreview(ctx, barX, previewY, barW, previewH, palette.colors);

      // 底部品牌区
      const footerY = h - 44;
      ctx.fillStyle = '#1A1A1A';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ColorMate', w / 2, footerY);

      ctx.fillStyle = '#999999';
      ctx.font = '9px sans-serif';
      ctx.fillText('你的口袋色彩配方库', w / 2, footerY + 16);
    },

    // 绘制色彩预览区
    drawColorPreview(ctx, x, y, w, h, colors) {
      const mainColor = colors[0] || { hex: '#CCC' };
      const secColor = colors[1] || { hex: '#EEE' };
      const accColor = colors[2] || { hex: '#FFF' };
      const gap = 6;

      // 主色大块
      ctx.fillStyle = mainColor.hex;
      this.roundRect(ctx, x, y, w * 0.62 - gap, h, 10);
      ctx.fill();

      // 右侧两块
      const rightX = x + w * 0.62 + gap;
      const rightW = w * 0.38 - gap;
      const topH = h * 0.55 - gap;
      const bottomH = h * 0.45;

      ctx.fillStyle = secColor.hex;
      this.roundRect(ctx, rightX, y, rightW, topH, 10);
      ctx.fill();

      ctx.fillStyle = accColor.hex;
      this.roundRect(ctx, rightX, y + topH + gap * 2, rightW, bottomH, 10);
      ctx.fill();

      // 在色块上标注文字
      ctx.fillStyle = this.getContrastColor(mainColor.hex);
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${mainColor.ratio}%`, x + (w * 0.62 - gap) / 2, y + h / 2);
      ctx.font = '10px sans-serif';
      ctx.fillText(mainColor.name, x + (w * 0.62 - gap) / 2, y + h / 2 + 18);
    },

    // 圆角矩形
    roundRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.arcTo(x + w, y, x + w, y + r, r);
      ctx.lineTo(x + w, y + h - r);
      ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
      ctx.lineTo(x + r, y + h);
      ctx.arcTo(x, y + h, x, y + h - r, r);
      ctx.lineTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
      ctx.closePath();
    },

    // 左圆角矩形
    roundRectLeft(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w, y);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.arcTo(x, y + h, x, y + h - r, r);
      ctx.lineTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
      ctx.closePath();
    },

    // 右圆角矩形
    roundRectRight(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + w - r, y);
      ctx.arcTo(x + w, y, x + w, y + r, r);
      ctx.lineTo(x + w, y + h - r);
      ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
      ctx.lineTo(x, y + h);
      ctx.closePath();
    },

    // 获取对比文字色
    getContrastColor(hex) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance > 0.5 ? '#1A1A1A' : '#FFFFFF';
    },

    // 保存到相册
    saveToAlbum() {
      const query = this.createSelectorQuery();
      query.select('#posterCanvas')
        .fields({ node: true })
        .exec((res) => {
          if (!res || !res[0]) return;

          const canvas = res[0].node;
          wx.canvasToTempFilePath({
            canvas,
            success: (result) => {
              wx.saveImageToPhotosAlbum({
                filePath: result.tempFilePath,
                success: () => {
                  wx.showToast({
                    title: '已保存，快去分享吧',
                    icon: 'success'
                  });
                },
                fail: () => {
                  wx.showToast({
                    title: '请允许访问相册',
                    icon: 'none'
                  });
                }
              });
            }
          });
        });
    },

    // 关闭
    close() {
      this.triggerEvent('close');
    },

    // 阻止冒泡
    prevent() {
      return;
    }
  }
});

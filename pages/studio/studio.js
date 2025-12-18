/**
 * AI 搭配室 Palette Studio
 * 用户上传单品图片，AI 生成专属配色方案
 */

const colorUtil = require('../../utils/color');
const api = require('../../utils/api');

Page({
  data: {
    uploadedImage: null, // 上传的图片
    generating: false, // 是否正在生成
    currentStep: 0, // 当前生成步骤
    generatedPalette: null, // 生成的配色方案
    vibeText: '日常休闲' // 场景描述
  },

  onShow() {
    // 设置自定义 tabBar 选中状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 });
    }
  },

  // 选择图片
  chooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        this.processImage(tempFilePath);
      },
      fail: (err) => {
        if (err.errMsg.indexOf('cancel') === -1) {
          wx.showToast({
            title: '选择图片失败',
            icon: 'none'
          });
        }
      }
    });
  },

  // 处理图片
  async processImage(imagePath) {
    this.setData({
      uploadedImage: imagePath,
      generating: true,
      currentStep: 0,
      generatedPalette: null
    });

    // 模拟 AI 分析过程
    await this.simulateAIProcess(imagePath);
  },

  // 模拟 AI 处理过程
  async simulateAIProcess(imagePath) {
    const vibes = ['日常休闲', '职场精英', '约会甜美', '艺术时尚'];
    const randomVibe = vibes[Math.floor(Math.random() * vibes.length)];

    this.setData({ vibeText: randomVibe });

    // Step 1: 提取色彩
    await this.delay(1200);
    this.setData({ currentStep: 1 });

    // Step 2: 匹配逻辑
    await this.delay(1500);
    this.setData({ currentStep: 2 });

    // Step 3: 构建场景
    await this.delay(1800);
    this.setData({ currentStep: 3 });

    // 完成
    await this.delay(800);
    this.generateResult(imagePath);
  },

  // 生成结果
  generateResult(imagePath) {
    // 模拟从图片中提取的主色
    const extractedColors = this.getRandomExtractedColors();

    // 生成配方名称
    const formulaNames = [
      { emoji: '☕', name: '温柔拿铁配方' },
      { emoji: '🌸', name: '樱花奶茶配方' },
      { emoji: '🍃', name: '清新薄荷配方' },
      { emoji: '🌊', name: '海洋微风配方' },
      { emoji: '🌅', name: '日落余晖配方' },
      { emoji: '🍇', name: '葡萄糖霜配方' },
      { emoji: '🧸', name: '奶油熊配方' },
      { emoji: '🎀', name: '蝴蝶结配方' }
    ];

    const formula = formulaNames[Math.floor(Math.random() * formulaNames.length)];

    // 构建配色方案
    const palette = {
      id: 'ai_' + Date.now(),
      name: formula.name,
      emoji: formula.emoji,
      vibe: this.getVibeCode(),
      colors: extractedColors,
      image: imagePath, // 使用用户上传的图片
      insight: this.generateInsight(extractedColors)
    };

    this.setData({
      generating: false,
      currentStep: 4,
      generatedPalette: palette
    });
  },

  // 随机生成提取的颜色
  getRandomExtractedColors() {
    const mainColors = [
      { hex: '#C4A484', name: '焦糖色' },
      { hex: '#8B7355', name: '燕麦棕' },
      { hex: '#6B8E23', name: '橄榄绿' },
      { hex: '#5F9EA0', name: '军校蓝' },
      { hex: '#9370DB', name: '中紫色' },
      { hex: '#CD5C5C', name: '印度红' },
      { hex: '#4682B4', name: '钢蓝色' },
      { hex: '#DDA0DD', name: '梅红色' }
    ];

    const secondaryColors = [
      { hex: '#6B8E9F', name: '雾霾蓝' },
      { hex: '#F5F5DC', name: '米色' },
      { hex: '#D2B48C', name: '棕褐色' },
      { hex: '#FFB6C1', name: '浅粉色' },
      { hex: '#87CEEB', name: '天空蓝' },
      { hex: '#98FB98', name: '薄荷绿' }
    ];

    const accentColors = [
      { hex: '#F5F5F5', name: '白烟色' },
      { hex: '#FFFFF0', name: '象牙色' },
      { hex: '#FAEBD7', name: '古白色' },
      { hex: '#1A1A1A', name: '墨黑色' },
      { hex: '#C0C0C0', name: '银色' }
    ];

    const main = mainColors[Math.floor(Math.random() * mainColors.length)];
    const secondary = secondaryColors[Math.floor(Math.random() * secondaryColors.length)];
    const accent = accentColors[Math.floor(Math.random() * accentColors.length)];

    return [
      { ...main, ratio: 60, role: 'main' },
      { ...secondary, ratio: 30, role: 'secondary' },
      { ...accent, ratio: 10, role: 'accent' }
    ];
  },

  // 获取氛围代码
  getVibeCode() {
    const vibeMap = {
      '日常休闲': 'chill',
      '职场精英': 'pro',
      '约会甜美': 'date',
      '艺术时尚': 'art'
    };
    return vibeMap[this.data.vibeText] || 'chill';
  },

  // 生成配色解读
  generateInsight(colors) {
    const mainColor = colors[0];
    const secondaryColor = colors[1];

    const whyTexts = [
      `${mainColor.name}作为主色调，传递出温暖柔和的视觉感受。搭配${secondaryColor.name}形成微妙的对比，既有层次感又不会过于跳跃。`,
      `选择${mainColor.name}作为60%的主色，是因为它具有很好的包容性。${secondaryColor.name}的加入让整体配色更加丰富立体。`,
      `这组配色遵循了经典的60-30-10黄金比例。${mainColor.name}奠定了整体基调，${secondaryColor.name}起到过渡和平衡的作用。`
    ];

    const tipsTexts = [
      `建议${mainColor.name}用于外套或裤装等大面积单品，${secondaryColor.name}作为内搭。肤色偏黄的话，可以用浅色作为离面部近的单品。`,
      `材质搭配建议：主色选择有质感的面料（如羊毛、丝绒），辅色可以选择棉麻等自然材质，增加层次感。`,
      `配饰选择：这组配色适合搭配金色调的首饰和配件，会让整体更加和谐精致。`
    ];

    return {
      why: whyTexts[Math.floor(Math.random() * whyTexts.length)],
      tips: tipsTexts[Math.floor(Math.random() * tipsTexts.length)]
    };
  },

  // 延迟函数
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  // 重置工作室
  resetStudio() {
    this.setData({
      uploadedImage: null,
      generating: false,
      currentStep: 0,
      generatedPalette: null
    });
  },

  // 卡片点击
  onCardTap(e) {
    // 可以展开更多详情
    console.log('Card tapped:', e.detail);
  },

  // 收藏状态变化
  onCollectChange(e) {
    const { palette, isCollected } = e.detail;
    console.log('收藏状态变化:', palette.name, isCollected);
  },

  // 分享
  onShareAppMessage() {
    const palette = this.data.generatedPalette;

    if (palette) {
      return {
        title: `${palette.emoji} ${palette.name} - 我的专属穿搭配方`,
        path: '/pages/studio/studio',
        imageUrl: palette.image || ''
      };
    }

    return {
      title: 'ColorMate AI 搭配室 - 获取你的专属配色配方',
      path: '/pages/studio/studio'
    };
  }
});

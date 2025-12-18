/**
 * ColorMate API 工具
 * 封装网络请求和 AI 相关功能
 */

const BASE_URL = 'https://api.colormate.app'; // 后端 API 地址（MVP 阶段可使用 mock）

/**
 * 通用请求封装
 */
function request(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}${options.url}`,
      method: options.method || 'GET',
      data: options.data,
      header: {
        'Content-Type': 'application/json',
        ...options.header
      },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          reject(new Error(res.data?.message || '请求失败'));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

/**
 * 模拟 AI 分析颜色（MVP 阶段使用本地算法）
 */
function analyzeColor(imageData) {
  return new Promise((resolve) => {
    // 模拟 AI 处理延迟
    setTimeout(() => {
      // 实际项目中，这里会调用后端 AI 接口
      // MVP 阶段返回模拟数据
      resolve({
        mainColor: '#C4A484',
        colorName: '焦糖色',
        suggestions: [
          { color: '#6B8E9F', name: '雾霾蓝', ratio: 30 },
          { color: '#F5F5F5', name: '白烟色', ratio: 10 }
        ]
      });
    }, 1500);
  });
}

/**
 * 生成配色方案（基于输入颜色）
 */
function generatePalette(mainColor, vibe = 'chill') {
  return new Promise((resolve) => {
    setTimeout(() => {
      // MVP 阶段的模拟配色逻辑
      const palettes = {
        chill: [
          { color: '#F5F5F5', name: '白烟色', ratio: 30 },
          { color: '#D3D3D3', name: '浅灰色', ratio: 10 }
        ],
        pro: [
          { color: '#1A1A1A', name: '墨黑色', ratio: 30 },
          { color: '#4A4A4A', name: '暗灰色', ratio: 10 }
        ],
        date: [
          { color: '#FFB6C1', name: '浅粉色', ratio: 30 },
          { color: '#FAEBD7', name: '古白色', ratio: 10 }
        ],
        art: [
          { color: '#FF6B6B', name: '珊瑚红', ratio: 30 },
          { color: '#4169E1', name: '皇家蓝', ratio: 10 }
        ]
      };

      resolve(palettes[vibe] || palettes.chill);
    }, 500);
  });
}

/**
 * 生成 AI 配色解读
 */
function generateInsight(palette) {
  const insights = {
    why: [
      '焦糖色属于暖色调，与雾霾蓝形成冷暖对比，营造出高级的视觉层次感。',
      '60-30-10 是经典的配色黄金比例，保证整体和谐不杂乱。',
      '米白色作为点缀中和了对比，让整体更加柔和耐看。'
    ],
    tips: [
      '肤色偏黄的姐妹可以把焦糖色放在下半身，远离面部更显白。',
      '材质建议：焦糖色选择有光泽感的面料（如皮革、缎面），雾霾蓝选择哑光棉麻。',
      '配饰选择：金色首饰 > 银色，更能呼应暖调主题。'
    ]
  };

  return Promise.resolve(insights);
}

/**
 * 图片上传（获取临时 URL）
 */
function uploadImage(filePath) {
  return new Promise((resolve, reject) => {
    // MVP 阶段返回本地路径
    // 实际项目中需要上传到云存储
    resolve({
      url: filePath,
      success: true
    });
  });
}

module.exports = {
  request,
  analyzeColor,
  generatePalette,
  generateInsight,
  uploadImage
};

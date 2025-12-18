/**
 * ColorMate 色彩处理工具
 * 提供颜色转换、分析、配色建议等功能
 */

// 常用颜色名称映射
const colorNames = {
  '#F5DEB3': '小麦色',
  '#D2691E': '巧克力色',
  '#8B4513': '马鞍棕',
  '#A0522D': '黄褐色',
  '#CD853F': '秘鲁色',
  '#DEB887': '实木色',
  '#F4A460': '沙棕色',
  '#D2B48C': '棕褐色',
  '#BC8F8F': '玫瑰棕',
  '#C4A484': '焦糖色',
  '#8B7355': '燕麦棕',
  '#6B8E23': '橄榄绿',
  '#556B2F': '深橄榄绿',
  '#808000': '橄榄色',
  '#2E8B57': '海洋绿',
  '#3CB371': '中海绿',
  '#228B22': '森林绿',
  '#006400': '深绿色',
  '#98FB98': '薄荷绿',
  '#90EE90': '淡绿色',
  '#00FA9A': '春绿色',
  '#4169E1': '皇家蓝',
  '#6495ED': '矢车菊蓝',
  '#87CEEB': '天空蓝',
  '#B0C4DE': '淡钢蓝',
  '#778899': '暗灰蓝',
  '#708090': '石板灰',
  '#5F9EA0': '军校蓝',
  '#4682B4': '钢蓝色',
  '#6B8E9F': '雾霾蓝',
  '#87CEFA': '淡天蓝',
  '#ADD8E6': '淡蓝色',
  '#E6E6FA': '薰衣草',
  '#D8BFD8': '蓟紫色',
  '#DDA0DD': '梅红色',
  '#DA70D6': '兰花紫',
  '#BA55D3': '中兰紫',
  '#9370DB': '中紫色',
  '#8A2BE2': '蓝紫色',
  '#9400D3': '深紫色',
  '#800080': '紫色',
  '#4B0082': '靛青色',
  '#FF6B6B': '珊瑚红',
  '#FF7F50': '珊瑚色',
  '#FA8072': '鲑鱼色',
  '#E9967A': '深鲑色',
  '#F08080': '浅珊瑚',
  '#CD5C5C': '印度红',
  '#DC143C': '猩红色',
  '#B22222': '耐火砖',
  '#8B0000': '深红色',
  '#FFB6C1': '浅粉色',
  '#FF69B4': '热粉色',
  '#FF1493': '深粉色',
  '#DB7093': '苍紫罗兰',
  '#C71585': '中紫红',
  '#FFF8DC': '玉米丝',
  '#FFFACD': '柠檬绸',
  '#FAFAD2': '淡秋麒麟',
  '#FFEFD5': '番木瓜',
  '#FFE4B5': '鹿皮色',
  '#FFDAB9': '桃色',
  '#EEE8AA': '灰金菊',
  '#F0E68C': '卡其色',
  '#BDB76B': '深卡其',
  '#FFFFE0': '浅黄色',
  '#FFFFF0': '象牙色',
  '#F5F5DC': '米色',
  '#FAF0E6': '亚麻色',
  '#FDF5E6': '古董白',
  '#FAEBD7': '古白色',
  '#FFEAEA': '淡玫瑰',
  '#1A1A1A': '墨黑色',
  '#2C2C2C': '炭灰色',
  '#333333': '深灰色',
  '#4A4A4A': '暗灰色',
  '#666666': '灰色',
  '#808080': '中灰色',
  '#A9A9A9': '暗银色',
  '#C0C0C0': '银色',
  '#D3D3D3': '浅灰色',
  '#DCDCDC': '亮灰色',
  '#F5F5F5': '白烟色',
  '#FFFAF0': '花白色',
  '#FFFFFF': '纯白色'
};

/**
 * HEX 转 RGB
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * RGB 转 HEX
 */
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('').toUpperCase();
}

/**
 * RGB 转 HSL
 */
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * 获取颜色的中文名称
 */
function getColorName(hex) {
  const upperHex = hex.toUpperCase();
  if (colorNames[upperHex]) {
    return colorNames[upperHex];
  }

  // 找最接近的颜色名称
  const rgb = hexToRgb(hex);
  if (!rgb) return '未知色';

  let minDistance = Infinity;
  let closestName = '未知色';

  for (const [colorHex, name] of Object.entries(colorNames)) {
    const colorRgb = hexToRgb(colorHex);
    if (colorRgb) {
      const distance = Math.sqrt(
        Math.pow(rgb.r - colorRgb.r, 2) +
        Math.pow(rgb.g - colorRgb.g, 2) +
        Math.pow(rgb.b - colorRgb.b, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestName = name;
      }
    }
  }

  return closestName;
}

/**
 * 判断颜色是否为浅色（用于文字颜色适配）
 */
function isLightColor(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return true;

  // 使用相对亮度公式
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5;
}

/**
 * 获取互补色
 */
function getComplementaryColor(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  return rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b);
}

/**
 * 获取类似色（色相偏移）
 */
function getAnalogousColors(hex, offset = 30) {
  const rgb = hexToRgb(hex);
  if (!rgb) return [hex, hex];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const hsl1 = { ...hsl, h: (hsl.h + offset) % 360 };
  const hsl2 = { ...hsl, h: (hsl.h - offset + 360) % 360 };

  return [hslToHex(hsl1), hslToHex(hsl2)];
}

/**
 * HSL 转 HEX
 */
function hslToHex(hsl) {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
}

/**
 * 计算两个颜色的相似度（0-100，100为完全相同）
 */
function colorSimilarity(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (!rgb1 || !rgb2) return 0;

  const distance = Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
    Math.pow(rgb1.g - rgb2.g, 2) +
    Math.pow(rgb1.b - rgb2.b, 2)
  );

  // 最大距离为 sqrt(255^2 * 3) ≈ 441.67
  return Math.round((1 - distance / 441.67) * 100);
}

/**
 * 判断颜色色相类型
 */
function getColorCategory(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 'unknown';

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const h = hsl.h;
  const s = hsl.s;
  const l = hsl.l;

  // 灰度色
  if (s < 10) {
    if (l < 20) return 'black';
    if (l > 80) return 'white';
    return 'gray';
  }

  // 根据色相判断
  if (h < 15 || h >= 345) return 'red';
  if (h < 45) return 'orange';
  if (h < 65) return 'yellow';
  if (h < 150) return 'green';
  if (h < 210) return 'cyan';
  if (h < 270) return 'blue';
  if (h < 290) return 'purple';
  if (h < 345) return 'pink';

  return 'unknown';
}

module.exports = {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToHex,
  getColorName,
  isLightColor,
  getComplementaryColor,
  getAnalogousColors,
  colorSimilarity,
  getColorCategory,
  colorNames
};

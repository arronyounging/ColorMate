/**
 * ColorMate 配色方案数据
 * 包含精心策划的配色配方，用于灵感流展示
 */

const palettes = [
  // 焦糖系列
  {
    id: 'p001',
    name: '焦糖拿铁配方',
    emoji: '🍂',
    vibe: 'chill',
    colors: [
      { hex: '#C4A484', name: '焦糖色', ratio: 60, role: 'main' },
      { hex: '#6B8E9F', name: '雾霾蓝', ratio: 30, role: 'secondary' },
      { hex: '#F5F5F5', name: '白烟色', ratio: 10, role: 'accent' }
    ],
    image: '/images/outfits/caramel-latte.jpg',
    insight: {
      why: '焦糖色的暖调与雾霾蓝的冷调形成优雅对比，白色点缀提亮整体，营造秋冬的温暖高级感。',
      tips: '建议焦糖色用于大面积外套，雾霾蓝作为内搭或下装，白色用于配饰或鞋履。'
    }
  },
  {
    id: 'p002',
    name: '可可慕斯配方',
    emoji: '🧸',
    vibe: 'chill',
    colors: [
      { hex: '#8B7355', name: '燕麦棕', ratio: 60, role: 'main' },
      { hex: '#F5F5DC', name: '米色', ratio: 30, role: 'secondary' },
      { hex: '#FAEBD7', name: '古白色', ratio: 10, role: 'accent' }
    ],
    image: '/images/outfits/cocoa-mousse.jpg',
    insight: {
      why: '同色系深浅搭配，用色阶差异创造层次，整体柔和统一，是最不易出错的高级配色。',
      tips: '适合肤色偏白的人群，黄皮可以把深色放在下半身。'
    }
  },
  {
    id: 'p003',
    name: '焦糖奶茶配方',
    emoji: '🥛',
    vibe: 'chill',
    colors: [
      { hex: '#D2B48C', name: '棕褐色', ratio: 60, role: 'main' },
      { hex: '#FFFAF0', name: '花白色', ratio: 30, role: 'secondary' },
      { hex: '#DEB887', name: '实木色', ratio: 10, role: 'accent' }
    ],
    image: '/images/outfits/caramel-tea.jpg',
    insight: {
      why: '奶茶色系的经典组合，温柔治愈，是秋冬最安全的选择。',
      tips: '全身同色系时，注意材质的差异化，如针织+皮革+羊绒。'
    }
  },

  // 蓝色系列
  {
    id: 'p004',
    name: '北欧日落调',
    emoji: '🌊',
    vibe: 'art',
    colors: [
      { hex: '#5F9EA0', name: '军校蓝', ratio: 60, role: 'main' },
      { hex: '#F4A460', name: '沙棕色', ratio: 30, role: 'secondary' },
      { hex: '#FFFFF0', name: '象牙色', ratio: 10, role: 'accent' }
    ],
    image: '/images/outfits/nordic-sunset.jpg',
    insight: {
      why: '蓝橙是经典的互补色组合，象牙色作为过渡，让撞色不突兀。',
      tips: '这组配色适合想要出挑但不夸张的场合，如展览、周末约会。'
    }
  },
  {
    id: 'p005',
    name: '深海珊瑚配方',
    emoji: '🐚',
    vibe: 'date',
    colors: [
      { hex: '#4682B4', name: '钢蓝色', ratio: 60, role: 'main' },
      { hex: '#FF7F50', name: '珊瑚色', ratio: 30, role: 'secondary' },
      { hex: '#F5F5F5', name: '白烟色', ratio: 10, role: 'accent' }
    ],
    image: '/images/outfits/deep-sea-coral.jpg',
    insight: {
      why: '海洋与珊瑚的自然灵感，蓝色沉稳内敛，珊瑚色活泼点睛。',
      tips: '约会场合优选，珊瑚色靠近面部会显气色好。'
    }
  },
  {
    id: 'p006',
    name: '冰川蓝调',
    emoji: '🧊',
    vibe: 'pro',
    colors: [
      { hex: '#B0C4DE', name: '淡钢蓝', ratio: 60, role: 'main' },
      { hex: '#2C2C2C', name: '炭灰色', ratio: 30, role: 'secondary' },
      { hex: '#FFFFFF', name: '纯白色', ratio: 10, role: 'accent' }
    ],
    image: '/images/outfits/glacier-blue.jpg',
    insight: {
      why: '冷色调的专业组合，淡蓝色柔化了黑灰的严肃，显得干练又亲和。',
      tips: '职场面试、重要会议的理想选择，搭配简约银饰更佳。'
    }
  },

  // 绿色系列
  {
    id: 'p007',
    name: '森林漫步配方',
    emoji: '🌲',
    vibe: 'chill',
    colors: [
      { hex: '#6B8E23', name: '橄榄绿', ratio: 60, role: 'main' },
      { hex: '#D2B48C', name: '棕褐色', ratio: 30, role: 'secondary' },
      { hex: '#FFFFF0', name: '象牙色', ratio: 10, role: 'accent' }
    ],
    image: '/images/outfits/forest-walk.jpg',
    insight: {
      why: '绿色与棕色是大自然中最和谐的组合，自带高级复古感。',
      tips: '适合周末出游、户外野餐，材质选择棉麻更有氛围感。'
    }
  },
  {
    id: 'p008',
    name: '薄荷巧克力配方',
    emoji: '🍃',
    vibe: 'art',
    colors: [
      { hex: '#98FB98', name: '薄荷绿', ratio: 60, role: 'main' },
      { hex: '#8B4513', name: '马鞍棕', ratio: 30, role: 'secondary' },
      { hex: '#FAEBD7', name: '古白色', ratio: 10, role: 'accent' }
    ],
    image: '/images/outfits/mint-chocolate.jpg',
    insight: {
      why: '清新薄荷绿与深邃棕色的对撞，像薄荷巧克力一样令人愉悦。',
      tips: '适合春夏季节，绿色面积大时选择饱和度低的款式。'
    }
  },

  // 紫色系列
  {
    id: 'p009',
    name: '薰衣草田配方',
    emoji: '💜',
    vibe: 'date',
    colors: [
      { hex: '#E6E6FA', name: '薰衣草', ratio: 60, role: 'main' },
      { hex: '#DDA0DD', name: '梅红色', ratio: 30, role: 'secondary' },
      { hex: '#FFFAF0', name: '花白色', ratio: 10, role: 'accent' }
    ],
    image: '/images/outfits/lavender-field.jpg',
    insight: {
      why: '紫色系的浪漫组合，适合营造温柔甜美的氛围。',
      tips: '约会、闺蜜聚会的完美选择，妆容可以呼应淡紫色调。'
    }
  },
  {
    id: 'p010',
    name: '紫罗兰之夜',
    emoji: '🔮',
    vibe: 'art',
    colors: [
      { hex: '#9370DB', name: '中紫色', ratio: 60, role: 'main' },
      { hex: '#1A1A1A', name: '墨黑色', ratio: 30, role: 'secondary' },
      { hex: '#C0C0C0', name: '银色', ratio: 10, role: 'accent' }
    ],
    image: '/images/outfits/violet-night.jpg',
    insight: {
      why: '紫色与黑色的神秘组合，银色点缀增添未来感。',
      tips: '适合派对、艺术展等场合，可大胆搭配金属感配饰。'
    }
  },

  // 红粉系列
  {
    id: 'p011',
    name: '玫瑰奶油配方',
    emoji: '🌹',
    vibe: 'date',
    colors: [
      { hex: '#FFB6C1', name: '浅粉色', ratio: 60, role: 'main' },
      { hex: '#F5F5DC', name: '米色', ratio: 30, role: 'secondary' },
      { hex: '#FFFFFF', name: '纯白色', ratio: 10, role: 'accent' }
    ],
    image: '/images/outfits/rose-cream.jpg',
    insight: {
      why: '粉色与奶油色的柔和搭配，甜而不腻，温柔知性。',
      tips: '日常约会首选，避免全身粉色，用中性色平衡甜度。'
    }
  },
  {
    id: 'p012',
    name: '复古砖红调',
    emoji: '🧱',
    vibe: 'pro',
    colors: [
      { hex: '#CD5C5C', name: '印度红', ratio: 60, role: 'main' },
      { hex: '#2C2C2C', name: '炭灰色', ratio: 30, role: 'secondary' },
      { hex: '#D2B48C', name: '棕褐色', ratio: 10, role: 'accent' }
    ],
    image: '/images/outfits/vintage-brick.jpg',
    insight: {
      why: '砖红色比正红更好驾驭，搭配灰黑显得成熟有气场。',
      tips: '职场女性的高级选择，秋冬季节尤其适合。'
    }
  },

  // 黑白灰系列
  {
    id: 'p013',
    name: '经典黑白配方',
    emoji: '🎹',
    vibe: 'pro',
    colors: [
      { hex: '#1A1A1A', name: '墨黑色', ratio: 60, role: 'main' },
      { hex: '#FFFFFF', name: '纯白色', ratio: 30, role: 'secondary' },
      { hex: '#808080', name: '中灰色', ratio: 10, role: 'accent' }
    ],
    image: '/images/outfits/classic-bw.jpg',
    insight: {
      why: '永不过时的经典组合，用灰色过渡让黑白对比不生硬。',
      tips: '注重面料质感，黑白配要靠材质取胜。'
    }
  },
  {
    id: 'p014',
    name: '高级灰调',
    emoji: '🌫️',
    vibe: 'pro',
    colors: [
      { hex: '#708090', name: '石板灰', ratio: 60, role: 'main' },
      { hex: '#D3D3D3', name: '浅灰色', ratio: 30, role: 'secondary' },
      { hex: '#FFFFF0', name: '象牙色', ratio: 10, role: 'accent' }
    ],
    image: '/images/outfits/premium-gray.jpg',
    insight: {
      why: '全灰色阶的高级感，象牙色点亮避免沉闷。',
      tips: '适合职场或正式场合，搭配金色配饰更显质感。'
    }
  },

  // 橙黄系列
  {
    id: 'p015',
    name: '秋日暖阳配方',
    emoji: '🍊',
    vibe: 'chill',
    colors: [
      { hex: '#F4A460', name: '沙棕色', ratio: 60, role: 'main' },
      { hex: '#FFFFF0', name: '象牙色', ratio: 30, role: 'secondary' },
      { hex: '#8B4513', name: '马鞍棕', ratio: 10, role: 'accent' }
    ],
    image: '/images/outfits/autumn-sun.jpg',
    insight: {
      why: '暖橙色系的舒适组合，像秋天的暖阳一样治愈。',
      tips: '适合秋季日常，搭配棕色皮具更有质感。'
    }
  },
  {
    id: 'p016',
    name: '柠檬苏打配方',
    emoji: '🍋',
    vibe: 'art',
    colors: [
      { hex: '#F0E68C', name: '卡其色', ratio: 60, role: 'main' },
      { hex: '#87CEEB', name: '天空蓝', ratio: 30, role: 'secondary' },
      { hex: '#FFFFFF', name: '纯白色', ratio: 10, role: 'accent' }
    ],
    image: '/images/outfits/lemon-soda.jpg',
    insight: {
      why: '清新的夏日组合，黄蓝对比明快活泼。',
      tips: '适合春夏季节，降低饱和度会更好驾驭。'
    }
  }
];

// 氛围标签定义
const vibeLabels = {
  all: '全部',
  chill: '松弛/日常',
  pro: '职场/气场',
  date: '约会/浪漫',
  art: '艺术/撞色'
};

// 根据氛围筛选配色方案
function filterByVibe(vibe) {
  if (vibe === 'all') return palettes;
  return palettes.filter(p => p.vibe === vibe);
}

// 根据颜色筛选配色方案
function filterByColor(hex, threshold = 70) {
  const colorUtil = require('../utils/color');
  return palettes.filter(palette => {
    return palette.colors.some(color => {
      return colorUtil.colorSimilarity(color.hex, hex) >= threshold;
    });
  });
}

// 获取某个颜色的更多搭配可能
function getColorVariations(hex) {
  const colorUtil = require('../utils/color');
  const similar = filterByColor(hex, 60);

  // 找到包含该颜色的所有配方，但搭配方案不同
  return similar.sort((a, b) => {
    // 计算与目标颜色的相似度，优先展示最相似的
    const simA = Math.max(...a.colors.map(c => colorUtil.colorSimilarity(c.hex, hex)));
    const simB = Math.max(...b.colors.map(c => colorUtil.colorSimilarity(c.hex, hex)));
    return simB - simA;
  });
}

// 随机获取配色方案
function getRandomPalettes(count = 10) {
  const shuffled = [...palettes].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// 根据 ID 获取配色方案
function getPaletteById(id) {
  return palettes.find(p => p.id === id);
}

module.exports = {
  palettes,
  vibeLabels,
  filterByVibe,
  filterByColor,
  getColorVariations,
  getRandomPalettes,
  getPaletteById
};

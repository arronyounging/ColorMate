# ColorMate (颜伴)

> 您的口袋色彩配方库
> 不再凭感觉，穿搭有配方。

## 产品概述

ColorMate 是一款专注于**配色公式**的穿搭小程序。与市面上展示"网红穿搭"的 App 不同，ColorMate 将**色卡/配方**作为第一视觉对象，穿搭图仅作为配方的验证与示例。

### 核心差异化
- **视觉重心转移**：色彩配方是主角，穿搭图只是验证
- **认知模型**：用户来这里是为了获取配色公式（Get Formula），而非杀时间

### 目标用户
- 22-35 岁审美进阶人群
- 色彩强迫症/爱好者

## 功能模块

### 1. 灵感配方流 (Palette Flow)
- 类似 TikTok 的竖屏单列滑动流
- 点击色块可探索同色系配方
- 氛围滤镜筛选（松弛/职场/约会/艺术）

### 2. AI 搭配室 (Palette Studio)
- 拍照上传单品
- AI 分析颜色并生成配色方案
- 展示生成过程的思考路径
- 专家解读（Why + Tips）

### 3. 收藏
- 收藏喜欢的配色方案
- 随时查看和分享

## 核心视觉单元：颜伴卡 (ColorMate Card)

```
┌────────────────────────┐
│   A区：色彩实验室 (35%)   │
│  ┌──────────────────┐  │
│  │ 🍂 焦糖拿铁配方      │  │
│  │ ████████░░▓      │  │  ← 动态比例色条
│  │ 焦糖色 60%        │  │
│  │ 雾霾蓝 30%        │  │
│  │ 白烟色 10%        │  │
│  └──────────────────┘  │
├────────────────────────┤
│                        │
│   B区：视觉验证场 (65%)   │
│                        │
│    [穿搭实拍图/平铺图]    │
│                        │
│                        │
└────────────────────────┘
```

## 项目结构

```
ColorMate/
├── app.js                 # 小程序入口
├── app.json               # 全局配置
├── app.wxss               # 全局样式
├── project.config.json    # 项目配置
│
├── pages/
│   ├── index/             # 首页 - 灵感配方流
│   ├── studio/            # AI 搭配室
│   └── collection/        # 收藏页
│
├── components/
│   ├── colormate-card/    # 颜伴卡组件（核心）
│   ├── color-bar/         # 动态比例色条
│   └── vibe-filter/       # 氛围滤镜
│
├── utils/
│   ├── color.js           # 色彩处理工具
│   └── api.js             # API 封装
│
├── data/
│   └── palettes.js        # 配色方案数据
│
└── images/
    ├── icons.svg          # 图标源文件
    └── outfits/           # 穿搭图片目录
```

## 开发说明

### 环境要求
- 微信开发者工具
- 基础库版本 >= 2.25.0

### 本地开发
1. 下载[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 导入项目目录
3. 在 `project.config.json` 中配置你的 AppID
4. 准备 tabBar 图标（见下方说明）

### 图标资源
项目需要以下 tabBar 图标（PNG 格式，建议 81x81 像素）：
- `images/tab-inspiration.png` - 灵感图标
- `images/tab-inspiration-active.png` - 灵感图标（选中）
- `images/tab-studio.png` - 搭配室图标
- `images/tab-studio-active.png` - 搭配室图标（选中）
- `images/tab-collection.png` - 收藏图标
- `images/tab-collection-active.png` - 收藏图标（选中）

SVG 源文件位于 `images/icons.svg`，可用 Figma 等工具导出 PNG。

### 穿搭图片
将穿搭示例图片放入 `images/outfits/` 目录，并更新 `data/palettes.js` 中的图片路径。

## 技术要点

### 色彩处理
- HEX/RGB/HSL 转换
- 颜色相似度计算
- 互补色/类似色生成
- 颜色中文名称映射

### 交互设计
- 色块点击触发同色探索
- 60-30-10 黄金配色比例
- 收藏状态同步
- 分享卡片生成

## 版本记录

### v1.0 (MVP)
- [x] 颜伴卡组件
- [x] 灵感配方流
- [x] AI 搭配室（模拟）
- [x] 收藏功能
- [x] 分享功能

### 后续规划
- [ ] 接入真实 AI 配色 API
- [ ] 用户登录系统
- [ ] 配方生成分享海报
- [ ] 社区功能

## 许可证

MIT License

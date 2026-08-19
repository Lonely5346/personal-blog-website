# 梦落の小屋 · 个人博客

一个 Sakurairo 风格的现代个人博客，基于 **Astro** 构建，纯静态、零数据库、免费部署。

预览：本地运行 `npm run dev` 后访问 `http://localhost:4321`

## ✨ 功能特性

- 🎨 樱花粉 Sakurairo 风格主题（Hero 渐变 Banner + 漂浮装饰）
- 🌙 亮 / 暗双主题切换（记忆用户选择）
- 📝 Markdown 写文章，内容即文件
- 🏷️ 标签系统（标签云 + 标签聚合页）
- 📂 按月归档页
- 🔍 站内全文搜索（纯前端，无需后端）
- 📡 RSS 订阅（`/rss.xml`）
- 📌 置顶文章、AI 摘要标识、阅读时长估算
- 📱 响应式布局（手机 / 平板 / 桌面）
- 🔗 SEO 基础（title / description / og 标签）

## 🚀 本地运行

```bash
npm install
npm run dev        # 开发预览 http://localhost:4321
npm run build      # 构建到 dist/
npm run preview    # 预览构建产物
```

> 首次运行若提示权限问题，执行一次 `npx astro telemetry disable` 即可。

## 📁 目录结构

```
PersonalBlogWebsite/
├── public/                 # 静态资源（头像、封面、favicon）
│   ├── avatar.svg
│   ├── favicon.svg
│   └── covers/
├── src/
│   ├── config.ts           # ★ 站点全局配置（标题、作者、导航、社交链接）
│   ├── content.config.ts   # 内容集合 schema
│   ├── content/posts/      # ★ 文章目录，Markdown 放这里
│   ├── layouts/Layout.astro
│   ├── components/         # Header / Hero / PostCard / Sidebar / Footer
│   ├── pages/              # 首页 / 文章 / 标签 / 归档 / 关于 / 搜索 / RSS / 404
│   ├── styles/global.css   # 全部样式（主题变量、亮暗色）
│   └── utils.ts            # 排序 / 摘要 / 标签统计等工具
└── astro.config.mjs
```

## ✍️ 写一篇文章

在 `src/content/posts/` 新建一个 `.md` 文件即可：

```markdown
---
title: "我的第一篇文章"
date: 2024-08-19
description: "文章摘要，会显示在卡片上（不填则自动截取正文）"
tags: ["教程", "折腾"]
cover: "/covers/linux.svg"     # 可选，封面图
pinned: true                   # 可选，置顶
draft: false                   # 可选，草稿不发布
---

正文直接写 Markdown，支持标题、列表、代码块、表格、引用等。

## 小节标题

```bash
echo "hello"
```
```

> 文章文件名即网址：`src/content/posts/hello.md` → `/posts/hello/`

## ⚙️ 修改站点信息

打开 `src/config.ts`：

| 配置项 | 说明 |
| --- | --- |
| `SITE.url` | 部署后的最终域名（影响 RSS / SEO） |
| `SITE.title` / `SITE.subtitle` | 站名与副标题 |
| `SITE.author` | 作者名（侧边栏头像旁） |
| `SITE.avatar` | 头像路径 |
| `SITE.slogan` | Hero 区口号 |
| `SITE.pageSize` | 每页文章数 |
| `NAV` | 顶部导航 |
| `SOCIAL` | GitHub / 邮箱 / RSS 链接 |

## ☁️ 免费部署

### 方式一：Vercel（推荐，自动部署）

1. 把项目推到 GitHub
2. 打开 [vercel.com](https://vercel.com) → **New Project** → 导入仓库
3. 框架会自动识别 Astro，直接 **Deploy**
4. 每次 `git push` 自动重新部署

### 方式二：Netlify

1. 推到 GitHub，打开 [netlify.com](https://netlify.com) → **Add new site** → 导入仓库
2. Build command: `npm run build`，Publish directory: `dist`
3. 部署完成后同样支持自动更新

### 方式三：GitHub Pages

```bash
# 把构建产物推送到 gh-pages 分支（或使用 GitHub Actions）
npm run build
npx gh-pages -d dist
```

### 方式四：Cloudflare Pages

1. 推到 GitHub，Cloudflare Dashboard → **Workers & Pages** → **Create** → 连接 Git 仓库
2. Build command: `npm run build`，Build output: `dist`

## 🌐 绑定域名

以 Vercel 为例：

1. 在域名服务商（阿里云 / 腾讯云 / Cloudflare）把域名解析到 Vercel 提供的地址（A 记录或 CNAME）
2. Vercel 项目 → **Settings → Domains** → 添加你的域名
3. 把 `src/config.ts` 里的 `SITE.url` 改成你的正式域名，重新部署

国内服务器部署需先完成 ICP 备案；用 Vercel / Cloudflare 等海外服务则无需备案（但大陆访问速度一般）。

## 🧩 后续可选增强

- 💬 评论：接入 [giscus](https://giscus.app)（GitHub Discussions）或 [Waline](https://waline.js.org)
- 📊 统计：[Umami](https://umami.is) / [不蒜子](https://busuanzi.ibruce.info)
- 🔔 自动更新：GitHub Actions 定时构建（配合 GitHub Pages）
- 🖼️ 图床：图片可放 `public/`，或用 sm.ms / GitHub 图床 / 对象存储

## 🤔 为什么不用 WordPress？

参考站 blog.dreamfall.cn 是 **WordPress + Sakurairo 主题**。如果你已经有服务器、想要后台编辑器、想要 1:1 复刻，可以走 WordPress 路线（安装 Sakurairo 主题即可）。但 WordPress 需要：
- 一台 PHP + MySQL 服务器（约 ¥50–100/年）
- 定期更新补丁、防攻击、优化性能

而本项目（Astro 静态站）**免费托管、无需维护、速度极快**，适合以写作为核心的个人博客。内容用 Markdown 保存，未来迁移到任何平台都很容易。

## 📄 License

MIT

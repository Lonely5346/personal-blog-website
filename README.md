# 苍の博客 · 个人博客

一个 Sakurairo 樱花风格的现代个人博客，基于 **Astro 5 + TypeScript** 构建，纯静态、零数据库、免费部署。

- 博客：**https://blog.lonely5346.cn**
- 导航页：**https://lonely5346.cn**（聚合博客等子域名入口）
- 备用地址：https://personal-blog-website-9jc.pages.dev

## 功能特性

- 樱花粉 Sakurairo 风格主题（Hero 渐变 Banner + 漂浮装饰）
- 亮 / 暗双主题切换（记忆用户选择）
- Markdown 写文章，内容即文件
- 标签系统（标签云 + 标签聚合页）
- 按月归档页
- 站内全文搜索（纯前端，无需后端）
- RSS 订阅（`/rss.xml`，输出全文 + 自动发现）
- 置顶文章、AI 摘要标识、阅读时长估算
- 响应式布局（手机 / 平板 / 桌面）
- SEO 基础（title / description / og 标签）
- 隐私政策（`/privacy`）与版权声明（`/disclaimer`）页面

## 技术栈

| 项 | 值 |
| --- | --- |
| 框架 | Astro 5 + TypeScript |
| 运行时 | Node 22+（npm 包管理） |
| 内容 | Markdown 内容集合（`src/content/posts/*.md`） |
| RSS | `@astrojs/rss` |
| 部署 | GitHub Actions + Cloudflare Pages（博客与导航页两个项目） |

## 本地运行

```bash
npm ci               # 按 lockfile 安装依赖（国内可用 npmmirror 镜像）
npm run dev          # 开发预览 http://localhost:4321
npm run build        # 构建到 dist/
npm run preview      # 预览构建产物
```

> 首次运行若提示权限问题，执行一次 `npx astro telemetry disable` 即可。

## 目录结构

```
personal-blog-website/
├── nav/                      # 根域名导航页（独立部署到 Pages 项目 lonely5346-nav）
├── public/                   # 静态资源（头像、封面、favicon）
│   ├── avatar.jpg
│   ├── favicon.svg
│   └── covers/
├── src/
│   ├── config.ts             # 站点全局配置（标题、作者、导航、社交链接、SITE.url）
│   ├── content.config.ts     # 内容集合 schema
│   ├── content/posts/        # 文章目录，Markdown 放这里
│   ├── layouts/Layout.astro
│   ├── components/           # Header / Hero / PostCard / Sidebar / Footer
│   ├── pages/                # 首页 / 文章 / 标签 / 归档 / 关于 / 搜索 / RSS / 隐私 / 版权 / 404
│   ├── styles/global.css     # 全部样式（主题变量、亮暗色）
│   └── utils.ts              # 排序 / 摘要 / 标签统计等工具
├── .github/workflows/        # 部署工作流（博客 + 导航页）
└── astro.config.mjs
```

## 写一篇文章

在 `src/content/posts/` 新建一个 `.md` 文件即可（复制 `template.md` 最快）：

```markdown
---
title: "我的第一篇文章"
date: 2026-08-20
description: "文章摘要，会显示在卡片上（不填则自动截取正文）"
tags: ["教程", "折腾"]
cover: "/covers/linux.svg"     # 可选，封面图
pinned: true                   # 可选，置顶
draft: false                   # true=草稿不发布
---

正文直接写 Markdown，支持标题、列表、代码块、表格、引用等。
```

> 文章文件名即网址：`src/content/posts/hello.md` → `/posts/hello/`

## 修改站点信息

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

## 部署架构（当前方案）

```
git push main
   │
   ├─ .github/workflows/deploy.yml       → Cloudflare Pages 项目 personal-blog-website（博客）
   │                                      └─ 自定义域名：blog.lonely5346.cn
   └─ .github/workflows/deploy-nav.yml   → Cloudflare Pages 项目 lonely5346-nav（导航页）
                                          ├─ 自动创建项目（幂等）
                                          └─ 自定义域名：lonely5346.cn
```

- 两个工作流均使用 GitHub Secrets：`CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`
- 推送代码即自动构建部署，无需手动操作
- 国内访问走 Cloudflare CDN，海外托管无需 ICP 备案

## 导航页（lonely5346.cn）

导航页是独立的纯静态页面（`nav/index.html`），卡片式聚合各子域名入口。**新增子域名**只需编辑 `nav/index.html` 中的 `SITES` 数组：

```js
const SITES = [
  { name: "苍の博客", desc: "…", url: "https://blog.lonely5346.cn", domain: "blog.lonely5346.cn", status: "online" },
  // status: "online" = 正常入口；"soon" = 敬请期待（置灰展示）；icon 字段可填 emoji 图标（见 nav/index.html）
];
```

## 后续开发路线图

以下为可选增强项，按优先级排列，不影响现有功能；实现时记得同步更新「隐私政策」页面的数据收集说明（如接入评论/统计）。

### P0 · 基础体验（建议优先）

| 功能 | 说明 | 参考 |
| --- | --- | --- |
| 评论系统 | 基于 GitHub Discussions 的 giscus（无后端、免费），或自托管 Waline | [giscus.app](https://giscus.app) / [waline.js.org](https://waline.js.org) |
| 访问统计 | 隐私友好的自托管 Umami，或轻量的不蒜子 | [umami.is](https://umami.is) / [busuanzi.ibruce.info](https://busuanzi.ibruce.info) |

### P1 · 内容与展示

| 功能 | 说明 |
| --- | --- |
| 文章封面图生成 | 按 frontmatter 自动生成 SVG 封面（现有 `public/covers/` 为手绘） |
| 图床配置 | 图片可放 `public/`，或用 sm.ms / GitHub 图床 / 对象存储 |
| 更多子域名服务 | 在导航页 `SITES` 数组追加相册、项目、关于等入口 |

### P2 · 工程化与 SEO

| 功能 | 说明 |
| --- | --- |
| 定时构建 | GitHub Actions `schedule` 定时触发，保持站点活跃 |
| SEO 增强 | 增加 `sitemap.xml` 与结构化数据（JSON-LD） |
| 性能优化 | 图片懒加载、预渲染、缓存策略、字体子集化 |

## 为什么不用 WordPress？

参考站 blog.dreamfall.cn 是 **WordPress + Sakurairo 主题**。如果你已经有服务器、想要后台编辑器、想要 1:1 复刻，可以走 WordPress 路线（安装 Sakurairo 主题即可）。但 WordPress 需要：

- 一台 PHP + MySQL 服务器（约 ¥50–100/年）
- 定期更新补丁、防攻击、优化性能

而本项目（Astro 静态站）**免费托管、无需维护、速度极快**，适合以写作为核心的个人博客。内容用 Markdown 保存，未来迁移到任何平台都很容易。

## License

MIT
# AGENTS.md — 项目自动参考文档

> 本文件是 Codex / AI 助手在本项目中的**自动参考**，开始任何任务前请先阅读。
> 最后更新：2026-08-20（由首次建站任务沉淀）

---

## 1. 项目是什么

一个 **Sakurairo 樱花风格的个人博客**，基于 **Astro 5 + TypeScript** 的纯静态站点。
- 线上地址：**https://blog.lonely5346.cn**（Cloudflare CDN 加速）
- 导航页：**https://lonely5346.cn**（根域名导航页，聚合子域名入口；Pages 项目 lonely5346-nav，源码在 
av/）
- 备用地址：https://personal-blog-website-9jc.pages.dev
- 站名：**苍の博客** ｜ 作者：**空门苍**（GitHub: `Lonely5346`）
- 主题风格参考 blog.dreamfall.cn（Sakurairo），但用 Astro 自研实现

## 2. 技术栈与关键依赖

| 项 | 值 |
|---|---|
| 框架 | Astro 5（本地 node_modules 为 v5.18.x） |
| 运行时 | Node 22+（本地为 v24.19，兼容） |
| 包管理 | npm（`npm ci` / `npm run build`） |
| 内容 | Markdown 内容集合（`src/content/posts/*.md`） |
| RSS | `@astrojs/rss`（`/rss.xml`） |
| 部署 | Cloudflare Pages（wrangler）+ GitHub Actions 自动部署 |

## 3. 目录结构（重点）

```
PersonalBlogWebsite/
├── AGENTS.md                 ← 本文件
├── nav/                       ← 根域名导航页（独立部署到 Pages 项目 lonely5346-nav）
├── src/
│   ├── config.ts             ★ 全站配置唯一入口（标题/作者/导航/社交/SEO）
│   ├── content.config.ts     ★ 文章 frontmatter 校验 schema
│   ├── content/posts/        ★ 文章目录（Markdown）
│   │   └── template.md       ← 草稿模板（draft: true，不会发布）
│   ├── layouts/Layout.astro  ← 基础布局 + 亮暗主题初始化
│   ├── components/           ← Header / Footer / PostCard / Sidebar / ThemeToggle
│   ├── pages/                ← 首页/分页/文章/标签/归档/关于/搜索/RSS/404
│   ├── styles/global.css     ← 全部样式（CSS 变量控制亮暗主题）
│   └── utils.ts              ← 排序/摘要/标签统计/阅读时长等工具
├── public/                   ← avatar.jpg（真实头像）/ favicon.svg / covers/
├── .github/workflows/deploy.yml  ← 自动部署工作流
├── astro.config.mjs
└── package.json
```

## 4. 写文章（核心操作）

在 `src/content/posts/` 新建 `.md` 文件（复制 `template.md` 最快）：

```markdown
---
title: "文章标题"
date: 2026-08-20
description: "摘要（不填自动截取正文）"
tags: ["标签1", "标签2"]
cover: "/covers/xxx.svg"   # 可选
pinned: true               # 可选，置顶
draft: false               # true=草稿不发布
---
正文 Markdown...
```

- **文件名 = 网址**：`hello.md` → `/posts/hello/`
- `draft: true` 的文章在首页/归档/标签/搜索/RSS 中全部隐藏
- 支持中文标签，标签 URL 含中文（如 `/tags/教程/`），正常可用

## 5. 部署架构与凭据（勿外泄）

```
用户 → https://blog.lonely5346.cn → Cloudflare CDN → Cloudflare Pages（博客）
用户 → https://lonely5346.cn → Cloudflare Pages（导航页，项目 lonely5346-nav）
                                                    ↑
                          内容来自 GitHub（main 分支 push 自动部署）
```

### GitHub
- 仓库：`Lonely5346/personal-blog-website`（public，默认分支 `main`）
- 用户：`Lonely5346`（显示名 空门苍，id 186200643，邮箱 1816182085@qq.com）
- gh CLI：`C:\Users\18161\AppData\Local\Programs\gh\bin\gh.exe`（v2.97.0，经 ghfast.top 镜像安装）

### Cloudflare
- 账号邮箱：1816182085@qq.com ｜ Account ID：`671d941a2ca8128766f53e80afdc4097`
- Pages 项目：`personal-blog-website`（production branch = main，博客）；`lonely5346-nav`（导航页，源码 `nav/`）
- 自定义域名：`blog.lonely5346.cn`（已激活；CNAME 代理 → personal-blog-website-9jc.pages.dev）；旧域名 `lonely5346.cn` 配置 301 重定向
- Zone ID：`e378102bc1c6cf28b3b9ab432f3b33bb`
- 域名 NS（已切到 Cloudflare）：`apollo.ns.cloudflare.com` / `rosemary.ns.cloudflare.com`
- 域名注册/续费仍在**阿里云**（解析在 Cloudflare，无 ICP 备案要求）
- wrangler：全局安装（v4.x），已 OAuth 登录为 1816182085@qq.com

### 自动部署
- 工作流：`.github/workflows/deploy.yml`（push main → npm ci → npm run build → wrangler pages deploy dist）
- GitHub Secrets：`CLOUDFLARE_API_TOKEN`（仅 Pages 权限）、`CLOUDFLARE_ACCOUNT_ID`
- ⚠️ 不要把 `CLOUDFLARE_API_TOKEN` 的值打印/回显到对话或文档

## 6. 常用命令

```bash
npm run dev                          # 本地预览 http://localhost:4321
npm run build                        # 构建到 dist/
wrangler pages deploy dist --project-name=personal-blog-website   # 手动部署
git push                             # 触发 GitHub Actions 自动部署
```

## 7. 本机/网络环境注意事项（重要）

- **GitHub 直连不稳定**（国内网络）：`git push` 常报 `Connection was reset` / `Failed to connect to github.com:443`。对策：重试几次、等待后重试；必要时用备用通道（GitHub API/连接器）上传文件
- 已做缓解：`git config --global http.version HTTP/1.1`
- **下载走国内镜像**：用户明确要求（如 ghfast.top / gh-proxy.com / ghproxy.net 前缀 `https://ghfast.top/https://github.com/...`）
- **本机沙箱 DNS（10.2.59.17）解析不了 blog.lonely5346.cn**：验证 DNS 请用公共 DoH（`https://dns.alidns.com/resolve?name=xxx&type=A&cd=true` 或 `https://doh.pub/...`，加 `&cd=true` 绕过缓存）；手机/其他网络访问正常不代表配置有问题
- 本机直连 Cloudflare 边缘节点也偶发不通，抓线上页面失败时优先检查 DNS 而非部署
- git 提交时如无全局 user 配置，用内联身份：
  `git -c user.name="PersonalBlog" -c user.email="blog@example.com" commit -m "..."`

## 8. 当前状态（截至 2026-08-20）

- ✅ 网站已上线：`https://blog.lonely5346.cn`（苍の博客，已发布 1 篇文章）
  - 《你好，世界 —— 苍の博客开张了》（`src/content/posts/welcome.md`）
- ✅ 站点信息已改为真实资料（作者/头像/GitHub/邮箱/标题）
- ✅ 自动部署已配置并验证通过（GitHub Actions：push main 自动部署 Cloudflare Pages）
- ✅ 本地 `main` 与 `origin/main` 保持同步
- ℹ️ 注意：GitHub 直连不稳定，push 失败时按第 7 节策略重试或改用备用通道

## 9. 常见任务速查

| 任务 | 怎么做 |
|---|---|
| 改站名/副标题/口号/作者 | 改 `src/config.ts`（全站自动生效） |
| 换头像 | 替换 `public/avatar.jpg` 或改 `SITE.avatar` |
| 写文章 | 见第 4 节 |
| 更新线上 | `git push`（自动部署）或 wrangler 手动部署 |
| 验证 DNS | 用 alidns/doh.pub DoH 加 `cd=true` |
| 加评论/统计 | 未配置；可考虑 giscus（GitHub 登录评论）、Umami/不蒜子统计 |

## 10. 未做/可扩展

- 评论系统（giscus / Waline）未接入
- 访问统计未接入
- 文章封面图生成未做
- 图床未配置（图片目前放 `public/` 或外链）

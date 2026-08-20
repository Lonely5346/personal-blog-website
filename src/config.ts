// ============================================================
// 站点全局配置：改这里就能改全站信息
// ============================================================

export const SITE = {
  /** 部署后的最终网址（构建 RSS / sitemap 用，末尾不要带 /） */
  url: "https://lonely5346.cn",
  /** 网站标题 */
  title: "梦落の小屋",
  /** 副标题 / 一句话介绍 */
  subtitle: "记录折腾路上的点点滴滴",
  /** 作者名 */
  author: "梦璃雨落",
  /** 头像（放在 public/ 下，或使用外链图片） */
  avatar: "/avatar.svg",
  /** 站点描述（用于 SEO） */
  description:
    "一个以教程为主的技术类个人博客，分享教程、学习笔记和折腾记录。",
  /** 首页 Hero 的一句话口号 */
  slogan: "念念不忘，必有回响。",
  /** 每页显示的文章数 */
  pageSize: 8,
};

export const NAV = [
  { text: "首页", href: "/" },
  { text: "归档", href: "/archive" },
  { text: "标签", href: "/tags" },
  { text: "关于", href: "/about" },
];

export const SOCIAL = {
  github: "https://github.com/yourname",
  email: "yourname@example.com",
  rss: "/rss.xml",
};

export const FOOTER_TEXT = "由 Astro 强力驱动 · 主题风格参考 Sakurairo";


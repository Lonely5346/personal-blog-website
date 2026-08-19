// ============================================================
// 文章排序、格式化等公共工具函数
// ============================================================

import type { CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

/** 按日期倒序排列文章 */
export function sortByDate(posts: Post[]): Post[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
}

/** 格式化日期为 YYYY-MM-DD */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** 中文友好日期：2024年3月20日 */
export function formatDateCN(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;
}

/** 生成文章摘要：优先用 frontmatter 的 description，否则截取正文 */
export function excerpt(post: Post, maxLen = 140): string {
  if (post.data.description) return post.data.description;
  const text = (post.body ?? "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLen ? text.slice(0, maxLen) + "…" : text;
}

/** 收集全部标签并统计数量 */
export function collectTags(posts: Post[]) {
  const map = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.data.tags ?? []) {
      map.set(t, (map.get(t) ?? 0) + 1);
    }
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

/** 生成阅读时长（分钟），按 400 字/分钟估算 */
export function readingTime(post: Post): number {
  const words = (post.body ?? "").replace(/\s/g, "").length;
  return Math.max(1, Math.round(words / 400));
}

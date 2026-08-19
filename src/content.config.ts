import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    /** 文章标题 */
    title: z.string(),
    /** 发布日期 */
    date: z.coerce.date(),
    /** 是否置顶 */
    pinned: z.boolean().optional().default(false),
    /** 封面图（放在 public/ 或外链） */
    cover: z.string().optional(),
    /** 文章摘要（不填则自动截取正文） */
    description: z.string().optional(),
    /** 标签列表 */
    tags: z.array(z.string()).optional().default([]),
    /** 是否草稿 */
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { posts };

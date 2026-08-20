import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { marked } from "marked";
import { SITE } from "../config";

export async function GET(context) {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  const sorted = [...posts].sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
  return rss({
    title: `${SITE.title} - ${SITE.subtitle}`,
    description: SITE.description,
    site: context.site,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/posts/${post.id}/`,
      // 输出完整文章正文（Markdown -> HTML）
      content: marked.parse(post.body ?? "", { gfm: true, breaks: true }),
    })),
    customData: `<language>zh-cn</language>`,
  });
}

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
    items: sorted.map((post) => {
      // 完整正文（Markdown -> HTML），同时写入 description 和 content，
      // 保证任何阅读器（包括只读 description 的 Folo）都能显示全文
      const fullHtml = marked.parse(post.body ?? "", { gfm: true, breaks: true });
      return {
        title: post.data.title,
        description: post.data.description
          ? `<p>${post.data.description}</p>\n${fullHtml}`
          : fullHtml,
        pubDate: post.data.date,
        link: `/posts/${post.id}/`,
        content: fullHtml,
      };
    }),
    customData: `<language>zh-cn</language>`,
  });
}

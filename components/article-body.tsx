import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export function ArticleBody({ body }: { body: string }) {
  return (
    <div className="article-prose">
      <MDXRemote source={body} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
    </div>
  );
}

import {
  getPostBySlug,
  getPosts,
  getSiblingPostsBySlug,
} from "../../lib/getPosts";
import { unstable_notFound as notFound } from "waku/router/server";
import H from "../../components/mdxComponents/Headings";
import { EditDialogStyles } from "@/styles/EditDialogStyles.module.css";
import { postMeta } from "@/styles/PostMeta.module.css";
import { Image } from "../../components/Image";
import { IoLogoGithub } from "react-icons/io";
import ContentNav from "../../components/ContentNav";
import { MetaTags } from "../../components/MetaTags";
import type { PageProps } from "waku/router";
import mdxComponents from "@/components/mdxComponents";

interface BlogPostPageProps extends PageProps<"/[slug]"> {
  slug: string;
}

export default async function BlogPost(props: BlogPostPageProps) {
  const { slug } = props;
  const post = await getPostBySlug(slug);
  const { prev, next } = await getSiblingPostsBySlug(slug, "blog");

  if (!post) {
    return notFound();
  }

  const { default: MDXContent } = post;
  const editURL = `https://github.com/wesbos/wesbos/tree/master/src/TODO`;
  const image = post.images?.[0];

  return (
    <>
      <MetaTags {...props} />
      {image && <Image src={image} alt={post.frontmatter.title} />}
      <div>
        <H>{post.frontmatter.title}</H>
        <div className={postMeta}>
          <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
          <span>{post.frontmatter.category.join(", ")}</span>
          <a rel="noopener noreferrer" target="_blank" href={editURL}>
            Edit Post <IoLogoGithub className="inline" />
          </a>
        </div>
      </div>
      <MDXContent components={mdxComponents} />
      <div className={EditDialogStyles}>
        <p>
          Find an issue with this post? Think you could clarify, update or add
          something?
        </p>
        <p>
          All my posts are available to edit on Github. Any fix, little or
          small, is appreciated!
        </p>
        <p>
          <a target="_blank" href={editURL}>
            <IoLogoGithub /> Edit on Github
          </a>
        </p>
      </div>
      <ContentNav prev={prev} next={next} />
    </>
  );
}

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};

// const getStaticPaths = async () => {
//   const posts = await getPosts({
//     limit: -1,
//     type: "blog",
//   });
//   const paths = posts.posts.map((post) => post.frontmatter.slug);
//   return paths;
// };

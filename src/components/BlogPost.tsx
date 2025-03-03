import type { BlogPost } from '../types/blog';
import { Link } from 'waku';

interface BlogPostProps {
  post: BlogPost;
  isExcerpt?: boolean;
}

// You can customize these components to style your MDX content
const components = {
  h1: (props: any) => <h1 className="text-4xl font-bold my-4" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold my-3" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-bold my-2" {...props} />,
  p: (props: any) => <p className="my-4" {...props} />,
  a: (props: any) => <a className="text-blue-600 hover:text-blue-800" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside my-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside my-4" {...props} />,
  li: (props: any) => <li className="my-1" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-gray-200 pl-4 my-4 italic" {...props} />,
  code: (props: any) => <code className="bg-gray-100 rounded px-1 py-0.5" {...props} />,
  pre: (props: any) => <pre className="bg-gray-100 rounded p-4 overflow-x-auto my-4" {...props} />,
};

export default function BlogPost({ post, isExcerpt = false }: BlogPostProps) {
  return (
    <article className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {isExcerpt ? (
            <Link to={`/blog/${post.slug}`} className="hover:text-blue-600">
              {post.title}
            </Link>
          ) : (
            post.title
          )}
        </h1>
        <div className="flex items-center space-x-4 text-gray-600">
          <div className="flex items-center">
            <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full mr-2" />
            <span>{post.author.name}</span>
          </div>
          <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString()}</time>
        </div>
      </header>

      <div className="prose max-w-none">
        {isExcerpt ? (
          <>
            <p>{post.excerpt}</p>
            <Link to={`/blog/${post.slug}`} className="inline-block mt-4 text-blue-600 hover:text-blue-800">
              Read more →
            </Link>
          </>
        ) : (
          <div>{post.content}</div>
        )}
      </div>

      <footer className="mt-6">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              #{tag}
            </span>
          ))}
        </div>
      </footer>
    </article>
  );
}

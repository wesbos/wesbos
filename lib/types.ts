export type ContentType = 'blog' | 'tip' | 'javascript'; // Blog post, hot tip, beginner javascript note
export type Frontmatter = {
  title: string;
  slug: string;
  image: string;
  category: string[];
  date: Date;
  id: number;
  filename: string;
  type: ContentType;

};

export type JavaScriptFrontmatter = Frontmatter & {
  tocTitle: string;
  title:  string;
  slug: string;
  section:  string;
}

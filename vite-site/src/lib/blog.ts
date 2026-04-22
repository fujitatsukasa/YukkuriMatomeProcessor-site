import frontMatter from 'front-matter';

export interface BlogPostMeta {
  title: string;
  date: string;
  description: string;
  author: string;
  image?: string;
  tags?: string[];
  slug: string;
}

export interface BlogPost {
  meta: BlogPostMeta;
  content: string;
}

type FrontMatterAttributes = Partial<Omit<BlogPostMeta, 'slug'>> & {
  tags?: string[]
}

export function resolveBlogVisual(meta: Pick<BlogPostMeta, 'image' | 'tags'>) {
  if (meta.image && !meta.image.startsWith('/blog_thumb_')) {
    return meta.image
  }

  const tags = new Set(meta.tags ?? [])

  if (tags.has('素材準備')) {
    return '/product_keyword_material.png'
  }

  if (tags.has('反応集') || tags.has('台本作成')) {
    return '/product_get_script.png'
  }

  if (tags.has('YMM4') || tags.has('初期設定')) {
    return '/product_guide.png'
  }

  return '/generated/template-ops-studio-v1.png'
}

// Viteの機能を使って .md ファイルをすべて文字列(raw)として取得
const markdownFiles = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export const getAllBlogPosts = (): BlogPost[] => {
  const posts: BlogPost[] = [];
  
  for (const path in markdownFiles) {
    // パスからファイル名を抽出しスラグ(URLの一部)にする (例: ../content/blog/hello-world.md -> hello-world)
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    const fileContent = markdownFiles[path];
    
    // front-matterでメタデータと本文を分離
    const parsed = frontMatter<FrontMatterAttributes>(fileContent);
    
    posts.push({
      meta: {
        title: parsed.attributes.title || '無題',
        date: parsed.attributes.date || '',
        description: parsed.attributes.description || '',
        author: parsed.attributes.author || '運営',
        image: parsed.attributes.image,
        tags: parsed.attributes.tags || [],
        slug
      },
      content: parsed.body
    });
  }
  
  // 日付の降順（新しい順）でソート
  return posts.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return getAllBlogPosts().find(post => post.meta.slug === slug);
};

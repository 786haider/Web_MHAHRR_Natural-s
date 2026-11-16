import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BLOGS_FILE = path.join(process.cwd(), 'data', 'blogs.json');

export interface BlogData {
  id: string;
  slug: string;
  tag: string;
  hashtag: string;
  count: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: string;
  authorRole: string;
  coverImage: string;
  featured?: boolean;
  excerpt: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string;
      bullets?: string[];
    }[];
    herbalityPledge: string;
  };
  keyTakeaways: string[];
  createdAt?: string;
  updatedAt?: string;
}

function getBlogs(): BlogData[] {
  try {
    if (fs.existsSync(BLOGS_FILE)) {
      const content = fs.readFileSync(BLOGS_FILE, 'utf8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading blogs:', err);
  }
  return [];
}

function saveBlogs(blogs: BlogData[]) {
  fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2), 'utf8');
}

export async function GET() {
  const blogs = getBlogs();
  return NextResponse.json(blogs);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title || !body.category) {
      return NextResponse.json(
        { error: 'Blog title and category are required' },
        { status: 400 }
      );
    }

    const blogs = getBlogs();
    const tag = body.tag ? body.tag.replace(/[^a-zA-Z0-9]/g, '') : 'Herbality';
    const slug = body.slug || tag.toLowerCase() + '-' + Date.now().toString().slice(-4);

    const newBlog: BlogData = {
      id: Date.now().toString(),
      slug,
      tag,
      hashtag: body.hashtag || `#${tag}`,
      count: body.count || 'New',
      title: body.title.trim(),
      subtitle: body.subtitle?.trim() || '',
      category: body.category.trim(),
      readTime: body.readTime || '5 min read',
      publishDate: body.publishDate || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      author: body.author || 'MHAHRR Natural Botanical Team',
      authorRole: body.authorRole || 'Botanical Herbalist',
      coverImage: body.coverImage || '/displaying_images/homepage_herbality_image.png',
      featured: Boolean(body.featured),
      excerpt: body.excerpt?.trim() || '',
      content: {
        intro: body.content?.intro?.trim() || body.excerpt?.trim() || '',
        sections: Array.isArray(body.content?.sections) ? body.content.sections : [
          {
            heading: '1. The Herbality Principle',
            body: body.bodyText?.trim() || 'This botanical formulation is rooted in centuries-old apothecary recipes designed to nourish, heal, and care naturally.',
          }
        ],
        herbalityPledge: body.content?.herbalityPledge?.trim() || 'Care crafted with compassion. For your skin, your vitality, and our shared planet.',
      },
      keyTakeaways: Array.isArray(body.keyTakeaways)
        ? body.keyTakeaways
        : typeof body.keyTakeaways === 'string'
        ? body.keyTakeaways.split(',').map((k: string) => k.trim()).filter(Boolean)
        : ['100% natural and unadulterated botanical ingredients'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    blogs.unshift(newBlog);
    saveBlogs(blogs);

    return NextResponse.json({ success: true, blog: newBlog }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create blog article' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ error: 'Blog ID is required for update' }, { status: 400 });
    }

    const blogs = getBlogs();
    const index = blogs.findIndex((b) => String(b.id) === String(body.id));

    if (index === -1) {
      return NextResponse.json({ error: 'Blog article not found' }, { status: 404 });
    }

    const updatedBlog: BlogData = {
      ...blogs[index],
      title: body.title !== undefined ? body.title.trim() : blogs[index].title,
      subtitle: body.subtitle !== undefined ? body.subtitle.trim() : blogs[index].subtitle,
      category: body.category !== undefined ? body.category.trim() : blogs[index].category,
      tag: body.tag !== undefined ? body.tag.trim() : blogs[index].tag,
      hashtag: body.hashtag !== undefined ? body.hashtag.trim() : blogs[index].hashtag,
      readTime: body.readTime !== undefined ? body.readTime.trim() : blogs[index].readTime,
      author: body.author !== undefined ? body.author.trim() : blogs[index].author,
      authorRole: body.authorRole !== undefined ? body.authorRole.trim() : blogs[index].authorRole,
      coverImage: body.coverImage !== undefined ? body.coverImage.trim() : blogs[index].coverImage,
      featured: body.featured !== undefined ? Boolean(body.featured) : blogs[index].featured,
      excerpt: body.excerpt !== undefined ? body.excerpt.trim() : blogs[index].excerpt,
      content: body.content !== undefined ? body.content : blogs[index].content,
      keyTakeaways: Array.isArray(body.keyTakeaways)
        ? body.keyTakeaways
        : typeof body.keyTakeaways === 'string'
        ? body.keyTakeaways.split(',').map((k: string) => k.trim()).filter(Boolean)
        : blogs[index].keyTakeaways,
      updatedAt: new Date().toISOString(),
    };

    blogs[index] = updatedBlog;
    saveBlogs(blogs);

    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update blog article' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Blog ID parameter is required' }, { status: 400 });
    }

    const blogs = getBlogs();
    const filtered = blogs.filter((b) => String(b.id) !== String(id));

    if (filtered.length === blogs.length) {
      return NextResponse.json({ error: 'Blog article not found' }, { status: 404 });
    }

    saveBlogs(filtered);
    return NextResponse.json({ success: true, message: 'Blog article deleted successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete blog article' }, { status: 500 });
  }
}

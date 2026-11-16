import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface ImageFile {
  name: string;
  path: string;
  url: string;
  folder: string;
  size: number;
  updatedAt: string;
}

const DIRS = [
  { folder: 'uploads', dir: path.join(process.cwd(), 'public', 'uploads') },
  { folder: 'product_img', dir: path.join(process.cwd(), 'public', 'product_img') },
  { folder: 'displaying_images', dir: path.join(process.cwd(), 'public', 'displaying_images') },
  { folder: 'logo', dir: path.join(process.cwd(), 'public', 'logo') },
];

export async function GET() {
  const images: ImageFile[] = [];

  for (const { folder, dir } of DIRS) {
    try {
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);
          if (stat.isFile()) {
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.mp4'].includes(ext)) {
              images.push({
                name: file,
                path: `/${folder}/${file}`,
                url: `/${folder}/${file}`,
                folder,
                size: stat.size,
                updatedAt: stat.mtime.toISOString(),
              });
            }
          }
        }
      }
    } catch (err) {
      console.error(`Error reading directory ${dir}:`, err);
    }
  }

  // Sort by updatedAt descending
  images.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return NextResponse.json(images);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const targetFolder = (formData.get('folder') as string) || 'uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const cleanName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const uploadDir = path.join(process.cwd(), 'public', targetFolder === 'product_img' ? 'product_img' : 'uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, cleanName);
    fs.writeFileSync(filePath, buffer);

    const relativeUrl = `/${targetFolder === 'product_img' ? 'product_img' : 'uploads'}/${cleanName}`;

    return NextResponse.json({
      success: true,
      name: cleanName,
      url: relativeUrl,
      path: relativeUrl,
      size: buffer.length,
      folder: targetFolder,
    });
  } catch (err) {
    console.error('File upload error:', err);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const targetPath = searchParams.get('path');

    if (!targetPath) {
      return NextResponse.json({ error: 'Image path is required' }, { status: 400 });
    }

    // Security check: ensure path is inside public
    const normalized = path.normalize(targetPath).replace(/^[/\\]+/, '');
    const fullPath = path.join(process.cwd(), 'public', normalized);

    // Ensure it doesn't escape public directory
    const publicDir = path.join(process.cwd(), 'public');
    if (!fullPath.startsWith(publicDir)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      return NextResponse.json({ success: true, message: 'Image deleted successfully' });
    }

    return NextResponse.json({ error: 'Image file not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}


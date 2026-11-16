import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PRODUCTS_FILE = path.join(process.cwd(), 'data', 'products.json');

export interface ProductData {
  id: string;
  name: string;
  subtitle?: string;
  category: string;
  price: number;
  inStock: boolean;
  tag?: string;
  image: string;
  accent?: string;
  description?: string;
  benefits?: string[];
  createdAt?: string;
  updatedAt?: string;
}

function getProducts(): ProductData[] {
  try {
    if (fs.existsSync(PRODUCTS_FILE)) {
      const content = fs.readFileSync(PRODUCTS_FILE, 'utf8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading products:', err);
  }
  return [];
}

function saveProducts(products: ProductData[]) {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
}

export async function GET() {
  const products = getProducts();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.category) {
      return NextResponse.json(
        { error: 'Product name and category are required' },
        { status: 400 }
      );
    }

    const products = getProducts();
    const newProduct: ProductData = {
      id: Date.now().toString(),
      name: body.name.trim(),
      subtitle: body.subtitle?.trim() || '',
      category: body.category.trim(),
      price: parseFloat(body.price) || 0,
      inStock: body.inStock !== false,
      tag: body.tag?.trim() || 'New',
      image: body.image?.trim() || '/product_img/oilImg2.png',
      accent: body.accent || '#6BAE75',
      description: body.description?.trim() || '',
      benefits: Array.isArray(body.benefits)
        ? body.benefits
        : typeof body.benefits === 'string'
        ? body.benefits.split(',').map((b: string) => b.trim()).filter(Boolean)
        : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    products.unshift(newProduct);
    saveProducts(products);

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ error: 'Product ID is required for update' }, { status: 400 });
    }

    const products = getProducts();
    const index = products.findIndex((p) => String(p.id) === String(body.id));

    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const updatedProduct: ProductData = {
      ...products[index],
      name: body.name !== undefined ? body.name.trim() : products[index].name,
      subtitle: body.subtitle !== undefined ? body.subtitle.trim() : products[index].subtitle,
      category: body.category !== undefined ? body.category.trim() : products[index].category,
      price: body.price !== undefined ? parseFloat(body.price) : products[index].price,
      inStock: body.inStock !== undefined ? Boolean(body.inStock) : products[index].inStock,
      tag: body.tag !== undefined ? body.tag.trim() : products[index].tag,
      image: body.image !== undefined ? body.image.trim() : products[index].image,
      accent: body.accent !== undefined ? body.accent : products[index].accent,
      description: body.description !== undefined ? body.description.trim() : products[index].description,
      benefits: Array.isArray(body.benefits)
        ? body.benefits
        : typeof body.benefits === 'string'
        ? body.benefits.split(',').map((b: string) => b.trim()).filter(Boolean)
        : products[index].benefits,
      updatedAt: new Date().toISOString(),
    };

    products[index] = updatedProduct;
    saveProducts(products);

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Product ID parameter is required' }, { status: 400 });
    }

    const products = getProducts();
    const filtered = products.filter((p) => String(p.id) !== String(id));

    if (filtered.length === products.length) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    saveProducts(filtered);
    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}

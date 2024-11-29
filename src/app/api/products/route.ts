import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { ProductSchema } from '@/lib/schemas';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    const serializedProducts = products.map(product => ({
      ...product,
      price: product.price.toString()
    }));
    return NextResponse.json(serializedProducts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = ProductSchema.parse(body);
    
    const product = await prisma.product.create({
      data: validatedData as Prisma.ProductCreateInput,
    });
    
    const serializedProduct = {
      ...product,
      price: product.price.toString()
    };
    
    return NextResponse.json(serializedProduct);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 400 });
  }
}

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { ProductSchema } from '@/lib/schemas';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(params.id) },
    });
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    // Convert Decimal to string for serialization
    const serializedProduct = {
      ...product,
      price: product.price.toString()
    };
    
    return NextResponse.json(serializedProduct);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = ProductSchema.parse(body);
    
    const product = await prisma.product.update({
      where: { id: parseInt(params.id) },
      data: validatedData,
    });
    
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: parseInt(params.id) },
    });
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 400 });
  }
}

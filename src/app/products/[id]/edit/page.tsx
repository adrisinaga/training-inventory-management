import { PrismaClient } from '@prisma/client';
import ProductForm from '@/components/ProductForm';

const prisma = new PrismaClient();

export default async function EditProduct({
  params,
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <ProductForm product={product} isEdit />
    </div>
  );
}

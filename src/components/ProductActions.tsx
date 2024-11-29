'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

type ProductActionsProps = {
  productId: number;
};

export default function ProductActions({ productId }: ProductActionsProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      router.refresh();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  return (
    <div className="space-x-2">
      <Link
        href={`/products/${productId}/edit`}
        className="text-indigo-600 hover:text-indigo-900"
      >
        Edit
      </Link>
      <button
        onClick={handleDelete}
        className="text-red-600 hover:text-red-900"
      >
        Delete
      </button>
    </div>
  );
}

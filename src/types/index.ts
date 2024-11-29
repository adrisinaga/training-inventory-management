export interface Product {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  quantity: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

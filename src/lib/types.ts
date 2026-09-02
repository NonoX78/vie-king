export type Product = {
  id: string;
  slug: string;
  name: string;
  colorway: string;
  edition: string;
  material: string;
  price_cents: number;
  description: string;
  story: string;
  image_url: string;
  accent_color?: string;
  gallery: string[];
  stock: number;
  is_active: boolean;
  created_at?: string;
};

export type CartLine = {
  product: Product;
  quantity: number;
};

export type CustomerInfo = {
  full_name: string;
  email: string;
  phone: string;
  address_line: string;
  city: string;
  postal_code: string;
};

export type Order = {
  id?: string;
  customer: CustomerInfo;
  lines: {
    product_id: string;
    name: string;
    quantity: number;
    price_cents: number;
  }[];
  total_cents: number;
  status: "pending" | "paid" | "fulfilled" | "cancelled";
  payment_provider: "sumup";
  created_at?: string;
};
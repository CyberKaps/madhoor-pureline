
import { api } from "./axios";



export async function getProducts() {
  try {
    const res = await api.get("/product");
    const products = res.data.data || [];
    return products.map((p: any) => ({
      ...p,
      ...(p.metadata || {})
    }));
  } catch (error) {
    console.error("Failed to fetch products", error);
    return [];
  }
}

export async function getOneProduct(id: string) {
  try {
    const res = await api.get(`/product/${id}`);
    const product = res.data.data;
    
    if (!product) return null;

    // Merge base product fields with metadata fields for the frontend
    return {
      ...product,
      ...(product.metadata || {})
    };
  } catch (error) {
    console.error("Failed to fetch single product", error);
    return null;
  }
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    imageUrl?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface ProductsResponse {
    success: boolean;
    data: Product[];
}

export interface ProductResponse {
    success: boolean;
    data: Product;
}

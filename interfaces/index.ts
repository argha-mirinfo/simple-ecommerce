export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Record<string, any>
}

export interface Category {
    label: string;
    value: string;
}
export class Product {
    product_id: number;
    category: string;
    subcategory: string;
    product_type: string;
    product_name: boolean;
    brand: string;
    price_sale: number;
    price_actual: number;
    price_savings: number;
    short_desc: string;
    long_desc: string;
    rating: number;
    rating_count: number;
    color: Array<string>;
    size: Array<string>;
    thumbnail_url: string;
    image_url: string;
}
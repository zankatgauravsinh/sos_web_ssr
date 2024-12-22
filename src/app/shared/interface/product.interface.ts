import { PaginateModel } from "./core.interface";


export interface ProductModel extends PaginateModel {
    data: Product[];
}

export interface Product {
    highlightedName: string;
    categories_ids: number[];
    id: number;
    name: string;
    slug: string;
    brand_id: number | null;
    brand: any;
    selected_variant?: Variation;
    product_type?: string;
    short_description: string;
    description: string;
    type: string;
    product_thumbnail_id?: number;
    product_thumbnail?: any;
    product_galleries_id?: [];
    product_galleries?: any[];
    unit: string;
    weight: number;
    price: number;
    is_wishlist: boolean;
    sale_price: number;
    discount: number;
    is_sale_enable: boolean | number,
    sale_starts_at: string,
    sale_expired_at: string,
    sku: string;
    stock_status: string;
    stock: string;
    visible_time: string;
    quantity: number;
    preview_type: string | null;
    preview_audio_file: any | null;
    preview_audio_file_id: number | null;
    preview_video_file: any | null;
    preview_video_file_id: number | null;
    store_id?: number;
    size_chart_image_id: number;
    size_chart_image: any;
    estimated_delivery_text: string;
    return_policy_text: string;
    safe_checkout: boolean;
    preview_url: string | null;
    secure_checkout: boolean;
    social_share: boolean;
    encourage_order: boolean;
    encourage_view: boolean;
    is_free_shipping: boolean;
    is_featured: boolean | number;
    is_trending: boolean;
    is_return: boolean | number;
    shipping_days: number | null;
    tax_id: number;
    tax: any;
    status: boolean;
    meta_title: string;
    meta_description: string;
    product_meta_image: any;
    product_meta_image_id: number;
    tags: any[];
    tag: any;
    categories: any[];
    category: any;
    store?: any;
    store_name?: string;
    orders_count: string | number;
    order_amount: string | number;
    attribute_values: [];
    variations: Variation[];
    wholesale_price_type: string | null;
    wholesales: WholesalePrice[];
    variants: Variant[];
    attributes: any[];
    attributes_ids: number[];
    is_random_related_products: boolean;
    is_external: boolean;
    external_url: string;
    external_button_text: string;
    related_products: number[];
    cross_sell_products: number[];
    pivot?: PivotProduct;
    created_by_id: number;
    is_approved: boolean;
    total_in_approved_products: number;
    published_at: string;
    reviews: any[];
    reviews_count: number;
    wishlist_name: string;
    rating_count: number;
    review_ratings: number[];
    user_review: any;
    can_review: boolean;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface PivotProduct {
    order_id: number;
    product_id: number;
    quantity: number;
    shipping_cost: number;
    single_price: number;
    subtotal: number;
    variation_id?: number;
    variation: Variation;
    refund_status: string;
}

export interface Variation {
    id: number;
    name: string;
    price: number;
    sale_price: number;
    stock_status: string;
    product_id: number;
    sku: string;
    discount: number;
    quantity: number;
    variation_image: any;
    variation_image_id: number;
    variation_options: VariationOption[];
    variation_galleries_id: [];
    variation_galleries: any[];
    attribute_values: any[];
    selected_variation: string;
    status: boolean;
}

export interface VariationOption {
    name: string;
    value: string;
}

export interface Variant {
    id: number | null;
    attribute_values: number[] | null;
    options: any;
    variant_option: any;
}

export interface SelectedVariant {
    id: number;
    attribute_id: number;
}

export interface WholesalePrice {
    id?: number | null;
    min_qty: number;
    max_qty: number;
    value: number;
}

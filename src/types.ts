export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand?: string
  category: string
  thumbnail: string
  images: string[]
  warrantyInformation?: string
  shippingInformation?: string
  returnPolicy?: string
  availabilityStatus?: string
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export type SortKey = 'default' | 'price-asc' | 'price-desc' | 'rating'

export interface CartItem {
  id: number
  title: string
  price: number
  thumbnail: string
  category: string
  qty: number
}

export interface WishItem {
  id: number
  title: string
  price: number
  thumbnail: string
  category: string
}
import type { ProductsResponse, Product } from '../types'

const BASE = 'https://dummyjson.com'

interface FetchParams {
  limit: number
  skip: number
  category?: string
  query?: string
}

export async function fetchProducts(params: FetchParams): Promise<ProductsResponse> {
  const { limit, skip, category, query } = params
  let url = `${BASE}/products?limit=${limit}&skip=${skip}`

  if (query) {
    url = `${BASE}/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`
  } else if (category && category !== 'all') {
    url = `${BASE}/products/category/${category}?limit=${limit}&skip=${skip}`
  }

  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`${BASE}/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}
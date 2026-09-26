import { fetchProducts } from '../api/products'
import { productCard, productCardSkeleton } from '../components/products'
import type { Product, SortKey } from '../types'

const productMap = new Map<number, Product>()

export function getProduct(id: number): Product | undefined {
  return productMap.get(id)
}

export function registerProduct(p: Product): void {
  productMap.set(p.id, p)
}

const LIMIT = 12

const CATEGORIES = [
  { slug: 'all', label: 'All' },
  { slug: 'smartphones', label: 'Smartphones' },
  { slug: 'laptops', label: 'Laptops' },
  { slug: 'fragrances', label: 'Fragrances' },
  { slug: 'skin-care', label: 'Skincare' },
  { slug: 'groceries', label: 'Groceries' },
  { slug: 'home-decoration', label: 'Decor' },
]

const SORT_LABELS: Record<SortKey, string> = {
  default: 'Newest',
  'price-asc': 'Price ↑',
  'price-desc': 'Price ↓',
  rating: 'Top rated',
}

interface State {
  products: Product[]
  total: number
  page: number
  category: string
  query: string
  sort: SortKey
  loading: boolean
  error: boolean
}

const state: State = {
  products: [],
  total: 0,
  page: 0,
  category: 'all',
  query: '',
  sort: 'default',
  loading: true,
  error: false,
}

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T | null

export function initProducts(): void {
  const grid = $('grid')
  const chips = $('chips')
  const resultCount = $('resultCount')
  const loadMoreWrap = $('loadMoreWrap')
  const loadMoreBtn = $<HTMLButtonElement>('loadMoreBtn')
  const loadMoreText = $('loadMoreText')
  const loadMoreSpinner = $('loadMoreSpinner')
  const loadMoreArrow = $('loadMoreArrow')
  const sortBtn = $('sortBtn')
  const sortMenu = $('sortMenu')
  const sortLabel = $('sortLabel')

  if (!grid) return

  const renderChips = () => {
    if (!chips) return
    chips.innerHTML = CATEGORIES.map(c => {
      const active = state.category === c.slug
      const base = 'shrink-0 h-10 px-5 rounded-full text-[13px] font-semibold transition-colors duration-200'
const cls = active
  ? `${base} bg-white text-zinc-900`
  : `${base} text-white/70 bg-white/5 border border-white/10 hover:border-white/25 hover:text-white`
      return `<button data-category="${c.slug}" class="${cls}">${c.label}</button>`
    }).join('')

    chips.querySelectorAll<HTMLButtonElement>('[data-category]').forEach(btn => {
      btn.addEventListener('click', () => setCategory(btn.dataset.category!))
    })
  }

  const setCategory = (slug: string) => {
    if (state.category === slug) return
    state.category = slug
    state.query = ''
    renderChips()
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    load({ reset: true })
  }

  const applySort = (arr: Product[]): Product[] => {
    if (state.sort === 'default') return arr
    const a = arr.slice()
    if (state.sort === 'price-asc') return a.sort((x, y) => x.price - y.price)
    if (state.sort === 'price-desc') return a.sort((x, y) => y.price - x.price)
    if (state.sort === 'rating') return a.sort((x, y) => y.rating - x.rating)
    return a
  }

  const updateLoadMoreBtn = () => {
    if (!loadMoreBtn) return
    if (state.loading) {
      if (loadMoreText) loadMoreText.textContent = 'Loading...'
      loadMoreSpinner?.classList.remove('hidden')
      loadMoreArrow?.classList.add('hidden')
      loadMoreBtn.disabled = true
    } else {
      if (loadMoreText) loadMoreText.textContent = 'Load more'
      loadMoreSpinner?.classList.add('hidden')
      loadMoreArrow?.classList.remove('hidden')
      loadMoreBtn.disabled = false
    }
  }

  const renderGrid = () => {
    if (state.loading && state.products.length === 0) {
      grid.innerHTML = Array.from({ length: 8 }, productCardSkeleton).join('')
      if (resultCount) resultCount.textContent = ''
      loadMoreWrap?.classList.add('hidden')
      return
    }

    if (state.error && state.products.length === 0) {
      grid.innerHTML = errorState()
      if (resultCount) resultCount.textContent = ''
      loadMoreWrap?.classList.add('hidden')
      return
    }

    if (state.products.length === 0) {
      grid.innerHTML = emptyState()
      if (resultCount) resultCount.textContent = ''
      loadMoreWrap?.classList.add('hidden')
      return
    }

    grid.innerHTML = applySort(state.products).map(productCard).join('')
    if (resultCount) resultCount.textContent = `${state.products.length} of ${state.total} products`

    const hasMore = state.products.length < state.total
    loadMoreWrap?.classList.toggle('hidden', !hasMore)
    updateLoadMoreBtn()
  }

  const load = async ({ reset = false } = {}) => {
    if (reset) {
      state.page = 0
      state.products = []
      state.error = false
    }
    state.loading = true

    if (state.products.length === 0) renderGrid()
    else updateLoadMoreBtn()

    try {
      const data = await fetchProducts({
        limit: LIMIT,
        skip: state.page * LIMIT,
        category: state.query ? undefined : state.category,
        query: state.query || undefined,
      })
      state.products = reset ? data.products : [...state.products, ...data.products]
      data.products.forEach(prod => productMap.set(prod.id, prod))
      state.total = data.total
      state.error = false
    } catch {
      state.error = true
      state.loading = false
      renderGrid()
      return
    }

    state.loading = false
    renderGrid()
  }

  const setSort = (key: SortKey) => {
    state.sort = key
    sortMenu?.classList.add('hidden')
    if (sortLabel) sortLabel.textContent = SORT_LABELS[key]
    sortMenu?.querySelectorAll<SVGElement>('[data-check]').forEach(el => {
      el.classList.toggle('hidden', el.dataset.check !== key)
    })
    renderGrid()
  }

  grid.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (target.closest('#retryBtn')) load({ reset: true })
  })

  loadMoreBtn?.addEventListener('click', () => {
    state.page += 1
    load()
  })

  sortBtn?.addEventListener('click', (e) => {
    e.stopPropagation()
    sortMenu?.classList.toggle('hidden')
  })

  document.addEventListener('click', () => sortMenu?.classList.add('hidden'))

    sortMenu?.querySelectorAll<HTMLButtonElement>('[data-sort]').forEach(btn => {
    btn.addEventListener('click', () => setSort(btn.dataset.sort as SortKey))
  })

  document.addEventListener('nook:set-category', (e) => {
    const slug = (e as CustomEvent).detail as string
    if (slug) setCategory(slug)
  })

  document.addEventListener('nook:search', (e) => {
    const q = (e as CustomEvent).detail as string
    state.query = q
    state.category = 'all'
    renderChips()
    load({ reset: true })
  })

  renderChips()
  renderGrid()
  load({ reset: true })
}

function errorState(): string {
  return `<div class="col-span-full text-center py-20">
    <div class="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-rose-500/20 to-orange-500/20 flex items-center justify-center mb-4">
      <svg class="w-7 h-7 text-rose-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>
    </div>
    <p class="font-display font-bold text-xl text-white">Something went wrong</p>
    <p class="text-[13px] text-white/50 mt-1 mb-6">We couldn't load the products</p>
    <button id="retryBtn" class="h-11 px-7 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 text-white text-[13px] font-bold active:scale-95 transition shadow-lg shadow-orange-500/30">Try again</button>
  </div>`
}

function emptyState(): string {
  return `<div class="col-span-full text-center py-20">
    <div class="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-orange-500/20 to-rose-500/20 flex items-center justify-center mb-4">
      <svg class="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path stroke-linecap="round" d="M20 20l-3.5-3.5"/></svg>
    </div>
    <p class="font-display font-bold text-xl text-white">Nothing found</p>
    <p class="text-[13px] text-white/50 mt-1">Try another category</p>
  </div>`
}
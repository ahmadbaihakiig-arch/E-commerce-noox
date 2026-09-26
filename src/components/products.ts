import type { Product } from '../types'

const CATEGORY_COLORS: Record<string, [string, string]> = {
  smartphones: ['#fb7185', '#fb7185'],
  laptops: ['#fb923c', '#fb923c'],
  fragrances: ['#f472b6', '#f472b6'],
  'skin-care': ['#fbbf24', '#fbbf24'],
  groceries: ['#f87171', '#f87171'],
  'home-decoration': ['#fca5a5', '#fca5a5'],
  default: ['#fb7185', '#fb923c'],
}

export function productsSection(): string {
  return `
  <main id="products" class="bg-zinc-950 relative">
    <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    <div class="max-w-7xl mx-auto px-4 lg:px-8 pt-14 lg:pt-20 pb-20 lg:pb-28">
      <div class="flex items-end justify-between gap-4 mb-8 lg:mb-10">
        <div class="min-w-0">
          <h2 class="text-3xl lg:text-4xl font-display font-bold tracking-tightest text-white">
            Picked <span class="text-grad">for you</span>
          </h2>
          <p id="resultCount" class="text-[13px] text-white/50 mt-2"></p>
        </div>
        <div class="relative shrink-0">
          <button id="sortBtn" class="h-10 pl-4 pr-3 rounded-full bg-white/5 border border-white/15 text-[13px] font-semibold text-white flex items-center gap-2 active:scale-95 transition-colors duration-200 hover:border-orange-400/60 hover:bg-white/10">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M3 6h18M6 12h12M10 18h4"/></svg>
            <span id="sortLabel">Newest</span>
            <svg class="w-3.5 h-3.5 text-white/40" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div id="sortMenu" class="hidden absolute right-0 top-12 w-52 bg-zinc-900/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/60 border border-white/10 py-1.5 scale-in origin-top-right z-40">
            ${sortOption('default', 'Newest')}
            ${sortOption('price-asc', 'Price: low to high')}
            ${sortOption('price-desc', 'Price: high to low')}
            ${sortOption('rating', 'Top rated')}
          </div>
        </div>
      </div>

      <div id="chips" class="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-8 lg:mb-10 -mx-4 px-4 lg:mx-0 lg:px-0 lg:justify-center"></div>

      <div id="grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5"></div>

      <div id="loadMoreWrap" class="mt-12 lg:mt-16 hidden flex justify-center">
        <button id="loadMoreBtn" class="flex items-center gap-2 h-12 px-8 rounded-full bg-white/5 border border-white/15 text-[13px] font-bold text-white active:scale-95 transition-colors duration-200 disabled:opacity-50 hover:border-orange-400/60 hover:bg-white/10">
          <span id="loadMoreText">Load more</span>
          <svg id="loadMoreSpinner" class="hidden w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
          <svg id="loadMoreArrow" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
        </button>
      </div>
    </div>
  </main>
  `
}

function sortOption(key: string, label: string): string {
  return `<button data-sort="${key}" class="w-full text-left h-10 px-4 text-[13px] font-medium text-white hover:bg-white/10 transition-colors duration-150 flex items-center justify-between rounded-xl mx-1">
    <span>${label}</span>
    <svg data-check="${key}" class="w-4 h-4 hidden text-orange-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
  </button>`
}

export function productCard(p: Product): string {
  const colors = CATEGORY_COLORS[p.category] ?? CATEGORY_COLORS.default
  const thumb = p.thumbnail
  const brand = (p.brand ?? p.category.replace(/-/g, ' ')).toUpperCase()

  const hasDiscount = p.discountPercentage > 5
  const lowStock = p.stock < 15

  const badge = lowStock
    ? `<span class="absolute top-2.5 left-2.5 h-6 px-2.5 rounded-full bg-amber-400 text-zinc-900 text-[10px] font-black tracking-wider flex items-center shadow-md z-20">${p.stock} LEFT</span>`
    : hasDiscount
    ? `<span class="absolute top-2.5 left-2.5 h-6 px-2.5 rounded-full bg-zinc-900/85 text-white text-[10px] font-black tracking-wider flex items-center shadow-md z-20">-${Math.round(p.discountPercentage)}%</span>`
    : ''

  const oldPrice = hasDiscount
    ? `<span class="text-[10px] text-white/30 line-through">$${(p.price * (1 + p.discountPercentage / 100)).toFixed(0)}</span>`
    : ''

  return `
  <article data-product-id="${p.id}" class="card group relative rounded-2xl lg:rounded-3xl bg-zinc-900 p-2 lg:p-2.5 cursor-pointer border border-white/[0.06] hover:border-orange-400/50 transition-colors duration-200">

    <div class="relative aspect-square rounded-xl lg:rounded-2xl overflow-hidden p-3 lg:p-4" style="background:linear-gradient(135deg, ${colors[0]}, ${colors[1]})">

      <div class="w-full h-full bg-white rounded-lg lg:rounded-xl flex items-center justify-center overflow-hidden">
        <img src="${thumb}" alt="${p.title}" loading="lazy" decoding="async" class="w-full h-full object-contain p-1 lg:p-2">
      </div>

      ${badge}

      <button data-wishlist="${p.id}" class="absolute top-4 right-4 lg:top-5 lg:right-5 w-8 h-8 rounded-full bg-zinc-900/70 border border-white/20 flex items-center justify-center active:scale-90 transition-transform duration-150 z-20" aria-label="Add to wishlist">
        <svg class="w-3.5 h-3.5 fill-none stroke-white" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
      </button>

      <button data-add-to-cart="${p.id}" class="absolute bottom-4 right-4 lg:bottom-5 lg:right-5 w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center shadow-lg active:scale-90 transition-opacity duration-150 hover:bg-zinc-800 z-20 lg:opacity-0 lg:group-hover:opacity-100" aria-label="Add to cart">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M12 5v14M5 12h14"/></svg>
      </button>
    </div>

    <div class="px-2 lg:px-2.5 pt-3 pb-1.5">
      <div class="flex items-center gap-1.5 mb-1.5">
        <span class="w-1.5 h-1.5 rounded-full shrink-0" style="background:${colors[0]}"></span>
        <span class="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.15em] truncate" style="color:${colors[0]}">${brand}</span>
      </div>

      <h4 class="text-[13px] lg:text-[14px] font-semibold leading-snug line-clamp-2 text-white mb-3 min-h-[34px] lg:min-h-[38px]">${p.title}</h4>

      <div class="flex items-center gap-1 mb-2.5">
        <div class="flex items-center gap-0.5 text-amber-400">
          <svg class="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.29a1 1 0 00.95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 00-.36 1.12l1.07 3.29c.3.92-.76 1.69-1.54 1.12l-2.8-2.03a1 1 0 00-1.18 0l-2.8 2.03c-.78.57-1.84-.2-1.54-1.12l1.07-3.29a1 1 0 00-.36-1.12L.95 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 00.95-.69L9.05 2.93z"/></svg>
          <span class="text-[10px] font-bold text-amber-300">${p.rating.toFixed(1)}</span>
        </div>
        <span class="text-[10px] text-white/20">·</span>
        <span class="text-[10px] text-white/40">${p.stock} in stock</span>
      </div>

      <div class="flex items-baseline gap-1.5">
        <span class="font-display font-bold text-[20px] lg:text-[22px] tracking-tight text-white leading-none">$${p.price.toFixed(2)}</span>
        ${oldPrice}
      </div>
    </div>
  </article>
  `
}

export function productCardSkeleton(): string {
  return `
  <div class="bg-zinc-900 rounded-2xl lg:rounded-3xl overflow-hidden border border-white/[0.06]">
    <div class="aspect-[4/5] shimmer"></div>
    <div class="p-3.5 lg:p-4">
      <div class="h-2.5 rounded-full shimmer w-1/3 mb-2"></div>
      <div class="h-3.5 rounded-full shimmer w-full mb-1.5"></div>
      <div class="h-3.5 rounded-full shimmer w-3/4 mb-3"></div>
      <div class="h-5 rounded-full shimmer w-1/2"></div>
    </div>
  </div>
  `
}
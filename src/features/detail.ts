import { getProduct, registerProduct } from './products'
import { fetchProductById } from '../api/products'
import { enableDragScroll } from '../lib/dragScroll'
import { openModal, closeModal } from '../lib/modalHistory'
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

let isOpen = false
export function initDetail(): void {
  const backdrop = document.getElementById('detailBackdrop')
  const panel = document.getElementById('detailPanel')
  const content = document.getElementById('detailContent')
  const footer = document.getElementById('detailFooter')

  if (!backdrop || !panel || !content || !footer) return

  let detachDrag: (() => void) | null = null

  const closeUI = () => {
    if (!isOpen) return
    isOpen = false

    backdrop.classList.remove('open')
    panel.classList.remove('open')
    panel.setAttribute('aria-hidden', 'true')

    if (detachDrag) {
      detachDrag()
      detachDrag = null
    }

    window.setTimeout(() => {
      backdrop.classList.add('hidden')
      panel.classList.add('hidden')
      content.innerHTML = ''
      footer.innerHTML = ''
    }, 300)

    document.body.style.overflow = ''
  }

  const close = () => {
    if (!isOpen) return
    closeUI()
    closeModal()
  }

  const open = (p: Product) => {
    if (isOpen) return
    isOpen = true

    content.innerHTML = renderContent(p)
    footer.innerHTML = renderFooter(p)

    backdrop.classList.remove('hidden')
    panel.classList.remove('hidden')
    panel.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'

    requestAnimationFrame(() => {
      backdrop.classList.add('open')
      panel.classList.add('open')
    })

    openModal('detail', { isOpen: () => isOpen, closeUI })

    const gallery = document.getElementById('detailGallery')
    const dots = document.querySelectorAll<HTMLElement>('#detailDots span')

    if (gallery) {
      detachDrag = enableDragScroll(gallery)

      if (dots.length > 1) {
        let raf = 0
        gallery.addEventListener('scroll', () => {
          if (raf) return
          raf = requestAnimationFrame(() => {
            const idx = Math.round(gallery.scrollLeft / gallery.clientWidth)
            dots.forEach((d, i) => {
              d.className = i === idx
                ? 'w-5 h-1.5 rounded-full bg-white transition-all duration-200'
                : 'w-1.5 h-1.5 rounded-full bg-white/40 transition-all duration-200'
            })
            raf = 0
          })
        }, { passive: true })
      }
    }
  }

  const openById = (id: number) => {
    const cached = getProduct(id)
    if (cached) {
      open(cached)
      return
    }
    fetchProductById(id)
      .then(fetched => {
        registerProduct(fetched)
        open(fetched)
      })
      .catch(() => {})
  }

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement

    if (target.closest('#detailClose') || target === backdrop) {
      close()
      return
    }

    if (target.closest('[data-add-to-cart]') || target.closest('[data-wishlist]')) return

    const card = target.closest<HTMLElement>('[data-product-id]')
    if (card?.dataset.productId) {
      openById(Number(card.dataset.productId))
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) close()
  })
}

function renderContent(p: Product): string {
  const colors = CATEGORY_COLORS[p.category] ?? CATEGORY_COLORS.default
  const brand = (p.brand ?? p.category.replace(/-/g, ' ')).toUpperCase()
  const images = p.images?.length ? p.images : [p.thumbnail]

  const hasDiscount = p.discountPercentage > 5
  const oldPrice = hasDiscount ? p.price * (1 + p.discountPercentage / 100) : 0
  const saving = oldPrice - p.price

  const stockLabel = p.stock < 15 ? `Only ${p.stock} left` : `${p.stock} in stock`
  const stockColor = p.stock < 15 ? 'text-rose-400' : 'text-emerald-400'
  const stockDot = p.stock < 15 ? 'bg-rose-400' : 'bg-emerald-400'

  const gallery = images.map((src, i) => `
    <div class="snap-center shrink-0 w-full aspect-square bg-zinc-900 flex items-center justify-center p-8">
      <img src="${src}" alt="" class="max-w-full max-h-full object-contain pointer-events-none select-none" ${i === 0 ? 'loading="eager"' : 'loading="lazy"'} decoding="async">
    </div>
  `).join('')

  const dots = images.length > 1
    ? `<div id="detailDots" class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 items-center px-3 py-2 rounded-full bg-black/60">
        ${images.map((_, i) => `<span class="${i === 0 ? 'w-5 h-1.5' : 'w-1.5 h-1.5'} rounded-full ${i === 0 ? 'bg-white' : 'bg-white/40'} transition-all duration-200"></span>`).join('')}
      </div>`
    : ''

  const discBadge = hasDiscount
    ? `<span class="h-7 px-3 rounded-full text-white text-[11px] font-black tracking-wider flex items-center shadow-md" style="background:${colors[0]}">-${Math.round(p.discountPercentage)}% OFF</span>`
    : ''

  const priceBlock = hasDiscount
    ? `<span class="text-3xl font-display font-bold tracking-tightest text-white">$${p.price.toFixed(2)}</span>
       <span class="text-[15px] text-white/30 line-through">$${oldPrice.toFixed(2)}</span>
       <span class="ml-1 h-6 px-2.5 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-white text-[11px] font-black flex items-center">SAVE $${saving.toFixed(2)}</span>`
    : `<span class="text-3xl font-display font-bold tracking-tightest text-white">$${p.price.toFixed(2)}</span>`

  return `
    <div class="relative bg-zinc-950">
      <div class="flex snap-x snap-mandatory overflow-x-auto no-scrollbar" id="detailGallery">${gallery}</div>
      ${discBadge ? `<div class="absolute top-3 left-3 flex gap-2 pointer-events-none">${discBadge}</div>` : ''}
      ${dots}
    </div>

    <div class="px-5 lg:px-6 py-5">
      <p class="text-[10px] font-black uppercase tracking-[0.15em]" style="color:${colors[0]}">${brand}</p>
      <h1 class="mt-2 text-2xl lg:text-3xl font-display font-bold tracking-tightest leading-tight text-white">${p.title}</h1>

      <div class="flex items-center gap-3 mt-4">
        <div class="flex items-center gap-1 h-7 px-2.5 rounded-full bg-amber-400/10">
          <svg class="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.29a1 1 0 00.95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 00-.36 1.12l1.07 3.29c.3.92-.76 1.69-1.54 1.12l-2.8-2.03a1 1 0 00-1.18 0l-2.8 2.03c-.78.57-1.84-.2-1.54-1.12l1.07-3.29a1 1 0 00-.36-1.12L.95 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 00.95-.69L9.05 2.93z"/></svg>
          <span class="text-[12px] font-black text-amber-300">${p.rating.toFixed(1)}</span>
        </div>
        <span class="text-[12px] text-white/30">·</span>
        <span class="text-[12px] font-semibold ${stockColor} flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full ${stockDot}"></span>
          ${stockLabel}
        </span>
      </div>

      <div class="flex items-baseline gap-2 mt-5 flex-wrap">${priceBlock}</div>

      <div class="h-px bg-white/10 my-6"></div>

      <p class="text-[11px] font-black uppercase tracking-[0.15em] text-white/40 mb-2">Description</p>
      <p class="text-[14px] text-white/70 leading-relaxed">${p.description}</p>

      <div class="grid grid-cols-2 gap-3 mt-6">
        <div class="p-3.5 rounded-2xl bg-orange-500/10 border border-orange-500/20">
          <p class="text-[10px] font-black uppercase tracking-[0.15em] text-orange-300">Warranty</p>
          <p class="text-[13px] font-bold mt-1 text-white">${p.warrantyInformation ?? '1 year'}</p>
        </div>
        <div class="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
          <p class="text-[10px] font-black uppercase tracking-[0.15em] text-cyan-300">Shipping</p>
          <p class="text-[13px] font-bold mt-1 text-white">${p.shippingInformation ?? '3-5 days'}</p>
        </div>
      </div>
    </div>
  `
}

function renderFooter(p: Product): string {
  return `
    <div class="flex items-center gap-3">
      <button data-wishlist="${p.id}" class="w-12 h-12 rounded-2xl border border-white/15 flex items-center justify-center active:scale-95 transition-transform duration-150 text-white shrink-0" aria-label="Wishlist">
        <svg class="w-5 h-5 fill-none stroke-current" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
      </button>
      <button id="detailCartBtn" class="w-12 h-12 rounded-2xl border border-white/15 flex items-center justify-center active:scale-95 transition-transform duration-150 text-white shrink-0" aria-label="View cart">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6a1 1 0 00.9 1.4H19M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"/></svg>
      </button>
      <button data-add-to-cart="${p.id}" class="flex-1 h-12 rounded-2xl bg-gradient-to-br from-orange-500 via-rose-500 to-orange-500 text-white text-[14px] font-bold active:scale-[0.98] transition-transform duration-150 shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M12 5v14M5 12h14"/></svg>
        Add to cart
      </button>
    </div>
  `
}
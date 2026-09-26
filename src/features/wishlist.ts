import type { WishItem } from '../types'
import { getProduct } from './products'
import { showToast } from './toast'
import { openModal, closeModal } from '../lib/modalHistory'

const STORAGE_KEY = 'nook_wishlist'

let wishlist: WishItem[] = load()

function load(): WishItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function save(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist))
  } catch {}
}

function has(id: number): boolean {
  return wishlist.some(i => i.id === id)
}

let isOpen = false
let els: {
  backdrop: HTMLElement
  panel: HTMLElement
  items: HTMLElement
  count: HTMLElement
  badge: HTMLElement
} | null = null

export function initWishlist(): void {
  const backdrop = document.getElementById('wishBackdrop')
  const panel = document.getElementById('wishPanel')
  const items = document.getElementById('wishItems')
  const count = document.getElementById('wishCount')
  const badge = document.getElementById('wishlistBadge')

  if (!backdrop || !panel || !items || !count || !badge) return

  els = { backdrop, panel, items, count, badge }

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement

    const wishBtn = target.closest<HTMLElement>('[data-wishlist]')
    if (wishBtn?.dataset.wishlist) {
      e.stopPropagation()
      e.preventDefault()
      toggle(Number(wishBtn.dataset.wishlist))
      return
    }

    const wishAdd = target.closest<HTMLElement>('[data-wish-add]')
    if (wishAdd?.dataset.wishAdd) {
      addToCart(Number(wishAdd.dataset.wishAdd))
      return
    }

    const wishRemove = target.closest<HTMLElement>('[data-wish-remove]')
    if (wishRemove?.dataset.wishRemove) {
      remove(Number(wishRemove.dataset.wishRemove))
      return
    }

    if (target.closest('#wishBtn')) {
      e.preventDefault()
      open()
      return
    }

    if (target.closest('#wishClose') || target === backdrop) {
      close()
      return
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) close()
  })

  render()
  updateBadge()
  syncHearts()
}

export function toggle(id: number): void {
  if (has(id)) {
    wishlist = wishlist.filter(i => i.id !== id)
  } else {
    const p = getProduct(id)
    if (!p) return
    wishlist.push({
      id: p.id,
      title: p.title,
      price: p.price,
      thumbnail: p.thumbnail,
      category: p.category,
    })
    showToast('Added to wishlist')
  }
  save()
  render()
  updateBadge(true)
  syncHearts()
}

function remove(id: number): void {
  wishlist = wishlist.filter(i => i.id !== id)
  save()
  render()
  updateBadge()
  syncHearts()
}

function addToCart(id: number): void {
  const event = new CustomEvent('nook:add-to-cart', { detail: id })
  document.dispatchEvent(event)
}

function updateBadge(pop = false): void {
  if (!els) return
  const n = wishlist.length
  els.badge.textContent = n > 99 ? '99+' : String(n)
  els.badge.classList.toggle('hidden', n === 0)
  if (pop && n > 0) {
    els.badge.classList.remove('badge-pop')
    void els.badge.offsetWidth
    els.badge.classList.add('badge-pop')
  }
}

function syncHearts(): void {
  document.querySelectorAll<HTMLElement>('[data-wishlist]').forEach(btn => {
    const id = Number(btn.dataset.wishlist)
    const active = has(id)
    const svg = btn.querySelector('svg')
    if (!svg) return
    if (active) {
      svg.classList.remove('fill-none', 'stroke-white/85', 'stroke-white')
      svg.classList.add('fill-rose-500', 'stroke-rose-500')
    } else {
      svg.classList.add('fill-none')
      svg.classList.remove('fill-rose-500', 'stroke-rose-500')
    }
  })
}

function render(): void {
  if (!els) return

  const n = wishlist.length
  els.count.textContent = `${n} ${n === 1 ? 'item' : 'items'}`

  if (n === 0) {
    els.items.innerHTML = emptyState()
    return
  }

  els.items.innerHTML = wishlist.map(itemRow).join('')
}

function open(): void {
  if (!els || isOpen) return
  isOpen = true
  els.backdrop.classList.remove('hidden')
  els.panel.classList.remove('hidden')
  els.panel.setAttribute('aria-hidden', 'false')
  document.body.style.overflow = 'hidden'
  requestAnimationFrame(() => {
    els!.backdrop.classList.add('open')
    els!.panel.classList.add('open')
  })
  openModal('wishlist', { isOpen: () => isOpen, closeUI })
}

function closeUI(): void {
  if (!els || !isOpen) return
  isOpen = false
  els.backdrop.classList.remove('open')
  els.panel.classList.remove('open')
  els.panel.setAttribute('aria-hidden', 'true')
  document.body.style.overflow = ''
  window.setTimeout(() => {
    els?.backdrop.classList.add('hidden')
    els?.panel.classList.add('hidden')
  }, 300)
}

function close(): void {
  if (!isOpen) return
  closeUI()
  closeModal()
}

function itemRow(i: WishItem): string {
  return `
  <div class="flex gap-3 py-4 border-b border-white/10 last:border-0">
    <div class="w-20 h-20 rounded-2xl bg-zinc-900 shrink-0 overflow-hidden flex items-center justify-center p-1.5">
      <img src="${i.thumbnail}" alt="" loading="lazy" decoding="async" class="max-w-full max-h-full object-contain">
    </div>
    <div class="flex-1 min-w-0 flex flex-col justify-between">
      <div>
        <h4 class="text-[13px] font-semibold leading-snug line-clamp-2 text-white">${i.title}</h4>
        <p class="font-display font-bold text-[16px] mt-1 tracking-tight text-white">$${i.price.toFixed(2)}</p>
      </div>
      <div class="flex items-center gap-2 mt-2">
        <button data-wish-add="${i.id}" class="h-8 px-3 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 text-white text-[11px] font-bold active:scale-95 transition-transform duration-150 flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" d="M12 5v14M5 12h14"/></svg>
          Add to cart
        </button>
        <button data-wish-remove="${i.id}" class="text-[12px] font-bold text-white/40 hover:text-rose-400 transition-colors duration-150">Remove</button>
      </div>
    </div>
  </div>
  `
}

function emptyState(): string {
  return `
  <div class="text-center py-16">
    <div class="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center mb-4">
      <svg class="w-7 h-7 text-rose-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
    </div>
    <p class="font-display font-bold text-lg text-white">Your wishlist is empty</p>
    <p class="text-[13px] text-white/50 mt-1">Tap the heart on any product to save it</p>
  </div>
  `
}
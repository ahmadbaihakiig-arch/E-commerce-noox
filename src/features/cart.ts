import type { CartItem } from '../types'
import { getProduct } from './products'
import { showToast } from './toast'

const STORAGE_KEY = 'nook_cart'
const FREE_SHIP_MIN = 50
const SHIP_COST = 5

let cart: CartItem[] = load()

function load(): CartItem[] {
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  } catch {}
}

function count(): number {
  let n = 0
  for (const i of cart) n += i.qty
  return n
}

function subtotal(): number {
  let n = 0
  for (const i of cart) n += i.price * i.qty
  return n
}

let isOpen = false
let els: {
  backdrop: HTMLElement
  panel: HTMLElement
  items: HTMLElement
  footer: HTMLElement
  count: HTMLElement
  badge: HTMLElement
  subtotal: HTMLElement
  ship: HTMLElement
  total: HTMLElement
  freeLabel: HTMLElement
  freeBar: HTMLElement
} | null = null

export function initCart(): void {
  const backdrop = document.getElementById('cartBackdrop')
  const panel = document.getElementById('cartPanel')
  const items = document.getElementById('cartItems')
  const footer = document.getElementById('cartFooter')
  const countEl = document.getElementById('cartItemCount')
  const badge = document.getElementById('cartBadge')
  const subtotalEl = document.getElementById('cartSubtotal')
  const shipEl = document.getElementById('cartShip')
  const totalEl = document.getElementById('cartTotal')
  const freeLabel = document.getElementById('freeShipLabel')
  const freeBar = document.getElementById('freeShipBar')

  if (!backdrop || !panel || !items || !footer || !countEl || !badge
    || !subtotalEl || !shipEl || !totalEl || !freeLabel || !freeBar) return

  els = {
    backdrop, panel, items, footer,
    count: countEl, badge,
    subtotal: subtotalEl, ship: shipEl, total: totalEl,
    freeLabel, freeBar,
  }

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement

    const addBtn = target.closest<HTMLElement>('[data-add-to-cart]')
    if (addBtn?.dataset.addToCart) {
      e.stopPropagation()
      addToCart(Number(addBtn.dataset.addToCart))
      return
    }

    const qtyBtn = target.closest<HTMLElement>('[data-qty]')
    if (qtyBtn) {
      const id = Number(qtyBtn.dataset.id)
      const delta = Number(qtyBtn.dataset.qty)
      setQty(id, delta)
      return
    }

    const removeBtn = target.closest<HTMLElement>('[data-remove]')
    if (removeBtn) {
      removeItem(Number(removeBtn.dataset.remove))
      return
    }

    if (target.closest('#cartBtn') || target.closest('#detailCartBtn')) {
      open()
      return
    }

    if (target.closest('#cartClose') || target === backdrop) {
      close()
      return
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) close()
  })

  render()
  updateBadge()
}

  document.addEventListener('nook:add-to-cart', (e) => {
    const id = (e as CustomEvent).detail as number
    addToCart(id)
  })

export function addToCart(id: number): void {
  const p = getProduct(id)
  if (!p) return

  const existing = cart.find(i => i.id === id)
  if (existing) {
    existing.qty += 1
  } else {
    cart.push({
      id: p.id,
      title: p.title,
      price: p.price,
      thumbnail: p.thumbnail,
      category: p.category,
      qty: 1,
    })
  }

  save()
  render()
  updateBadge(true)
  pulseCartBtn()
  showToast(`${p.title.length > 32 ? p.title.slice(0, 32) + '…' : p.title} added to cart`)
}

function setQty(id: number, delta: number): void {
  const item = cart.find(i => i.id === id)
  if (!item) return
  item.qty += delta
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id)
  save()
  render()
  updateBadge()
}

function removeItem(id: number): void {
  cart = cart.filter(i => i.id !== id)
  save()
  render()
  updateBadge()
}

function updateBadge(pop = false): void {
  if (!els) return
  const n = count()
  els.badge.textContent = n > 99 ? '99+' : String(n)
  els.badge.classList.toggle('hidden', n === 0)
  if (pop && n > 0) {
    els.badge.classList.remove('badge-pop')
    void els.badge.offsetWidth
    els.badge.classList.add('badge-pop')
  }
}

function pulseCartBtn(): void {
  const btn = document.getElementById('cartBtn')
  if (!btn) return
  btn.classList.remove('cart-pulse')
  void btn.offsetWidth
  btn.classList.add('cart-pulse')
}

function render(): void {
  if (!els) return

  const n = count()
  els.count.textContent = `${n} ${n === 1 ? 'item' : 'items'}`

  if (cart.length === 0) {
    els.items.innerHTML = emptyState()
    els.footer.classList.add('hidden')
    return
  }

  els.items.innerHTML = cart.map(itemRow).join('')
  els.footer.classList.remove('hidden')

  const sub = subtotal()
  const freeShip = sub >= FREE_SHIP_MIN
  const shipCost = freeShip ? 0 : SHIP_COST
  const total = sub + shipCost

  els.subtotal.textContent = `$${sub.toFixed(2)}`
  els.ship.textContent = freeShip ? 'FREE' : `$${SHIP_COST.toFixed(2)}`
  els.ship.className = freeShip ? 'font-bold text-emerald-400' : 'font-semibold text-white/40'
  els.total.textContent = `$${total.toFixed(2)}`

  const pct = Math.min(100, (sub / FREE_SHIP_MIN) * 100)
  els.freeBar.style.width = `${pct}%`
  els.freeLabel.textContent = freeShip
    ? 'You unlocked free shipping'
    : `Add $${(FREE_SHIP_MIN - sub).toFixed(2)} for free shipping`
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
}

function close(): void {
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

function itemRow(i: CartItem): string {
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
      <div class="flex items-center justify-between mt-2">
        <div class="flex items-center bg-white/10 rounded-full">
          <button data-qty="-1" data-id="${i.id}" class="w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-transform duration-150" aria-label="Decrease">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" d="M5 12h14"/></svg>
          </button>
          <span class="text-[13px] font-black w-6 text-center text-white">${i.qty}</span>
          <button data-qty="1" data-id="${i.id}" class="w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-transform duration-150" aria-label="Increase">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
        <button data-remove="${i.id}" class="text-[12px] font-bold text-white/40 hover:text-rose-400 transition-colors duration-150">Remove</button>
      </div>
    </div>
  </div>
  `
}

function emptyState(): string {
  return `
  <div class="text-center py-16">
    <div class="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-orange-500/20 to-rose-500/20 flex items-center justify-center mb-4">
      <svg class="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6a1 1 0 00.9 1.4H19M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"/></svg>
    </div>
    <p class="font-display font-bold text-lg text-white">Your cart is empty</p>
    <p class="text-[13px] text-white/50 mt-1 mb-6">Start browsing to add items</p>
    <button id="cartClose2" class="h-11 px-7 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 text-white text-[13px] font-bold active:scale-95 transition-transform duration-150">Continue shopping</button>
  </div>
  `
}

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement
  if (target.closest('#cartClose2')) close()
})
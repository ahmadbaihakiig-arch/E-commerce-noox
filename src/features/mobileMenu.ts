import { openModal, closeModal } from '../lib/modalHistory'

let isOpen = false
let els: { backdrop: HTMLElement; panel: HTMLElement } | null = null

export function initMobileMenu(): void {
  const backdrop = document.getElementById('menuBackdrop')
  const panel = document.getElementById('menuPanel')

  if (!backdrop || !panel) return
  els = { backdrop, panel }

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement

    if (target.closest('#menuOpen')) {
      open()
      return
    }

    if (target.closest('#menuClose') || target === backdrop) {
      close()
      return
    }

    const cat = target.closest<HTMLElement>('[data-menu-category]')
    if (cat?.dataset.menuCategory) {
      const slug = cat.dataset.menuCategory
      close()
      window.setTimeout(() => {
        document.dispatchEvent(new CustomEvent('nook:set-category', { detail: slug }))
      }, 280)
      return
    }

    if (target.closest('[data-menu-wish]')) {
      close()
      window.setTimeout(() => document.getElementById('wishBtn')?.click(), 280)
      return
    }

    if (target.closest('[data-menu-cart]')) {
      close()
      window.setTimeout(() => document.getElementById('cartBtn')?.click(), 280)
      return
    }

    const link = target.closest<HTMLAnchorElement>('a[href^="#"]')
    if (link && panel.contains(link)) {
      close()
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) close()
  })
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

  openModal('menu', { isOpen: () => isOpen, closeUI })
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
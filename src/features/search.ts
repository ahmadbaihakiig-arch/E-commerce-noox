import { openModal, closeModal } from '../lib/modalHistory'

const DEBOUNCE_MS = 350

let overlay: HTMLElement | null = null
let input: HTMLInputElement | null = null
let clearBtn: HTMLElement | null = null
let desktopInput: HTMLInputElement | null = null
let isOpen = false
let debounceTimer = 0

export function initSearch(): void {
  overlay = document.getElementById('searchOverlay')
  input = document.getElementById('searchInput') as HTMLInputElement | null
  clearBtn = document.getElementById('searchClear')
  desktopInput = document.querySelector<HTMLInputElement>('nav input[type="text"]')

  if (!overlay || !input) return

  const debouncedSearch = (value: string) => {
    window.clearTimeout(debounceTimer)
    debounceTimer = window.setTimeout(() => {
      document.dispatchEvent(new CustomEvent('nook:search', { detail: value.trim() }))
    }, DEBOUNCE_MS)
  }

  input.addEventListener('input', () => {
    const value = input!.value
    clearBtn?.classList.toggle('hidden', value.length === 0)
    debouncedSearch(value)
  })

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      window.clearTimeout(debounceTimer)
      document.dispatchEvent(new CustomEvent('nook:search', { detail: input!.value.trim() }))
      close(true)
    }
  })

  desktopInput?.addEventListener('input', () => {
    const value = desktopInput!.value
    debouncedSearch(value)
  })

  desktopInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      window.clearTimeout(debounceTimer)
      document.dispatchEvent(new CustomEvent('nook:search', { detail: desktopInput!.value.trim() }))
      scrollToProducts()
    }
  })

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement

    if (target.closest('#searchOpen')) {
      open()
      return
    }

    if (target.closest('#searchCancel') || target === overlay) {
      close()
      return
    }

    if (target.closest('#searchClear')) {
      if (input) {
        input.value = ''
        input.focus()
        clearBtn?.classList.add('hidden')
        document.dispatchEvent(new CustomEvent('nook:search', { detail: '' }))
      }
      return
    }

    const trending = target.closest<HTMLElement>('[data-trending]')
    if (trending?.dataset.trending && input) {
      input.value = trending.dataset.trending
      clearBtn?.classList.remove('hidden')
      document.dispatchEvent(new CustomEvent('nook:search', { detail: trending.dataset.trending }))
      close(true)
      return
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) close()
  })
}

function open(): void {
  if (!overlay || isOpen) return
  isOpen = true
  overlay.classList.remove('hidden')
  document.body.style.overflow = 'hidden'

  requestAnimationFrame(() => {
    overlay!.classList.add('open')
    window.setTimeout(() => input?.focus(), 100)
  })

  openModal('search', { isOpen: () => isOpen, closeUI })
}

function closeUI(): void {
  if (!overlay || !isOpen) return
  isOpen = false
  overlay.classList.remove('open')
  document.body.style.overflow = ''
  window.setTimeout(() => overlay?.classList.add('hidden'), 220)
}

function close(andScroll = false): void {
  if (!isOpen) return
  closeUI()
  closeModal()
  if (andScroll) {
    window.setTimeout(scrollToProducts, 260)
  }
}

function scrollToProducts(): void {
  const el = document.getElementById('products')
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 8
  window.scrollTo({ top: y, behavior: 'smooth' })
}
let el: HTMLElement | null = null
let card: HTMLElement | null = null
let text: HTMLElement | null = null
let timer = 0

export function initToast(): void {
  el = document.getElementById('toast')
  card = document.getElementById('toastCard')
  text = document.getElementById('toastText')
}

export function showToast(message: string): void {
  if (!el || !card || !text) return

  text.textContent = message
  el.classList.remove('hidden')

  window.clearTimeout(timer)

  requestAnimationFrame(() => {
    card!.style.transition = 'transform 220ms cubic-bezier(0.32, 0.72, 0, 1), opacity 220ms cubic-bezier(0.32, 0.72, 0, 1)'
    card!.style.transform = 'translate3d(0, 0, 0)'
    card!.style.opacity = '1'
  })

  timer = window.setTimeout(() => {
    if (!card || !el) return
    card.style.transform = 'translate3d(0, 16px, 0)'
    card.style.opacity = '0'
    window.setTimeout(() => {
      el?.classList.add('hidden')
    }, 240)
  }, 2000)
}
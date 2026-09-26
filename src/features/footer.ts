import { showToast } from './toast'

export function initFooter(): void {
  const form = document.getElementById('newsletterForm') as HTMLFormElement | null
  if (!form) return

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = form.querySelector<HTMLInputElement>('input[type="email"]')
    if (!input) return
    showToast('Thanks for subscribing!')
    input.value = ''
  })
}
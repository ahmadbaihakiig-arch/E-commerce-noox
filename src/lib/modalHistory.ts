interface ModalHandler {
  isOpen: () => boolean
  closeUI: () => void
}

let active: { name: string; handler: ModalHandler } | null = null

export function openModal(name: string, handler: ModalHandler): void {
  active = { name, handler }
  history.pushState({ modal: name }, '')
}

export function closeModal(): void {
  if (!active) return
  const name = active.name
  active = null
  if (history.state?.modal === name) {
    history.back()
  }
}

window.addEventListener('popstate', () => {
  if (!active) return
  const { handler } = active
  active = null
  if (handler.isOpen()) {
    handler.closeUI()
  }
})
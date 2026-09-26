export function enableDragScroll(el: HTMLElement): () => void {
  let isDown = false
  let startX = 0
  let startScroll = 0

  const onDown = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return
    isDown = true
    startX = e.clientX
    startScroll = el.scrollLeft
    el.style.cursor = 'grabbing'
    el.style.userSelect = 'none'
  }

  const onMove = (e: PointerEvent) => {
    if (!isDown) return
    const dx = e.clientX - startX
    
    el.scrollLeft = startScroll - dx
  }

  const onUp = () => {
    if (!isDown) return
    isDown = false
    el.style.cursor = ''
    el.style.userSelect = ''
  }

  el.style.cursor = 'grab'

  el.addEventListener('pointerdown', onDown)
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp)
  window.addEventListener('pointercancel', onUp)

  return () => {
    el.removeEventListener('pointerdown', onDown)
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerup', onUp)
    window.removeEventListener('pointercancel', onUp)
  }
}
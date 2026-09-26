export function detailPanel(): string {
  return `
  <div id="detailBackdrop" class="hidden fixed inset-0 z-40 bg-black/70 opacity-0"></div>
  <aside id="detailPanel" class="fixed inset-0 md:inset-y-0 md:left-auto md:right-0 md:w-[520px] z-50" aria-hidden="true">
    <div class="h-full bg-zinc-950 md:rounded-l-3xl overflow-hidden flex flex-col shadow-2xl shadow-black/60">
      <header class="flex items-center justify-between px-4 lg:px-6 h-14 border-b border-white/10 shrink-0">
        <button id="detailClose" class="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-90 transition-transform duration-150 text-white" aria-label="Close">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
        <p class="text-[13px] font-bold text-white">Product details</p>
        <div class="w-10 h-10"></div>
      </header>
      <div id="detailContent" class="flex-1 overflow-y-auto overscroll-contain"></div>
      <footer id="detailFooter" class="border-t border-white/10 px-4 lg:px-6 py-3 shrink-0 bg-zinc-950"></footer>
    </div>
  </aside>
  `
}
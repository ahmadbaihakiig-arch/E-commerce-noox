export function wishlistSheet(): string {
  return `
  <div id="wishBackdrop" class="hidden fixed inset-0 z-40 bg-black/70 opacity-0"></div>
  <aside id="wishPanel" class="fixed bottom-0 inset-x-0 z-50 md:inset-y-0 md:left-auto md:right-0 md:w-[460px]" aria-hidden="true">
    <div class="h-full max-h-[88dvh] md:max-h-none bg-zinc-950 rounded-t-3xl md:rounded-t-none md:rounded-l-3xl flex flex-col shadow-2xl shadow-black/60 border-t md:border-t-0 md:border-l border-white/10">

      <div class="pt-3 pb-1 flex justify-center md:hidden shrink-0">
        <div class="w-10 h-1.5 rounded-full bg-white/20"></div>
      </div>

      <header class="px-5 lg:px-6 pt-3 lg:pt-6 pb-3 flex items-center justify-between shrink-0">
        <div>
          <h3 class="font-display font-bold text-xl tracking-tightest text-white">Wishlist</h3>
          <p id="wishCount" class="text-[12px] text-white/50 mt-0.5">0 items</p>
        </div>
        <button id="wishClose" class="w-10 h-10 -mr-2 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-90 transition-transform duration-150 text-white" aria-label="Close">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </header>

      <div id="wishItems" class="flex-1 overflow-y-auto overscroll-contain px-5 lg:px-6"></div>
    </div>
  </aside>
  `
}
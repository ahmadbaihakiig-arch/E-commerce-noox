export function cartSheet(): string {
  return `
  <div id="cartBackdrop" class="hidden fixed inset-0 z-40 bg-black/70 opacity-0"></div>
  <aside id="cartPanel" class="fixed bottom-0 inset-x-0 z-50 md:inset-y-0 md:left-auto md:right-0 md:w-[460px]" aria-hidden="true">
    <div class="h-full max-h-[88dvh] md:max-h-none bg-zinc-950 rounded-t-3xl md:rounded-t-none md:rounded-l-3xl flex flex-col shadow-2xl shadow-black/60 border-t md:border-t-0 md:border-l border-white/10">

      <div class="pt-3 pb-1 flex justify-center md:hidden shrink-0">
        <div class="w-10 h-1.5 rounded-full bg-white/20"></div>
      </div>

      <header class="px-5 lg:px-6 pt-3 lg:pt-6 pb-3 flex items-center justify-between shrink-0">
        <div>
          <h3 class="font-display font-bold text-xl tracking-tightest text-white">Cart</h3>
          <p id="cartItemCount" class="text-[12px] text-white/50 mt-0.5">0 items</p>
        </div>
        <button id="cartClose" class="w-10 h-10 -mr-2 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-90 transition-transform duration-150 text-white" aria-label="Close">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </header>

      <div id="cartItems" class="flex-1 overflow-y-auto overscroll-contain px-5 lg:px-6"></div>

      <footer id="cartFooter" class="hidden border-t border-white/10 px-5 lg:px-6 pt-4 pb-4 shrink-0 bg-zinc-950">
        <div class="mb-4 p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20">
          <div class="flex items-center justify-between text-[12px] font-semibold mb-2">
            <span id="freeShipLabel" class="text-orange-300"></span>
          </div>
          <div class="h-2 rounded-full bg-white/10 overflow-hidden">
            <div id="freeShipBar" class="h-full w-0 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full transition-[width] duration-300"></div>
          </div>
        </div>

        <div class="space-y-2 text-[13px]">
          <div class="flex items-center justify-between text-white/50">
            <span>Subtotal</span>
            <span id="cartSubtotal" class="font-semibold text-white">$0.00</span>
          </div>
          <div class="flex items-center justify-between text-white/50">
            <span>Shipping</span>
            <span id="cartShip" class="font-semibold">$5.00</span>
          </div>
          <div class="h-px bg-white/10 my-1"></div>
          <div class="flex items-center justify-between">
            <span class="font-bold text-white">Total</span>
            <span id="cartTotal" class="font-display font-bold text-xl tracking-tightest text-white">$0.00</span>
          </div>
        </div>

        <button class="mt-4 w-full h-12 rounded-2xl bg-gradient-to-br from-orange-500 via-rose-500 to-orange-500 text-white font-bold text-[14px] active:scale-[0.98] transition-transform duration-150 shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2">
          <span>Checkout</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12l-7.5 7.5M21 12H3"/></svg>
        </button>
      </footer>
    </div>
  </aside>
  `
}
export function toast(): string {
  return `
  <div id="toast" class="fixed left-1/2 bottom-6 z-[60] hidden pointer-events-none px-4 w-full max-w-sm" style="transform:translate3d(-50%,0,0)">
    <div id="toastCard" class="bg-white text-zinc-900 text-[13px] font-semibold pl-3 pr-5 py-3 rounded-2xl shadow-2xl shadow-black/40 flex items-center gap-3 opacity-0" style="transform:translate3d(0,16px,0)">
      <div class="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0">
        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
      </div>
      <span id="toastText" class="truncate">Added to cart</span>
    </div>
  </div>
  `
}
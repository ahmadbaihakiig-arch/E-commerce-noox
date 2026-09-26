export function searchOverlay(): string {
  return `
  <div id="searchOverlay" class="hidden fixed inset-0 z-[55] bg-zinc-950 opacity-0">
    <div class="max-w-2xl mx-auto px-4 pt-4 safe-top">
      <div class="flex items-center gap-3">
        <div class="relative flex-1">
          <svg class="w-4 h-4 text-orange-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path stroke-linecap="round" d="M20 20l-3.5-3.5"/></svg>
          <input id="searchInput" type="text" placeholder="Search products..." autocomplete="off" class="w-full h-12 pl-11 pr-11 rounded-2xl bg-white/5 border border-white/15 text-[15px] text-white placeholder:text-white/40 outline-none focus:border-orange-400/60 transition-colors">
          <button id="searchClear" class="hidden absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors" aria-label="Clear">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </div>
        <button id="searchCancel" class="text-[13px] font-bold text-white/60 hover:text-white transition-colors px-2 shrink-0">Cancel</button>
      </div>

      <div class="mt-6">
        <p class="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-3">Trending</p>
        <div class="flex flex-wrap gap-2">
          ${trendingChip('phone')}
          ${trendingChip('laptop')}
          ${trendingChip('fragrance')}
          ${trendingChip('watch')}
          ${trendingChip('shirt')}
          ${trendingChip('shoes')}
        </div>
      </div>
    </div>
  </div>
  `
}

function trendingChip(query: string): string {
  const label = query.charAt(0).toUpperCase() + query.slice(1)
  return `<button data-trending="${query}" class="h-9 px-4 rounded-full bg-white/5 border border-white/15 text-[13px] font-semibold text-white/80 hover:bg-white/10 hover:text-white active:scale-95 transition-colors">${label}</button>`
}
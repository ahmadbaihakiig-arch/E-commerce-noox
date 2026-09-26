export function mobileMenu(): string {
  return `
  <div id="menuBackdrop" class="hidden fixed inset-0 z-[55] bg-black/70 opacity-0"></div>
  <aside id="menuPanel" class="fixed inset-y-0 left-0 z-[56] w-[300px] max-w-[85vw]" aria-hidden="true">
    <div class="h-full bg-zinc-950 border-r border-white/10 flex flex-col shadow-2xl shadow-black/60 safe-top">

      <header class="flex items-center justify-between px-5 h-16 shrink-0">
        <a href="#" class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 via-rose-400 to-amber-300 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8l8-4 8 4v8l-8 4-8-4V8z"/></svg>
          </div>
          <span class="font-display font-bold text-xl tracking-tightest text-white">Nook</span>
        </a>
        <button id="menuClose" class="w-10 h-10 rounded-full flex items-center justify-center active:bg-white/10 transition-colors text-white" aria-label="Close menu">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </header>

      <div class="px-4 pb-2 shrink-0">
        <div class="relative">
          <svg class="w-4 h-4 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path stroke-linecap="round" d="M20 20l-3.5-3.5"/></svg>
          <input id="menuSearch" type="text" placeholder="Search..." class="w-full h-10 pl-11 pr-4 rounded-full bg-white/5 border border-white/10 text-[13px] text-white placeholder:text-white/40 outline-none focus:border-orange-400/60 transition-colors">
        </div>
      </div>

      <nav class="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
        <p class="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 px-3 mb-2">Browse</p>
        <ul class="space-y-1">
          ${menuLink('New arrivals', '#products')}
          ${menuLink('Men', '#products')}
          ${menuLink('Women', '#products')}
          ${menuLink('Sale', '#products', true)}
          ${menuLink('Journal', '#products')}
        </ul>

        <div class="h-px bg-white/10 my-5"></div>

        <p class="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 px-3 mb-2">Categories</p>
        <ul class="space-y-1">
          ${menuLink('Smartphones', '#products', false, 'smartphones')}
          ${menuLink('Laptops', '#products', false, 'laptops')}
          ${menuLink('Fragrances', '#products', false, 'fragrances')}
          ${menuLink('Skincare', '#products', false, 'skin-care')}
          ${menuLink('Groceries', '#products', false, 'groceries')}
          ${menuLink('Decor', '#products', false, 'home-decoration')}
        </ul>

        <div class="h-px bg-white/10 my-5"></div>

        <p class="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 px-3 mb-2">Account</p>
        <ul class="space-y-1">
          <li><button data-menu-wish class="w-full text-left flex items-center gap-3 h-11 px-3 rounded-xl text-[14px] font-semibold text-white/80 hover:text-white hover:bg-white/5 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
            Wishlist
          </button></li>
          <li><button data-menu-cart class="w-full text-left flex items-center gap-3 h-11 px-3 rounded-xl text-[14px] font-semibold text-white/80 hover:text-white hover:bg-white/5 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6a1 1 0 00.9 1.4H19M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"/></svg>
            Cart
          </button></li>
          <li><button data-menu-account class="w-full text-left flex items-center gap-3 h-11 px-3 rounded-xl text-[14px] font-semibold text-white/80 hover:text-white hover:bg-white/5 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path stroke-linecap="round" d="M4.5 20a7.5 7.5 0 0115 0"/></svg>
            Account
          </button></li>
        </ul>
      </nav>

      <footer class="px-5 py-4 border-t border-white/10 safe-bottom shrink-0">
        <p class="text-[11px] text-white/40">&copy; 2025 Nook</p>
      </footer>
    </div>
  </aside>
  `
}

function menuLink(label: string, href: string, accent = false, category?: string): string {
  const color = accent ? 'text-rose-300 hover:text-rose-200' : 'text-white/85 hover:text-white'
  const attr = category ? ` data-menu-category="${category}"` : ''
  return `<li>
    <a href="${href}"${attr} class="flex items-center justify-between h-11 px-3 rounded-xl text-[15px] font-semibold ${color} hover:bg-white/5 transition-colors">
      <span>${label}</span>
      <svg class="w-3.5 h-3.5 opacity-40" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
    </a>
  </li>`
}
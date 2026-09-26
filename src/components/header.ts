export const header = (): string => `
<header id="hero" class="relative min-h-[100svh] w-full overflow-hidden isolate">
  <div class="absolute inset-0 -z-10">
    <picture>
      <source media="(min-width: 768px)" srcset="/images/hero-desktop.webp">
      <img id="heroImg" src="/images/hero-mobile.webp" alt="" class="w-full h-full object-cover object-center" fetchpriority="high" decoding="async">
    </picture>
  </div>

  <div class="absolute inset-0 -z-10 bg-gradient-to-b from-black/85 via-black/50 to-zinc-950"></div>
  <div class="absolute inset-0 -z-10 bg-gradient-to-br from-orange-950/40 via-transparent to-rose-950/25"></div>

  <div id="navSentinel" class="absolute top-0 inset-x-0 h-16 pointer-events-none" aria-hidden="true"></div>

  <nav id="nav" class="fixed top-0 inset-x-0 z-40 nav-init border-b border-transparent">
    <div class="max-w-7xl mx-auto px-4 lg:px-8">
      <div class="h-16 flex items-center gap-4">
        <button id="menuOpen" class="lg:hidden w-10 h-10 -ml-2 rounded-full flex items-center justify-center active:bg-white/10 transition-colors text-white" aria-label="Menu">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>

        <a href="#" class="flex items-center gap-2.5 shrink-0 group">
          <div class="relative w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 via-rose-400 to-amber-300 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8l8-4 8 4v8l-8 4-8-4V8z"/></svg>
          </div>
          <span class="font-display font-bold text-xl tracking-tightest text-white">Nook</span>
        </a>

        <div class="hidden lg:flex items-center gap-1 ml-8">
          <a href="#products" class="relative h-9 px-4 rounded-full text-[13px] font-semibold text-white flex items-center">New</a>
          <a href="#products" class="h-9 px-4 rounded-full text-[13px] font-medium text-white/70 hover:text-white transition-colors flex items-center">Men</a>
          <a href="#products" class="h-9 px-4 rounded-full text-[13px] font-medium text-white/70 hover:text-white transition-colors flex items-center">Women</a>
          <a href="#products" class="h-9 px-4 rounded-full text-[13px] font-medium text-rose-300 hover:text-rose-200 transition-colors flex items-center">Sale</a>
          <a href="#products" class="h-9 px-4 rounded-full text-[13px] font-medium text-white/70 hover:text-white transition-colors flex items-center">Journal</a>
        </div>

        <div class="hidden lg:block flex-1 max-w-sm ml-auto">
          <div class="relative group">
            <svg class="w-4 h-4 text-white/50 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-orange-300 transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path stroke-linecap="round" d="M20 20l-3.5-3.5"/></svg>
            <input type="text" placeholder="Search..." class="w-full h-10 pl-11 pr-4 rounded-full bg-white/10 border border-white/15 text-[13px] text-white placeholder:text-white/40 outline-none focus:border-orange-400/60 focus:bg-white/15 transition-colors">
          </div>
        </div>

        <div class="flex items-center gap-1 ml-auto lg:ml-0">
          <button id="searchOpen" class="lg:hidden w-10 h-10 rounded-full flex items-center justify-center active:bg-white/10 transition-colors text-white" aria-label="Search">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path stroke-linecap="round" d="M20 20l-3.5-3.5"/></svg>
          </button>

          <button id="wishBtn" class="relative flex w-10 h-10 rounded-full items-center justify-center active:bg-white/10 lg:hover:bg-white/10 transition-colors text-white" aria-label="Wishlist">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
            <span id="wishlistBadge" class="hidden absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md">0</span>
          </button>

          <button id="cartBtn" class="relative w-10 h-10 rounded-full flex items-center justify-center active:bg-white/10 transition-colors text-white" aria-label="Cart">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6a1 1 0 00.9 1.4H19M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"/></svg>
            <span id="cartBadge" class="hidden absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md">0</span>
          </button>

          <button class="hidden lg:flex w-10 h-10 rounded-full items-center justify-center hover:bg-white/10 transition-colors text-white" aria-label="Account">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path stroke-linecap="round" d="M4.5 20a7.5 7.5 0 0115 0"/></svg>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <div class="relative z-20 max-w-7xl mx-auto px-4 lg:px-8 pt-20 lg:pt-24 pb-6 lg:pb-8 min-h-[100svh] flex flex-col">
    <div class="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">

      <div class="lg:col-span-7 max-w-3xl">
        <div class="reveal d1 inline-flex items-center gap-2.5 h-8 pl-2 pr-3.5 rounded-full bg-black/40 border border-white/20 mb-5 lg:mb-7">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span class="text-[11px] lg:text-[12px] font-semibold text-white/90">Summer/Spring collection just dropped</span>
        </div>

        <h1 class="reveal d2 font-display font-bold tracking-tightest text-[clamp(2.25rem,7.5vw,4.75rem)] leading-[1.02]">
          <span class="block">Built to last.</span>
          <span class="block text-grad">Beyond trends.</span>
        </h1>

        <p class="reveal d3 mt-5 lg:mt-6 text-[14px] lg:text-base text-white/75 max-w-lg leading-relaxed text-pretty">
          Curated from brands that build things to last, not just look good on camera. Shipped from Jakarta, delivered worldwide.
        </p>

        <div class="reveal d4 mt-7 lg:mt-8 flex flex-wrap items-center gap-3">
        <a href="#products" class="group relative h-12 lg:h-13 px-6 lg:px-7 rounded-full bg-white text-black text-[13px] lg:text-[14px] font-bold active:scale-[0.97] transition-transform shadow-2xl shadow-black/40 hover:shadow-xl hover:shadow-white/20 flex items-center gap-2.5 overflow-hidden">
          <span class="relative z-10 flex items-center gap-2.5">
            Shop now
            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12l-7.5 7.5M21 12H3"/></svg>
          </span>
          <span class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent"></span>
        </a>
        <a href="#products" class="group h-12 lg:h-13 px-5 lg:px-6 rounded-full bg-black/40 border border-white/20 text-white text-[13px] lg:text-[14px] font-bold active:scale-[0.97] transition-colors hover:bg-black/60 flex items-center gap-2.5">
          <span class="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h10"/></svg>
          </span>
          Browse all
        </a>
      </div>

        <div class="reveal d4 mt-7 lg:mt-9 flex flex-wrap items-center gap-x-5 gap-y-4 text-[12px]">
          <div class="flex items-center gap-2.5">
            <div class="flex -space-x-2.5">
              <img class="w-8 h-8 rounded-full border-2 border-white/40 ring-1 ring-black/20" src="https://i.pravatar.cc/40?img=1" alt="" loading="lazy" decoding="async">
              <img class="w-8 h-8 rounded-full border-2 border-white/40 ring-1 ring-black/20" src="https://i.pravatar.cc/40?img=5" alt="" loading="lazy" decoding="async">
              <img class="w-8 h-8 rounded-full border-2 border-white/40 ring-1 ring-black/20" src="https://i.pravatar.cc/40?img=9" alt="" loading="lazy" decoding="async">
              <div class="w-8 h-8 rounded-full border-2 border-white/40 ring-1 ring-black/20 bg-black/50 flex items-center justify-center text-[9px] font-black">+9k</div>
            </div>
            <span class="font-semibold text-white/85">12.4k happy</span>
          </div>
          <div class="hidden sm:block w-px h-4 bg-white/15"></div>
          <div class="flex items-center gap-1.5 text-white/70">
            <div class="flex items-center gap-0.5 text-amber-400">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.29a1 1 0 00.95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 00-.36 1.12l1.07 3.29c.3.92-.76 1.69-1.54 1.12l-2.8-2.03a1 1 0 00-1.18 0l-2.8 2.03c-.78.57-1.84-.2-1.54-1.12l1.07-3.29a1 1 0 00-.36-1.12L.95 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 00.95-.69L9.05 2.93z"/></svg>
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.29a1 1 0 00.95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 00-.36 1.12l1.07 3.29c.3.92-.76 1.69-1.54 1.12l-2.8-2.03a1 1 0 00-1.18 0l-2.8 2.03c-.78.57-1.84-.2-1.54-1.12l1.07-3.29a1 1 0 00-.36-1.12L.95 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 00.95-.69L9.05 2.93z"/></svg>
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.29a1 1 0 00.95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 00-.36 1.12l1.07 3.29c.3.92-.76 1.69-1.54 1.12l-2.8-2.03a1 1 0 00-1.18 0l-2.8 2.03c-.78.57-1.84-.2-1.54-1.12l1.07-3.29a1 1 0 00-.36-1.12L.95 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 00.95-.69L9.05 2.93z"/></svg>
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.29a1 1 0 00.95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 00-.36 1.12l1.07 3.29c.3.92-.76 1.69-1.54 1.12l-2.8-2.03a1 1 0 00-1.18 0l-2.8 2.03c-.78.57-1.84-.2-1.54-1.12l1.07-3.29a1 1 0 00-.36-1.12L.95 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 00.95-.69L9.05 2.93z"/></svg>
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.29a1 1 0 00.95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 00-.36 1.12l1.07 3.29c.3.92-.76 1.69-1.54 1.12l-2.8-2.03a1 1 0 00-1.18 0l-2.8 2.03c-.78.57-1.84-.2-1.54-1.12l1.07-3.29a1 1 0 00-.36-1.12L.95 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 00.95-.69L9.05 2.93z"/></svg>
            </div>
            <span class="font-semibold">4.9 · 2,847 reviews</span>
          </div>
        </div>
      </div>

      <div class="hidden lg:flex lg:col-span-5 justify-end pt-2 reveal d3">
       <button type="button" data-product-id="119" class="group w-[340px] text-left bg-zinc-950/80 border border-white/15 rounded-3xl p-3 hover:border-orange-400/40 hover:bg-zinc-950/95 transition-colors duration-300 shadow-2xl shadow-black/40 cursor-pointer">
          <div class="relative aspect-square rounded-2xl overflow-hidden bg-zinc-900">
            <img src="https://cdn.dummyjson.com/product-images/skin-care/olay-ultra-moisture-shea-butter-body-wash/thumbnail.webp" alt="" class="w-full h-full object-cover" loading="eager" decoding="async">
            <div class="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/30 to-transparent pointer-events-none"></div>
            <span class="absolute top-3 left-3 h-6 px-2.5 rounded-full bg-white text-zinc-900 text-[10px] font-black tracking-wider flex items-center shadow-lg">
              FEATURED TODAY
            </span>
            <span class="absolute bottom-3 left-3 h-6 px-2.5 rounded-full bg-emerald-500 text-white text-[10px] font-black tracking-wider flex items-center shadow-lg">
              BEST SELLER
            </span>
          </div>

          <div class="pt-4 pb-1.5 px-1.5">
            <p class="text-[10px] font-black uppercase tracking-[0.15em] text-orange-300">Olay</p>
            <h3 class="text-[15px] font-bold text-white mt-1.5 leading-snug">Ultra Moisture Shea Butter Body Wash</h3>
            <div class="flex items-end justify-between mt-4">
              <div>
                <p class="text-[10px] text-white/40 mb-0.5">From</p>
                <div class="flex items-baseline gap-1.5">
                  <p class="font-display font-bold text-2xl text-white tracking-tight">$12.99</p>
                  <p class="text-[11px] text-white/30 line-through">$15.54</p>
                </div>
              </div>
              <div class="w-11 h-11 rounded-full bg-white text-zinc-900 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12l-7.5 7.5M21 12H3"/></svg>
              </div>
            </div>
          </div>
        </a>
      </div>

    </div>

    <div class="flex justify-center pb-2 mt-auto">
      <div class="hidden lg:flex flex-col items-center gap-2 scroll-hint">
        <span class="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 vertical-text">Scroll</span>
        <svg class="w-4 h-4 text-white/50" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
      </div>
    </div>
  </div>

  <div class="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none"></div>
</header>
`
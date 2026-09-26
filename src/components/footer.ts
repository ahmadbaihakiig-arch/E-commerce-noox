export const footer = (): string => `
<footer class="relative overflow-hidden text-white bg-zinc-950 safe-bottom isolate">
  <div class="absolute inset-0 -z-10">
    <picture>
      <source media="(min-width: 768px)" srcset="/images/hero-desktop.webp">
      <img src="/images/hero-mobile.webp" alt="" class="w-full h-full object-cover object-center opacity-70" decoding="async">
    </picture>
  </div>
  <div class="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/70 to-zinc-950/80"></div>
  <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

  <div class="relative max-w-7xl mx-auto px-4 lg:px-8 pt-16 lg:pt-24 pb-8">
    <div class="grid lg:grid-cols-12 gap-10 lg:gap-16 pb-14 lg:pb-20 border-b border-white/10">
      <div class="lg:col-span-7">
<h2 class="text-4xl sm:text-5xl lg:text-7xl font-display font-bold tracking-tightest leading-[0.98]">
          Good goods,<br>
          <span class="text-white/45">honest prices.</span>
        </h2>

        <p class="mt-6 text-[15px] lg:text-base text-white/70 max-w-md leading-relaxed">
          Curated from brands that build things to last, not just look good on camera. Shipped from Jakarta, delivered worldwide.
        </p>

        <div class="mt-7 flex items-center gap-5 text-[12px] text-white/70">
          <div class="flex items-center gap-2">
            <div class="flex -space-x-2">
              <img class="w-7 h-7 rounded-full border-2 border-black/40" src="https://i.pravatar.cc/40?img=1" alt="" loading="lazy" decoding="async">
              <img class="w-7 h-7 rounded-full border-2 border-black/40" src="https://i.pravatar.cc/40?img=5" alt="" loading="lazy" decoding="async">
              <img class="w-7 h-7 rounded-full border-2 border-black/40" src="https://i.pravatar.cc/40?img=9" alt="" loading="lazy" decoding="async">
              <div class="w-7 h-7 rounded-full border-2 border-black/40 bg-white/20 flex items-center justify-center text-[9px] font-black">+9k</div>
            </div>
            <span class="font-semibold hidden sm:inline">happy customers</span>
          </div>
          <span class="hidden sm:block w-px h-4 bg-white/15"></span>
          <div class="hidden sm:flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-ring"></span>
            <span class="font-semibold">Live: 47 people shopping</span>
          </div>
        </div>
      </div>

      <div class="lg:col-span-5 lg:pl-8 lg:border-l lg:border-white/10">
        <p class="text-[11px] font-black uppercase tracking-[0.2em] text-white/50">Newsletter</p>
        <h3 class="mt-3 text-2xl lg:text-3xl font-display font-bold tracking-tightest leading-tight">
          Get 10% off<br>your first order.
        </h3>
        <p class="mt-3 text-[13px] text-white/60">New drops, no spam, unsubscribe anytime.</p>

        <form id="newsletterForm" class="mt-6 space-y-3">
          <div class="relative">
            <svg class="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <input type="email" required placeholder="you@email.com" class="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/10 border border-white/20 text-[14px] text-white placeholder:text-white/40 outline-none focus:border-orange-400 focus:bg-white/15 transition-colors">
          </div>
          <button type="submit" class="relative w-full h-12 rounded-2xl bg-gradient-to-br from-orange-500 via-rose-500 to-orange-500 text-white text-[14px] font-bold active:scale-[0.98] transition-transform duration-150 shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2">
            <span class="flex items-center gap-2">
              Subscribe
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12l-7.5 7.5M21 12H3"/></svg>
            </span>
          </button>
          <p class="text-[11px] text-white/40 text-center">
            By subscribing, you agree to our <a href="#" class="underline hover:text-white/70 transition-colors">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 py-12 lg:py-16 border-b border-white/10">
      <div class="col-span-2 lg:col-span-4">
        <div class="flex items-center gap-2.5">
          <div class="relative w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 via-rose-400 to-amber-300 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8l8-4 8 4v8l-8 4-8-4V8z"/></svg>
          </div>
          <span class="font-display font-bold text-2xl tracking-tightest">Nook</span>
        </div>
        <p class="text-[13px] text-white/60 mt-5 max-w-xs leading-relaxed">
          A curated shop for people who hate browsing. Everything is already picked, just check out.
        </p>

        <div class="flex items-center gap-2 mt-6">
          <a href="#" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-colors duration-150" aria-label="Twitter">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 5.9c-.7.3-1.5.5-2.4.6.9-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 00-7 3.7A11.6 11.6 0 013 4.8a4.1 4.1 0 001.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4-.6.2-1.2.2-1.9.1.5 1.6 2 2.8 3.8 2.9A8.2 8.2 0 012 18.6a11.6 11.6 0 006.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.2z"/></svg>
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-colors duration-150" aria-label="Instagram">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm6.4-8.4a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"/></svg>
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-colors duration-150" aria-label="TikTok">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.6 6.7a5.4 5.4 0 01-3.2-3.4V3h-3.3v13.1a2.8 2.8 0 11-2-2.7V10a6.1 6.1 0 106.1 6.1V9.3a8.6 8.6 0 004.9 1.5V7.5a5.3 5.3 0 01-2.5-.8z"/></svg>
          </a>
        </div>
      </div>

      <div class="lg:col-span-2">
        <p class="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">Shop</p>
        <ul class="space-y-3 text-[13px]">
          <li><a href="#products" class="text-white/70 hover:text-white transition-colors duration-150">All Products</a></li>
          <li><a href="#products" class="text-white/70 hover:text-white transition-colors duration-150">New Arrivals</a></li>
          <li><a href="#products" class="text-white/70 hover:text-white transition-colors duration-150">Sale</a></li>
          <li><a href="#products" class="text-white/70 hover:text-white transition-colors duration-150">Gift Card</a></li>
        </ul>
      </div>

      <div class="lg:col-span-2">
        <p class="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">Support</p>
        <ul class="space-y-3 text-[13px]">
          <li><a href="#" class="text-white/70 hover:text-white transition-colors duration-150">Shipping</a></li>
          <li><a href="#" class="text-white/70 hover:text-white transition-colors duration-150">Returns &amp; Refunds</a></li>
          <li><a href="#" class="text-white/70 hover:text-white transition-colors duration-150">Track Order</a></li>
          <li><a href="#" class="text-white/70 hover:text-white transition-colors duration-150">Contact</a></li>
        </ul>
      </div>

      <div class="lg:col-span-2">
        <p class="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">Company</p>
        <ul class="space-y-3 text-[13px]">
          <li><a href="#" class="text-white/70 hover:text-white transition-colors duration-150">About Us</a></li>
          <li><a href="#" class="text-white/70 hover:text-white transition-colors duration-150">Careers</a></li>
          <li><a href="#" class="text-white/70 hover:text-white transition-colors duration-150">Press Kit</a></li>
          <li><a href="#" class="text-white/70 hover:text-white transition-colors duration-150">Sustainability</a></li>
        </ul>
      </div>

      <div class="lg:col-span-2">
        <p class="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">Contact</p>
        <ul class="space-y-3 text-[13px]">
          <li class="text-white/70">
            <p class="font-semibold text-white/90">Email</p>
            <a href="mailto:hi@nook.id" class="hover:text-white transition-colors duration-150">hi@nook.id</a>
          </li>
          <li class="text-white/70">
            <p class="font-semibold text-white/90">WhatsApp</p>
            <a href="#" class="hover:text-white transition-colors duration-150">+62 812-3456-7890</a>
          </li>
          <li class="text-white/70">
            <p class="font-semibold text-white/90">Address</p>
            <p class="leading-relaxed">Jl. Kemang Raya No. 21<br>Jakarta Selatan, Indonesia</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="pt-8 flex flex-col lg:flex-row items-center justify-between gap-5">
      <p class="text-[12px] text-white/40 text-center lg:text-left">
        &copy; 2025 Nook. Made with <span class="text-rose-400">&hearts;</span> in Jakarta.
      </p>

      <div class="flex items-center gap-2">
        <span class="text-[10px] font-bold uppercase tracking-widest text-white/30 mr-1">Pay with</span>
        <div class="flex items-center gap-1.5">
          <span class="h-7 px-2.5 rounded-md bg-white/10 border border-white/10 flex items-center text-[10px] font-black tracking-wider">VISA</span>
          <span class="h-7 px-2.5 rounded-md bg-white/10 border border-white/10 flex items-center text-[10px] font-black tracking-wider">MC</span>
          <span class="h-7 px-2.5 rounded-md bg-white/10 border border-white/10 flex items-center text-[10px] font-black tracking-wider">GOPAY</span>
          <span class="h-7 px-2.5 rounded-md bg-white/10 border border-white/10 flex items-center text-[10px] font-black tracking-wider">OVO</span>
          <span class="h-7 px-2.5 rounded-md bg-white/10 border border-white/10 flex items-center text-[10px] font-black tracking-wider">BCA</span>
        </div>
      </div>

      <div class="flex items-center gap-5 text-[12px]">
        <a href="#" class="text-white/40 hover:text-white transition-colors duration-150">Privacy</a>
        <a href="#" class="text-white/40 hover:text-white transition-colors duration-150">Terms</a>
        <a href="#" class="text-white/40 hover:text-white transition-colors duration-150">Cookies</a>
      </div>
    </div>
  </div>
</footer>
`
import './style.css'
import { header } from './components/header'
import { footer } from './components/footer'
import { productsSection } from './components/products'
import { detailPanel } from './components/detail'
import { cartSheet } from './components/cart'
import { wishlistSheet } from './components/wishlist'
import { mobileMenu } from './components/mobileMenu'
import { searchOverlay } from './components/search'
import { toast } from './components/toast'
import { initProducts } from './features/products'
import { initDetail } from './features/detail'
import { initCart } from './features/cart'
import { initWishlist } from './features/wishlist'
import { initMobileMenu } from './features/mobileMenu'
import { initSearch } from './features/search'
import { initFooter } from './features/footer'
import { initToast } from './features/toast'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Root element #app not found')

app.innerHTML = `
  ${header()}
  ${productsSection()}
  ${footer()}
  ${detailPanel()}
  ${cartSheet()}
  ${wishlistSheet()}
  ${mobileMenu()}
  ${searchOverlay()}
  ${toast()}
`

initToast()
initProducts()
initDetail()
initCart()
initWishlist()
initMobileMenu()
initSearch()
initFooter()
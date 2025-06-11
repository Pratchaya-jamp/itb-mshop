// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../components/InterfaceUI/LandingPage.vue'
import SaleItemsPage from '../components/Containers/SaleItemsPage.vue'
import SaleItemsDetailPage from '@/components/Containers/SaleItemsDetailPage.vue'
import PageNotFound from '@/components/InterfaceUI/Page404.vue'
import ListingPage from '../components/Containers/ListBrandPage.vue'
import SaleItemsAdd from '@/components/Containers/SaleItemsAdd.vue'
import BrandAdd from '@/components/Containers/BrandAdd.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LandingPage,
  },
  {
    path: '/:notMatch(.*)',
    name: 'PageNotFound',
    component: PageNotFound
  },
  {
    path: '/sale-items',
    name: 'SaleItems',
    component: SaleItemsPage,
  },
  {
    path: '/sale-items/list',
    name: 'ListSaleItems',
    component: SaleItemsPage,
  },
  {
    path: '/sale-items/:id',
    name: 'SaleItemsdetail',
    component: SaleItemsDetailPage,
  },
  {
    path: '/brands',
    name: 'ListingPage',
    component: ListingPage
  },
  {
    path: '/sale-items/add',
    name: 'SaleItemsAdd',
    component: SaleItemsAdd,
  },
  {
  path: '/sale-items/:id/edit',
  name: 'SaleItemsEdit',
  component: SaleItemsAdd,
},
{
  path: '/brands/add',
  name: 'BrandAdd',
  component: BrandAdd,
},
{
  path: '/brands/:id/edit',
  name: 'BrandEdit',
  component: BrandAdd,
}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

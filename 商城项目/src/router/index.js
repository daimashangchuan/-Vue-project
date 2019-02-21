import Vue from 'vue'
import Router from 'vue-router'

import GoodsList from '@/viems/GoodsList.vue'
import Cart from '@/viems/Cart'
import Address from '@/viems/Address'
import OrderConfirm from '@/viems/OrderConfirm'
import OrderSuccess from '@/viems/OrderSuccess'

Vue.use(Router)

export default new Router({
	routes:[
		{
			path: "/",
			name:'GoodsList',
			component:GoodsList
		},
		{
			path: "/cart",
			name:'Cart',
			component:Cart
		},
		{
			path: "/address",
			name:'Address',
			component:Address
		},
		{
			path: "/orderConfirm",
			name:'OrderConfirm',
			component:OrderConfirm
		},
		{
			path: "/orderSuccess",
			name:'OrderSuccess',
			component:OrderSuccess
		}
	]
})

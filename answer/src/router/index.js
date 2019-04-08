import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home'
import Answer from '@/pages/answer'
import Score from '@/pages/score'
Vue.use(Router)

export default new Router({
  routes: [
	  {
	  	path:'/',
	  	name:'Home',
	  	component:Home
	  },{
	  	path:'/answer',
	  	name:'Answer',
	  	component:Answer
	  },{
	  	path:'/score',
	  	name:'Score',
	  	component:Score
	  }
  ]
})

//  增加性能   render 
/**
 *  path:"/",
 * 	name:"app",
 *  component:App,
 * 	children:[
 * 		{
 * 			path:"/home",
 *      //  数组中可以添加插件      命名相对于是  name:""     
 * 			component:r=>require.ensure([],()=>require("路径"),"命名")
 * 		}
 * 	]
 *
 */
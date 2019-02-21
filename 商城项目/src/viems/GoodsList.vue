<template>
	<div>
	<nav-header></nav-header>	
	<nav-bread>
		<span slot="sun">Goods</span>
	</nav-bread>	
	<div class="accessory-result-page accessory-page">
	  <div class="container">
	    <div class="filter-nav">
	      <span class="sortby">Sort by:</span>
	      <a href="javascript:void(0)" class="default cur">Default</a>
	      <a href="javascript:void(0)" class="price" @click="sortGoods">
	      	Price
	      	<svg class="icon icon-arrow-short" v-bind:class="{'sort-up':!sortFlag}">
	      		<use xlink:href="#icon-arrow-short"></use>
	      	</svg>
	      </a>
	      <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
	    </div>
	    <div class="accessory-result">
	      <!-- filter -->
	      <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
	        <dl class="filter-price">
	          <dt>Price:</dt>
	          <dd><a href="javascript:void(0)" :class="{'cur':priceChecked=='all'}" @click="priceChecked='all'">All</a></dd>
	          <dd v-for="(price,index) in priceFilter">
	            <a href="javascript:void(0)" :class="{'cur':priceChecked==index}" @click="setPriceFilter(index)">{{price.startPrice}} - {{price.endPrice}}</a>
	          </dd>
	        </dl>
	      </div>	
	      <!-- search result accessories list -->
	      <div class="accessory-list-wrap">
	        <div class="accessory-list col-4">
	          <ul>
	            <li v-for="item in goodslist">
	              <div class="pic">
	                <a href="#"><img :src="'../../static/'+item.productImage" v-lazy="'../../static/'+item.productImage" alt=""></a>
	              </div>
	              <div class="main">
	                <div class="name">{{item.productName}}</div>
	                <div class="price">{{item.salePrice}}</div>
	                <div class="btn-area">
	                  <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
	                </div>
	              </div>
	            </li>	            
	         </ul>
	         <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
			   <img src="./../assets/loading-spinning-bubbles.svg" alt="" v-show="loading"/>
			 </div>  
	        </div>
	      </div>
	    </div>
	  </div>
	</div>	
	<div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
	<model :mdShow='mdShow' v-on:close="closeModel">
		<p slot="message">
			请先登录，否则人无法加入到购物车中!
		</p>
		<div slot="btnGroup">
			<a class='btn btn--m' @click="mdShow = false">关闭</a>
		</div>
	</model>
	<model :mdShow='mdShowCart' v-on:close="closeModel">
		<p slot="message">
			<svg class="navbar-cart-logo" style="width: 25px; height: 25px;">
	            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
	        </svg>
	        <span>加入购物车成功!</span>
		</p>
		<div slot="btnGroup">
			<a class='btn btn--m' @click="mdShowCart = false">继续购物</a>
			<router-link class='btn btn--m' href="javascript:;" to='/cart'>查看购物车</router-link>
		</div>
	</model>
	<nav-footer></nav-footer>	
	</div>
</template>

<script>
	import './../assets/css/base.css'  
	import './../assets/css/product.css' 
	import NavHeader from './../components/Header'
	import NavFooter from './../components/Footer'
	import NavBread from './../components/Bread'
	import Model from './../components/Model'
	import axios from 'axios'
	export default {
	  data(){
	  	return {
	  		sortFlag:true,
	  		goodslist:[],   //  接收后端传来的数据
	  		page:1,     //页数
 	  		pageSize:8,  //  每页多少条数据
	  		priceFilter:[     //  做价格的区间
	  			{
	  				startPrice:"0.00",
	  				endPrice:"500.00"
	  			},{
	  				startPrice:"500.00",
	  				endPrice:"1000.00"
	  			},{
	  				startPrice:"1000.00",
	  				endPrice:"2000.00"
	  			},{
	  				startPrice:"2000.00",
	  				endPrice:"5000.00"
	  			}
	  		],
	  		priceChecked:'all',   //  商品全部加载完的时候
	  		filterBy:false,     //   做响应式用到的价格区间                               【17行】
	  		overLayFlag:false,  //   响应式用到的模态框                                       【51行】
	  		busy:true,           //  滚动条下拉加载   默认true 不加载           【43行】
	  		loading:false,        //  控制下来动画的显示隐藏
	  		mdShow:false,
	  		mdShowCart:false
	  	}
	  },
	  components:{    //  做组件的分离
	  	NavHeader,
	  	NavFooter,
	  	NavBread,
	  	Model
	  },
	 mounted:function(){   //  el被新创建的 vm.$el 替换,并挂载到实例上去之后调用该钩子
	  	this.getGoodsList();
	  },
	   methods:{
	  	getGoodsList(flag){   //   封装的一个函数用来加载数据以及一些细节操作
	  		var param={   //  将要向后端传的数据  
	  			page:this.page,  //  页数
	  			pageSize:this.pageSize,   // 一页多少条数据
	  			sort:this.sortFlag?1:-1,   //  排序   1  升序   -1  降序
	  			priceLevel:this.priceChecked  //  价格区间
	  			
	  		}
	  		this.loading = true;   //    必须在加载数据之前开启滚条下拉动画
	  		axios.get("/goods/list" ,{
	  			params:param  //  像后端传的数据
	  		}).then(res=>{
	  			this.loading = false;  // 开始接受数据取消动画
	  			if (res.data.status=='0') {  //  在数据库有status=='0' 判断为成功
	  				if (flag) {  //  flag是参数    判断是否触发了滚动条事件
	  					this.goodslist = this.goodslist.concat(res.data.list.list);  //  将加载来的数据都合并到一起
	  					if (res.data.list.count == 0) {   //  判断还有没有数据   关闭滚动条下拉动画
	  						this.busy = true;
	  					} else{
	  						this.busy = false;
	  					}
	  				} else{
	  					this.goodslist = res.data.list.list;
	  					this.busy = false;
	  				}
	  			} else{
	  				this.goodslist = []
	  			}	  			
	  		})
	  	},
	  	sortGoods(){  //   点击Price   用来做排序的准备工作       				【12行】
	  		this.sortFlag = !this.sortFlag;    //  1  -1  相互切换
	  		this.page = 1;         //  每次都从第一页开始排序
	  		this.getGoodsList();     //  重新加载一次     排好序
	  	},
	  	showFilterPop(){  //   为响应式做的   点击Filter by显示价格区间和模态框      【13行】
	  		this.filterBy=true;
	  		this.overLayFlag=true;
	  	},
	  	closePop(){      //   为响应式做的   点击模态框隐藏价格区间和模态框      【51行】
	  		this.filterBy=false;
	  		this.overLayFlag=false;
	  	},
	  	setPriceFilter(index){  //  设置价格的过滤     【22行】
	  		this.priceChecked = index;  //  获取是哪个价格区间
	  		this.page = 1;    //  每次从第一页开始过滤
	  		this.closePop();     //  看上一个解释
	  		this.getGoodsList();   //  重新加载一次    只显示过滤出来的数据
	  	},
	  	loadMore(){   //    执行一个滚动条事件
	  		this.busy = true;
	  		setTimeout(() => {   //  加一个节流阀    防止事件一直被触发
		        this.page++;  //  请求下一页的数据
		        this.getGoodsList(true);  //  传入true   flag生效     【119行】
		    },800);
	  	},
	  	addCart(productId){  //  加入购物车  【38行】
	  		axios.post('/goods/addCart',{
	  			productId:productId
	  		}).then(res=>{
	  			if (res.data.status=='0') {
	  				this.mdShowCart = true;
	  				this.$store.commit('updateCartCount',1)
	  			} else{
	  				this.mdShow = true;
	  			}	  			
	  		})
	  	},
	  	closeModel(){
	  		this.mdShow = false;
	  		this.mdShowCart = false;
	    }
	  }
	}
</script>
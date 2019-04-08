<template>
	<div class="home">
		<item>
			<p slot='title-p' class="title-font">答题完成</p>
			<div slot='imgbtn'>
				<img  class="imgsize" src="../assets/image/4-3.png" alt="" />
			</div>
		</item>
		<div @click='restore' class="returnIndex">
			<button>重新开始</button>
		</div>
		<div class="topic leftZero">
			<div class="imgScore">
				<ul>
					<li class="score">总成绩:<span class="fontScore">{{fraction}}</span></li>
					<li class="allTime">总用时:<span class="fontTime">{{allTime/1000}}秒</span></li>
				</ul>
			</div>
			
		</div>
	</div>
</template>
 
<script type="text/javascript">
	import Item from '../components/item'
	import { mapState } from 'vuex'
	export default {
		data(){
			return {}
		},
		computed:{
			...mapState(['allTime','fraction','itemNum',])
		},
		created(){
			//  渲染答题时间
			var ctime = this.$store.state.active_end_time-this.$store.state.active_start_time;
			this.$store.state.allTime = ctime;
		},
		methods:{
			//  点击重新开始    将数据全部恢复到初始值
			restore(){
				this.$store.state.fraction=0;
				this.$store.state.allTime=0;
				this.$router.push('/')
			}
		},
		components:{
			Item
		}
	}
</script>
<style type="text/css">
	.imgScore{
    	height: 240px;
    	background: url(../assets/image/4-2.png) no-repeat 0 0;
    	background-size: cover;
    	padding: 114px 0 0 55px;
    	box-sizing: border-box;
	}
	.score,.allTime,.wrong{
		font-size: 20px;
		position: relative;
		margin: 20px 0;	
		font-weight: bold;
	}
	.fontScore{
		position: absolute;
	    right: 40px;
	    bottom: -20px;
	    font-size: 50px;
	    color: red;
	}
	.fontTime{
		color: #1D1D1D;
		font-weight: normal;
		
	}
	.returnIndex{
		font-size: 30px;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 9;
	}
	.returnIndex button{
		padding: 10px;
		font-size: 18px;
		color: green;
		background: #2B542C;
		border: none;
		box-shadow: 5px 5px 5px #5CB85C;
	}
	.leftZero{
		left: -5px;
	}
</style>
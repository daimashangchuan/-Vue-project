<template>
	<div class="home">
		<item>
			<!-- 
				将item作为公共组件并且在组件内部挖俩个插槽
			-->
			<p slot='title-p' class="title-font">第一周</p>
			<img slot='imgbtn' @click="startTime" class="imgsize" src="../assets/image/1-4.png" alt="" />
		</item>
	</div>
</template>
 
<script type="text/javascript">
	import Item from '../components/item'
	export default {
		methods:{
			/**
			 * 获取点击开始的时间 提交到保存到 vuex 中
			 * */
			startTime(){
				var date = new Date();
				var s = date.getTime();	
				this.$store.state.active_start_time = s;
				this.$router.push('/answer')
			}
		},
		components:{
			Item
		}
	}
</script>

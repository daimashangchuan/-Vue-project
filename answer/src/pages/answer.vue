<template>
	<div class="home">
		<item>
			<p slot='title-p' class="title-font">
				{{itemDetail[itemNum-1].topic_name}}
			</p>
			<div slot='imgbtn'>
				<img v-if='itemNum<itemDetail.length' @click='nextTitle' class="imgsize" src="../assets/image/2-2.png" alt="" />
				<img v-else @click='nextTitle' class="imgsize" src="../assets/image/3-1.png" alt="" />
			</div>
		</item>
		<div class="topic">
			<ul class="topic-ul">
				<li v-for='(item,index) in itemDetail[itemNum-1].topic_answer' @click='backto(index)'> 
					<span :class="{radiusSpan:chooseNum==index}">
						{{list[index].title}}
					</span>
					{{item.answer_name}}
				</li>
			</ul>
		</div>
	</div>
</template>
 
<script type="text/javascript">
	import Item from '../components/item'
	import '../assets/css/answer.css'
	import { mapState,mapActions } from 'vuex'
	export default {
		data(){
			return {
				//  控制选中
				chooseNum:null,
				
				// 控制点击第二次取消选中
				num:'',
				
				// 接收第几题
				topicName:0,
				
				// 判断对错   1 对  0 错
				standard:'',
				
				//  渲染 A B C D
				list:[
					{title:"A"},
					{title:"B"},
					{title:"C"},
					{title:"D"}
				]
			}
		},
		methods:{	
			...mapActions(['addNext']),
			
			
			/**
			 * 	点击选择选项
			 *  	实现点击同一个选项取消选择
			 *		同时获取is_standard_answer判断对错     返回  1 对，返回  0 错 
			*/
			backto(index){
				//  点击第一次必须选中  同时拿出将对错赋值给全局下的 standard 保证可以覆盖
				if(this.chooseNum == null){
					this.num = index;
					this.chooseNum = index;
					this.standard = this.itemDetail[this.topicName].topic_answer[this.num].is_standard_answer					
					
				//  点击为相同的选项就取消选中
				} else if(this.num == index){
					this.chooseNum = null
					
				//  考虑的其它
				} else{
					this.num = index;
					this.chooseNum = index;
					this.standard = this.itemDetail[this.topicName].topic_answer[this.num].is_standard_answer
				}
				
			},
			
			/**
			 * 点击下一题
			 * 	1.设置全局变量 topicName 来记录当前是几题
			 * 	2.判断选项是否为空
			 * 		2.1  为空执行提示
			 * 		2.2 不为空 
			 * 			2.2.1  判断  itemNum与itemDetail.length是否相等，保证拿到最后一条答题记录
			 * 				不相等获取下一题的数据
			 * 				相等说明已经取完数据
			 * 					将题目恢复初始
			 * 					同时获取答完题的时间 保存到 vuex 中
			 * 					最后跳转路由
			 * 	3.设置全局加分变量获取全局变量 standard 为  1 加分
			 * 		3.1 要重新赋值，保证下次得到的数据是最新的
			 * 	
			 * */
			nextTitle(){
				if (this.topicName == this.itemDetail.length) {
					this.topicName = 0;
				} else {
					this.topicName++;
				}
				if (this.standard == 1) {
					this.$store.state.fraction += 20;
					this.standard = 0;
				}
				if (this.chooseNum == null) {
					this.topicName--;
					alert('请选着答案')
				} else{
					if (this.itemNum==this.itemDetail.length) {
						this.chooseNum = null;
						//  恢复到第一题
						this.$store.state.itemNum=1;
						//  获取答完题的时间
						var date = new Date();
						var s = date.getTime();
						this.$store.state.active_end_time = s;
						//  跳转路由
						this.$router.push('/score');
					} else{
						this.addNext();
						this.chooseNum = null;
					}										
				}
			}
		},
		computed:{
			...mapState(['itemDetail',"itemNum","fraction"])
		},
		components:{
			Item
		}
	}
</script>
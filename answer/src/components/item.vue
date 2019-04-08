<template>
	<div class="item">
		<div class="title-tip">
			<slot name='title-p'></slot>
			<img src="../assets/image/tip.png" alt="" />
		</div>
		<div class="push-button">		
			<div class="center">
				<slot name='imgbtn'></slot>
			</div>
		</div>
	</div>
</template>
 
<script type="text/javascript">
	import '@/assets/css/item.css'
	export default {
		
	}
</script>
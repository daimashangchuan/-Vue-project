<template>
  <div id="error-404">
    <img src="@/assets/404.png" alt>
    <div class="text">
      <p>真不巧，您访问的页面走丢了！</p>
      <p>您可以试一试以下操作：</p>
      <p @click="$router.go(-1)">返回上一页</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error"
};
</script>

<style lang="scss">
#error-404 {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  p {
    margin: 2vh 0;
  }
  p:nth-child(1) {
    color: #333;
  }
  p:nth-child(2) {
    color: #666;
    font-size: 0.6rem;
  }
  p:nth-child(3) {
    color: #17265a;
    cursor: pointer;
  }
}
@media screen and (max-width: 600px) {
  #error-404 {
    flex-flow: column;
    img {
      width: 80vw;
    }
    .text {
      text-align: center;
    }
  }
}
</style>

<template>
  <div id="error-401">
    <img src="@/assets/401.png" alt>
    <div class="text">
      <p>Sorry,您没有访问权限！</p>
      <p>您可联系400-1110-120</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
#error-401 {
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
}
@media screen and (max-width: 600px) {
  #error-401 {
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

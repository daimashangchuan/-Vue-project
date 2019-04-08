<template>

  <div id="layout">

    <!-- header -->
    <header>

      <!-- title -->
      <div class="title">

        <p>{{$route.name.replace(/(.{1})/g,'$1 ')}}</p>

      </div>

    </header>

    <!-- 移动端菜单 -->
    <div class="horizontal-menu">

      <ul>
        <li v-for="item,index in menuInfo.menuJG" :class="horizontalMenu===item.linkUrl?'now':''" :key="index" @touchstart="horizontalRouter(item,index)">{{item.menuName}}</li>
      </ul>

    </div>

    <!-- aside -->
    <div class="aside">

      <!-- user -->
      <div class="user">

        <img class="head-img" :src="userInfo.headImg" alt="">

        <p>{{userInfo.loginName}}</p>

        <el-popover placement="bottom-end" v-model="visible">
          <div class="popover">
            <el-button style="width:100%" type="primary" size="mini" @click="loginOut">退 出</el-button>
          </div>
          <i slot="reference" style="font-size:0.8rem" class="el-icon-caret-bottom"></i>
        </el-popover>

      </div>

      <!-- menu -->
      <div class="menu">

        <el-menu v-if="menuInfo" :default-active="$route.path" router class="el-menu-vertical-demo" background-color="#020E36" text-color="#fff" active-text-color="#789EEA">

          <el-menu-item v-for="item,index in menuInfo.menuJG" :key="index" :index="item.linkUrl">

            <i :class="item.linkUrl===$route.path?item.icon+'-active':item.icon"></i>

            <span slot="title">{{item.menuName}}</span>

          </el-menu-item>

        </el-menu>

      </div>

    </div>

    <!-- router-view -->
    <div class="view">

      <router-view />

    </div>

  </div>

</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Layout",
  computed: {
    ...mapGetters(["menuInfo", "userInfo"])
  },
  data() {
    return {
      visible: false,
      horizontalMenu: this.$route.path
    };
  },
  methods: {
    // 移动端菜单
    horizontalRouter(item, index) {
      this.horizontalMenu = item.linkUrl;
      this.$router.push({
        path: item.linkUrl
      });
    },
    // 退出
    loginOut() {
      this.$confirm("您确定要退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.$router.push({ path: "/login" });
          this.$store.dispatch("LoginOut").then(state => {});
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss">
@import "./icon.scss";
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 10vw;
}
.popover {
  display: flex;
  align-items: center;
  justify-content: center;
}
#layout {
  width: 100vw;
  height: 100vh;
  background: url("./images/background.png") center;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 5vh 1vw;
  box-sizing: border-box;
  position: relative;
  header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    .title {
      width: 100%;
      height: 109px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      color: #90abe2;
      text-shadow: 0 2px 7px #9dafe6;
      background: url("./images/haeder.png") no-repeat center;
    }
  }
  .horizontal-menu {
    display: none;
    color: #fff;
    width: 100%;
    height: 6vh;
    font-size: 1rem;
    color: #999999;
    ul {
      width: 100%;
      white-space: nowrap;
      overflow-x: scroll;
      overflow-y: hidden;
      -webkit-backface-visibility: hidden;
      -webkit-perspective: 1000;
      -webkit-overflow-scrolling: touch;
      .now {
        color: #fff;
      }
      li {
        display: inline-block;
        margin: 0 4vw;
        line-height: 6vh;
      }
    }
  }
  .aside {
    width: 10vw;
    height: 90vh;
    background: #17265a;
    border-radius: 10px;
    display: flex;
    flex-flow: column;
    align-items: center;
    z-index: 1;
    position: relative;
    .user {
      width: 9vw;
      height: 10vh;
      background: #020e36;
      box-shadow: 0 2px 20px 0 rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      margin-top: 6vh;
      color: #fff;
      display: flex;
      align-items: center;
      font-size: 0.5rem;
      justify-content: space-around;
      .head-img {
        width: 2vw;
        max-height: 5vh;
      }
      p {
        overflow: hidden;
      }
      i {
        cursor: pointer;
      }
    }
    .menu {
      width: 9vw;
      height: 100%;
      background: #020e36;
      overflow-x: hidden;
      overflow-y: auto;
      margin: 1vh 0;
      border-radius: 10px;
    }
  }
  .view {
    flex: 1;
    height: 80vh;
    margin-left: 1vw;
    display: flex;
    margin-top: 109px;
    flex-flow: column;
    overflow: hidden;
  }
}

@media screen and (max-width: 600px) {
  #layout {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-flow: column;
    background: #020e36;
    padding: 0;
    header {
      position: static;
      width: 100vw;
      height: 8vh;
      .title {
        background: #17265a;
        width: 100%;
        height: 100%;
        text-shadow: 0 0;
        color: #fff;
        font-size: 1.5rem;
        i {
          display: block;
        }
      }
    }
    .horizontal-menu {
      display: block;
    }
    .aside {
      display: none;
    }
    .view {
      width: 100%;
      margin: 0;
      flex: 1;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
  }
}
</style>

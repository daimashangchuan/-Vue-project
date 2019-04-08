<template>
  <div id="login" v-loading="loading">
    <!-- PC端 -->
    <div class="web-content">
      <div class="banner">
        <p>监管平台</p>
      </div>

      <div class="form">
        <p class="title">登 录</p>

        <el-form ref="form" :model="form">
          <!-- 用户名 -->
          <el-form-item>
            <el-input v-model="form.userName">
              <i slot="prefix" class="el-input__icon username-icon"></i>
            </el-input>
          </el-form-item>

          <!-- 密码 -->
          <el-form-item>
            <el-input type="password" @keyup.enter.native="submit" v-model="form.passWord">
              <i slot="prefix" class="el-input__icon password-icon"></i>
            </el-input>
          </el-form-item>

          <!-- 忘记密码 -->
          <el-form-item style="margin:0;">
            <router-link style="float:right;color: #333;" to="/forget">忘记密码</router-link>
          </el-form-item>

          <!-- 登录button -->
          <el-form-item>
            <el-button
              style="width:100%;"
              :disabled="form.userName===''||form.passWord===''"
              type="primary"
              @click="submit"
            >登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 移动端 -->
    <div class="content">
      <div class="banner">
        <!-- banner -->
        <img class="banner-pic" src="./images/banner.png" alt>
        <p>政府监管平台</p>
      </div>

      <div class="form">
        <el-form ref="form" :model="form">
          <!-- 用户名 -->
          <el-form-item>
            <el-input v-model="form.userName"></el-input>
          </el-form-item>

          <!-- 密码 -->
          <el-form-item>
            <el-input type="password" @keyup.enter.native="submit" v-model="form.passWord"></el-input>
          </el-form-item>

          <!-- 忘记密码 -->
          <el-form-item style="margin:0;">
            <router-link style="float:right;color:#fff" to="/forget">忘记密码</router-link>
          </el-form-item>

          <!-- 登录button -->
          <el-form-item>
            <el-button
              style="width:100%;"
              :disabled="form.userName===''||form.passWord===''"
              type="info"
              @click="submit"
            >登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <footer>技术支持：北京睿同科技有限公司</footer>
  </div>
</template>

<script>
import md5 from "js-md5";
export default {
  name: "Login",
  data() {
    return {
      form: {
        userName: "",
        passWord: ""
      },
      loading: false
    };
  },
  methods: {
    // 登录
    submit() {
      this.loading = true;
      const loginForm = {
        loginName: this.form.userName,
        pwd: md5(this.form.passWord)
      };
      this.$store.dispatch("LoginIn", loginForm).then(res => {
        this.loading = false;
        if (res.state === 0) {
          const data = res.data;
          if (
            data.menuInfo.menuJGURL.length === 0 ||
            data.userInfo.superviseProvinceId === -1
          ) {
            this.$message({
              message: "该用户无权限登录！",
              type: "warning",
              center: true
            });
          } else {
            this.$router.replace({ path: "/" });
          }
        } else {
          this.$message({
            message: res.msg,
            type: "warning",
            center: true
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
#login {
  width: 100vw;
  height: 100vh;
  background: url("./images/background.png") no-repeat center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  .content {
    display: none;
    width: 70vw;
    height: 70vh;
    .banner {
      width: 100%;
      flex: 3;
      display: flex;
      flex-flow: column;
      justify-content: space-around;
      align-items: center;
      .banner-pic {
        width: 30vw;
      }
      p {
        font-size: 1rem;
        color: #ffffff;
      }
    }
    .form {
      width: 100%;
      flex: 4;
      padding: 2vh 2vw;
      box-sizing: border-box;
    }
  }
  .web-content {
    width: 70vw;
    height: 65vh;
    background: #fff;
    display: flex;
    .banner {
      flex: 4;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 1.8rem;
      background: url("./images/web-banner.png") no-repeat center;
      background-size: cover;
    }
    .form {
      flex: 3;
      padding: 2vh 2vw;
      box-sizing: border-box;
      display: flex;
      flex-flow: column;
      justify-content: space-around;
      .username-icon {
        width: 17px;
        height: 19px;
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background: url("./images/username.png");
        background-size: cover;
      }
      .password-icon {
        width: 17px;
        height: 19px;
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background: url("./images/password.png");
        background-size: cover;
      }
      .title {
        color: #333;
        font-size: 1.2rem;
        text-align: center;
        font-weight: 600;
      }
      .username {
        width: 17px;
        height: 19px;
        line-height: 40px;
        display: inline-block;
        background: url("./images/username.png") no-repeat center;
        background-size: cover;
      }
    }
  }
  footer {
    margin-top: 4vh;
    color: #333;
    font-size: 1rem;
  }
}

@media screen and (max-width: 600px) {
  #login {
    background: #17265a;
    .el-input__inner {
      background: #17265a;
      color: #fff;
      border-bottom: 1px solid #fff;
    }
    .web-content {
      display: none;
    }
    .content {
      display: block;
      display: flex;
      flex-flow: column;
      .banner {
        p {
          font-size: 1.4rem;
        }
      }
    }
    footer {
      color: #999;
    }
  }
}
</style>

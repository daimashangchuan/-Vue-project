<template>
  <div id="forget">

    <!-- PC端 -->
    <div class="web">
      <!-- header -->
      <div class="header">

        <!-- 进度条 -->
        <ul>

          <li :class="index>=0?'now':''">

            <div class="ball">1</div>
            <p>身份认证</p>

          </li>

          <li class="line1"></li>

          <li :class="index>=1?'now':''">

            <div class="ball">2</div>
            <p>密码重置</p>

          </li>

          <li class="line2"></li>

          <li :class="index>=2?'now':''">

            <div class="ball">3</div>
            <p>重置成功</p>

          </li>

        </ul>
      </div>

      <!-- footer -->
      <div class="footer">

        <!-- 身份认证 -->
        <div v-show="index===0" class="identity">

          <el-form ref="form" :model="form" label-position="top" label-suffix="：">

            <!-- 账号 -->
            <el-form-item label="账号">
              <el-input v-model="form.userName">
              </el-input>
            </el-form-item>

            <!-- 验证码 -->
            <el-form-item label="验证码">
              <div class="verification">
                <el-input @keyup.enter.native="next(1)" v-model="form.verification">
                </el-input>
                <el-button type="primary" :disabled="disabled||form.userName===''" @click="getVerification">{{verificationValue}}</el-button>
              </div>
            </el-form-item>

            <!-- 登录button -->
            <el-form-item>
              <el-button style="width:100%;" :disabled="form.userName===''||form.verification===''" type="primary" @click="next(1)">下一步</el-button>
            </el-form-item>

          </el-form>

        </div>

        <!-- 密码重置 -->
        <div v-show="index===1" class="reset">

          <el-form ref="form" :model="form" :rules="rules" label-position="top" label-suffix="：">

            <!-- 密码 -->
            <el-form-item label="请设置新密码" prop="passWord">
              <el-input type="password" v-model="form.passWord">
              </el-input>
            </el-form-item>

            <!-- 密码 -->
            <el-form-item label="再次输入新密码" prop="newPassWord">
              <el-input type="password" @keyup.enter.native="next(2)" v-model="form.newPassWord">
              </el-input>
            </el-form-item>

            <!-- 登录button -->
            <el-form-item>
              <el-button style="width:100%;" :disabled="form.passWord===''||form.newPassWord===''" type="primary" @click="next(2)">确 定</el-button>
            </el-form-item>

          </el-form>

        </div>

        <!-- 重置成功 -->
        <div v-show="index===2" class="success">

          <!-- success -->
          <img src="../images/success.png" alt="">
          <p>
            <span>密码重置成功！3s后自动返回</span>
            <router-link to="/login">登录界面</router-link>
          </p>
        </div>

      </div>
    </div>

    <!-- 移动端 -->
    <div class="mobile">

      <!-- header -->
      <div class="header">

        <i @click="$router.go(-1)" class="el-icon-arrow-left"></i>
        <div class="title">{{$route.name}}</div>

      </div>

      <!-- form -->

      <div class="form">

        <el-form ref="form" :rules="rules" :model="form">

          <el-form-item>
            <el-input v-model="form.userName">
              <template slot="prepend">账号</template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <div class="verification">
              <el-input style="width:50vw" v-model="form.verification">
                <template slot="prepend">验证码</template>
              </el-input>
              <el-button style="width:40vw" type="info" :disabled="disabled||form.userName===''" @click="getVerification">{{verificationValue}}</el-button>
            </div>
          </el-form-item>

          <el-form-item prop="passWord">
            <el-input type="password" placeholder="请输入新密码" v-model="form.passWord">
            </el-input>
          </el-form-item>

          <el-form-item prop="newPassWord">
            <el-input type="password" placeholder="请再次确认新密码" v-model="form.newPassWord">
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="mobileSubmit" :disabled="form.userName===''||form.verification===''||form.passWord===''||form.newPassWord===''" style="width:100%" type="info">登 录</el-button>
          </el-form-item>

        </el-form>

      </div>

    </div>

  </div>
</template>

<script>
import { isValidPwd } from "@/utils/regex.js";
import md5 from "js-md5";
const CheckPwd = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入新密码"));
  } else if (!isValidPwd(value)) {
    callback(new Error("请输入正确的新密码，必须为数字加字母，6-15位字符"));
  } else {
    callback();
  }
};
export default {
  name: "Forget",
  data() {
    return {
      form: {
        userName: "",
        verification: "",
        passWord: "",
        newPassWord: ""
      },
      rules: {
        passWord: [
          {
            required: true,
            validator: CheckPwd,
            trigger: "blur"
          }
        ],
        newPassWord: [
          {
            required: true,
            validator: CheckPwd,
            trigger: "blur"
          }
        ]
      },
      index: 0,
      disabled: false,
      mobile: null,
      second: 60,
      verificationValue: "点击获取验证码"
    };
  },
  watch: {
    second(now) {
      if (now === 0) {
        this.second = 60;
        this.disabled = false;
        this.verificationValue = "点击获取验证码";
      }
    },
    index(now) {
      if (now === 2) {
        setTimeout(() => {
          this.$router.push({
            path: "/login"
          });
        }, 1000 * 3);
      }
    }
  },
  methods: {
    // 获取验证码
    getVerification() {
      this.$post("/data/my", {
        pathL: "/ap/login/confirmLoginName",
        loginName: this.form.userName
      }).then(res => {
        if (res.state === 0) {
          this.mobile = res.data;
          this.$post("/data/my", {
            pathL: "/supervise/resetSupervisePwd/resetPwdConfirmCode",
            mobile: res.data
          }).then(response => {
            if (response.state === 0) {
              this.$message({
                message: "验证码发送成功！",
                type: "success",
                center: true
              });
              this.disabled = true;
              for (let i = 0; i < 60; i++) {
                setTimeout(() => {
                  this.second--;
                  this.verificationValue = this.second + "秒后重新获取";
                }, 1000 * i);
              }
            } else {
              this.$message({
                message: response.msg,
                type: "warning",
                center: true
              });
            }
          });
        } else {
          this.$message({
            message: res.msg,
            type: "warning",
            center: true
          });
        }
      });
    },
    // PC端下一步
    next(index) {
      switch (index) {
        case 1:
          this.$post("/data/my", {
            pathL: "/supervise/resetSupervisePwd/checkVerifyCodeSession",
            mobile: this.mobile,
            smsCode: this.form.verification
          }).then(res => {
            if (res.state === 0) {
              this.index = index;
            } else {
              this.$message({
                message: res.msg,
                type: "warning",
                center: true
              });
            }
          });
          break;
        case 2:
          this.$refs.form.validate(valid => {
            if (valid) {
              if (this.form.passWord === this.form.newPassWord) {
                this.$post("/data/my", {
                  pathL: "/ap/login/resetPwd",
                  loginName: this.form.userName,
                  pwd: md5(this.form.passWord),
                  mobile: this.mobile
                }).then(res => {
                  if (res.state === 0) {
                    this.index = index;
                  } else {
                    this.$message({
                      message: res.msg,
                      type: "warning",
                      center: true
                    });
                  }
                });
              } else {
                this.$message({
                  message: "请确保两次密码输入一致！",
                  type: "warning",
                  center: true
                });
              }
            } else {
              this.$message({
                message: "请正确填写表单",
                type: "warning",
                center: true
              });
            }
          });
          break;
      }
    },
    // 移动端登录
    mobileSubmit() {
      if (this.form.passWord === this.form.newPassWord) {
        this.$post("/data/my", {
          pathL: "/supervise/resetSupervisePwd/checkVerifyCodeSession",
          mobile: this.mobile,
          smsCode: this.form.verification
        }).then(res => {
          if (res.state === 0) {
            this.$post("/data/my", {
              pathL: "/ap/login/resetPwd",
              loginName: this.form.userName,
              pwd: md5(this.form.passWord),
              mobile: this.mobile
            }).then(res => {
              if (res.state === 0) {
                this.$message({
                  message: "密码设置成功",
                  type: "success",
                  center: true
                });
                this.$router.push({
                  path: "/login"
                });
              } else {
                this.$message({
                  message: res.msg,
                  type: "warning",
                  center: true
                });
              }
            });
          } else {
            this.$message({
              message: res.msg,
              type: "warning",
              center: true
            });
          }
        });
      } else {
        this.$message({
          message: "请确保两次密码输入一致！",
          type: "warning",
          center: true
        });
      }
    }
  }
};
</script>

<style lang="scss">
#forget {
  width: 100vw;
  height: 100vh;
  .web {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-flow: column;
    .header {
      width: 100vw;
      height: 18vh;
      background: #17265a;
      ul {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .now {
          .ball {
            background: #020e36;
          }
          p {
            color: #fff;
          }
        }
        li:nth-child(odd) {
          height: 60%;
          display: flex;
          flex-flow: column;
          align-items: center;
          justify-content: space-around;
        }
        p {
          font-size: 1rem;
          color: #999;
        }
        .ball {
          width: 60px;
          height: 60px;
          color: #fff;
          border-radius: 50%;
          background: #999999;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .line1 {
          width: 24vw;
          height: 1vh;
          background-image: linear-gradient(90deg, #4066eb 4%, #bcb5b5 100%);
        }
        .line2 {
          width: 24vw;
          height: 1vh;
          background-image: linear-gradient(90deg, #17265a 0%, #e0e0e0 73%);
        }
      }
    }
    .footer {
      flex: 1;
      padding: 20vh 30vw;
      box-sizing: border-box;
      .identity {
        .verification {
          display: flex;
        }
      }
      .success {
        width: 100%;
        height: 100%;
        flex-flow: column;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    }
  }
  .mobile {
    display: none;
  }
}
@media screen and (max-width: 600px) {
  .web {
    display: none !important;
  }
  .mobile {
    display: block !important;
    width: 100vw;
    height: 100vh;
    background: #020e36;
    display: flex;
    flex-flow: column;
    .el-input-group__prepend {
      background: #17265a;
      color: #fff;
    }
    .el-input__inner {
      background: #17265a;
      color: #fff;
    }
    .header {
      width: 100vw;
      height: 8vh;
      background: #17265a;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .title {
        color: #fff;
        font-size: 1.2rem;
      }
      i {
        position: absolute;
        left: 2vw;
        font-size: 1.2rem;
        color: #fff;
        display: block;
      }
    }
    .form {
      flex: 1;
      width: 100%;
      padding: 10vh 5vw;
      box-sizing: border-box;
      .verification {
        display: flex;
      }
    }
  }
}
</style>

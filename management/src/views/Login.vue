<template>
  <div class="login">
    <div class="login-form">
      <h3>{{title}}</h3>
      <div class="form-item">
        <el-input v-model="formData.userName" placeholder="账号"></el-input>
      </div>
      <div class="form-item">
        <el-input v-model="formData.passwd" type="password" placeholder="密码"></el-input>
      </div>
      <el-button type="primary" class="login-btn" @click="loginEv">登录</el-button>
    </div>
  </div>
</template>

<script>
import loginApi from "@/apis/login";
export default {
  name: "login",
  data() {
    return {
      formData: {
        userName: "",
        passwd: ""
      },
      title: ""
    };
  },
  computed: {
    $user() {
      return this.$store.state.login.user;
    }
  },
  created() {
    this.title = document.title;
    console.log("$user", this.$user);
  },
  methods: {
    loginEv() {
      let _params = {};
      this.$message.success("登录成功");
      this.$store.commit("login/setUser", {
        name: "dev",
        token: "dev"
      });
      this.$router.replace("/home");
      return;
      if (this.checkForm()) {
        _params.userName = this.formData.userName;
        _params.passwd = this.formData.passwd;
        this.$axios.put(loginApi.common, _params).then(
          res => {
            this.$store.commit("login/setUser", {
              name: _params.userName,
              token: res.data.token
            });
            this.$message.success("登录成功");
            this.$router.replace("/home");
          },
          err => {
            this.$message.error(err.message || "登录失败,请联系管理员");
          }
        );
      }
    },
    checkForm() {
      if (this.formData.userName == "") {
        this.$message.error("账号不能为空");
        return false;
      } else if (this.formData.passwd == "") {
        this.$message.error("密码不能为空");
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  background: #ffffff;
  align-items: center;
}
.login-form {
  margin: auto;
  position: relative;
  /* top: -100px; */
  width: 360px;
  padding: 30px;
  box-shadow: 0 0 20px 10px rgba(207, 207, 207, 0.5);
}
h3 {
  text-align: center;
  margin-top: 0;
  color: #bfcbd9;
}
.form-item {
  margin-bottom: 20px;
}
.login-btn {
  width: 100%;
}
</style>

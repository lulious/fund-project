<template>
  <div class="home">
    <el-container>
      <!-- header -->
      <el-header class="header">
          <div class="company">{{companyName}}管理平台</div>
          <el-button style="float: right; margin: 10px" type="danger" @click="signOut">注销</el-button>
          <div class="user">{{$user.name}}</div>
      </el-header>
      <el-container class="body">
        <!-- 侧边栏 -->
        <el-aside width="200px">
          <el-menu :router="true" text-color="rgba(64, 158, 255, 1)">
            <el-submenu v-for="subMenu in asideMenu" :key='subMenu.path' :index="subMenu.path">
              <template slot="title">
                <span>{{subMenu.name}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="page in subMenu.configPages" :key='page.path' :index="page.path">{{page.name}}</el-menu-item>
              </el-menu-item-group> 
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 内容区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "home",
  data() {
    return {
      companyName: GLOBAL_CONFIG.companyName,
      userName: 'XX用户',
      skinColor: '#409EFF',
      asideMenu: GLOBAL_CONFIG.asideMenu
    };
  },
  computed: {
    $user() {
      return this.$store.state.login.user
    }
  },
  watch: {
    '$user.token': {
      handler(newVal, oldVal) {
        if (!newVal) {
          this.signOut()
        }
      },
      immediate: true
    }
  },
  methods: {
    switchPage() {

    },
    signOut() {
      this.$store.commit("login/signOut");
      this.$router.replace('/')
    },
    hexToRgba(hex, opacity) { 
      return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")"; 
    }

  },
};
</script>
<style scoped>
 .home {
    width: 100vw;
    height: 100vh;
  }
  .home > .el-container {
    height: 100vh;
  }
  .el-header {
    background-color: rgba(64, 158, 255, 1);
    text-align: center;
    line-height: 60px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    z-index: 999;
    position: fixed;
    width: 100%;
    height: 60px;
  }
  .company {
    float: left;
    color: #FFF;
    font-size: 20px;
    font-weight: bold;
  }
  .user {
    float: right;
    color: #FFF;
    font-size: 18px;
    margin-right: 10px;
  }
  .el-aside {
    background-color: rgba(64, 158, 255, 0.5);
    color: #333;
    text-align: center;
    line-height: 200px;
    box-shadow: 1px 0 4px rgba(0, 0, 0, 0.2);
    z-index: 99;
    position: fixed;
    top: 60px;
    left: 0;
    height: 100vh;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    margin-left: 200px;
    margin-top: 60px;
  }
  .el-submenu {
    font-weight: bold;
  }
  .el-menu-item {
    font-size: 12px;
    font-weight: normal;
  }
</style>


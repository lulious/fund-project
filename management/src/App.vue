<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
}
* {
  padding: 0;
  margin: 0;
}
.el-input .el-input__count {
  height: 0 !important;
}
.el-input .el-input__count .el-input__count-inner {
  height: 50%;
}
.el-form-item__content {
  display: flex;
}
.el-form-item__label{
        width: 80px !important;
      }
</style>

<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="createTime" label="创建时间" width="150"></el-table-column>
      <el-table-column prop="header" label="周评话题设置" width="300"></el-table-column>
      <el-table-column prop="time" label="发布话题周期" width="200"></el-table-column>
      <el-table-column label="服务操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleConfig(scope)">内容管理</el-button>
          <el-button type="warning"  @click="handlePublish(scope)" >点击发布</el-button>
          <el-button type="danger"  @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "fund-table",
  props: {
    tableData: Array
  },
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
     handleDelete(scope) {
        const periods = scope.row.periods;
        this.$emit('delete', periods);
      },
      handlePublish(scope){
        const periods = scope.row.periods;
        this.$emit('publish', periods);
      },
      handleConfig(scope){
        const periods = scope.row.periods;
        this.$emit('config', periods);
      }
  }
};
</script>
<style lang="less" scoped>
</style>

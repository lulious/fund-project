<template>
  <div class="page">
    <el-button class="add_button" type="primary" icon="el-icon-plus" @click="goTo">添加</el-button>
    <fund-table
      :tableData="tableData"
      @delete="handleDelete"
      @publish="handlePublish"
      @config="handleConfig"
    />
  </div>
</template>

<script>
import myApis from "@/apis/investmentGuidance"; // 同一个项目接口统一定义在一个文件夹
import FundTable from "@/components/Table.vue";
export default {
  name: "investmentGuidance_topicList",
  components: {
    FundTable
  },
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    goTo() {
      this.$router.push({ path: "ContentList" });
    },
    handleDelete(data) {
      myApis.deleteTopic({ periods: data }).then(res => {
         if(res.data.errCode==="e0000"){
          this.$message({
          message: '删除成功',
          type: 'success'
        });
        }else{
          this.$message.error('接口原因，删除失败');
        }
        this.getInfo();
      });
    },
    handlePublish(data) {
      myApis.publishTopic({ periods: data }).then(res => {
        if(res.data.errCode==="e0000"){
          this.$message({
          message: '发布成功',
          type: 'success'
        });
        }else{
          this.$message.error('接口原因，发布失败');
        }
      });
    },
    handleConfig(data) {
      this.$router.push({
        path: "ContentList",
        query: {
          periods: data
        }
      });
    },
    getInfo() {
      myApis.getInfo().then(res => {
        this.tableData = res.data.body.map(item => {
          return Object.assign({}, item, {
            time: this.formatDate(this.startDate, this.endDate)
          });
        });
      });
    },
    formatDate(startDate, endDate) {
      if (startDate && endDate) {
        return `${startDate.slice(0, 4)} : ${startDate.slice(
          4,
          6
        )}月${startDate.slice(6)}日/ ${endDate.slice(4, 6)}月${endDate.slice(
          6
        )}日`;
      } else {
        return "-";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.page {
  background-color: #fff;
  padding: 30px;
  text-align: start;
  .add_button {
    margin-bottom: 30px;
  }
}
</style>

<template>
  <div class="page">
    <div class="top-container">
      <p>内容管理</p>
      <div>
        <div>
          <span>时间选择：</span>
          <el-date-picker
            v-model="daterange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyyMMdd"
          ></el-date-picker>
          <el-button class="save-button" type="primary" @click="goBack">返回</el-button>
          <el-button class="save-button" type="primary" @click="saveForm">保存</el-button>
        </div>
        <div class="topic-container">
          <span class="label">话题编辑：</span>
          <el-input v-model="header" placeholder="请输入话题"></el-input>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <fund-form
      type="a_fund"
      :form="a_fund_form"
      v-on:a_fund="validate($event,'a_fund')"
      ref="a_fund_form"
    />
    <el-divider></el-divider>
    <fund-form
      type="bond_fund"
      :form="bond_fund_form"
      v-on:bond_fund="validate($event,'bond_fund')"
      ref="bond_fund_form"
    />
    <el-divider></el-divider>
    <fund-form
      type="hk_fund"
      :form="hk_fund_form"
      v-on:hk_fund="validate($event,'hk_fund')"
      ref="hk_fund_form"
    />
    <el-divider></el-divider>
    <fund-form
      type="us_fund"
      :form="us_fund_form"
      v-on:us_fund="validate($event,'us_fund')"
      ref="us_fund_form"
    />
    <el-dialog :visible.sync="centerDialogVisible" width="30%" center>
      <span>{{centerDialogText}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fund_options, init_form } from "@/utils";
import myApis from "@/apis/investmentGuidance";
import FundForm from "@/components/Form.vue";
export default {
  name: "investmentGuidance_contentList",
  components: {
    FundForm
  },
  data() {
    return {
      year: "",
      daterange: "",
      header: null,
      a_fund_form: Object.assign({},init_form),
      bond_fund_form: Object.assign({},init_form),
      hk_fund_form: Object.assign({},init_form),
      us_fund_form: Object.assign({},init_form),
      a_fund_validate: false,
      bond_fund_validate: false,
      hk_fund_validate: false,
      us_fund_validate: false,
      centerDialogVisible: false,
      centerDialogText: "",
      periods: null
    };
  },
  created() {
    this.periods = this.$route.query.periods;
    if (this.periods) {
      this.getForm();
    }
  },
  methods: {
    goBack(){
         this.$router.push({ path: "TopicList" });
    },
    saveForm() {
      this.$refs["a_fund_form"].submitForm();
      this.$refs["bond_fund_form"].submitForm();
      this.$refs["hk_fund_form"].submitForm();
      this.$refs["us_fund_form"].submitForm();
      const {
        a_fund_validate,
        bond_fund_validate,
        hk_fund_validate,
        us_fund_validate
      } = this;
      if (
        a_fund_validate &&
        bond_fund_validate &&
        hk_fund_validate &&
        us_fund_validate
      ) {
        this.centerDialogText = "亲，您的内容已填写完整，现在可以去发布啦！";
      } else {
        this.centerDialogVisible = true;
        this.centerDialogText = "您的内容还没填写完整，记得回来补充哦！";
      }
    },
    submitForm() {
      const { a_fund_form, bond_fund_form, hk_fund_form, us_fund_form } = this;
      this.centerDialogVisible = false;
      const args = [
        a_fund_form,
        bond_fund_form,
        hk_fund_form,
        us_fund_form
      ].map(item => {
        const res = Object.assign({}, item, {
          startDate: this.daterange ? this.daterange[0] : "",
          endDate: this.daterange ? this.daterange[1] : "",
          header: this.header
        });

        // 删除多余的属性
        delete res.state;
        delete res.updateTime;
        delete res.createTime;
        return res;
      });
      myApis.insertCommandPost(args);
    },
    validate(result, type) {
      this[`${type}_validate`] = result.validate;
      this[`${type}_form`] = result.form;
    },
    getForm() {
      myApis.getForm(this.periods).then(res => {
        this.formatForm(res.data.body);
      });
    },
    formatForm(data) {
      this.header = data[0].header;
      this.daterange = [data[0].startDate, data[0].endDate];
      data.forEach(item => {
        const type = item.title.slice(0, 2);
        const state = fund_options.filter(fund => {
          return fund.label === item.title.slice(2);
        })[0];
        if (type === "A股") {
          this.a_fund_form = Object.assign(
            {},
            { ...item },
            {
              state: state
            }
          );
        } else if (type === "债券") {
          this.bond_fund_form = {
            ...item,
            state: state
          };
        } else if (type === "美股") {
          this.us_fund_form = {
            ...item,
            state: state
          };
        } else {
          this.hk_fund_form = {
            ...item,
            state: state
          };
        }
      });
    }
  }
};
</script>

<style lang="less" scope>
.page {
  background-color: #fff;
  padding: 30px;
  .top-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .save-button {
      margin-left: 20px;
    }
    .topic-container {
      display: flex;
      align-items: center;
      margin-top: 10px;
      width: 70%;
      .label {
        width: 100px;
      }
    }
  }
  .fund-container {
    display: flex;
    flex-direction: column;
  }
}
</style>

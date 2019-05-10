<template>
  <el-form
    label-position="left"
    label-width="80px"
    :model="form"
    :rules="rules"
    ref="form"
    hide-required-asterisk
    :show-message="false"
  >
    <div class="top">
      <div class="left">
        <span class="fund_title">{{formatTitle(type)}}</span>
        <el-form-item label-width="0" prop="state">
          <el-select v-model="form.state" placeholder="请选择">
            <el-option
              v-for="item in fund_options"
              :key="item.value"
              :label="item.label"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </div>
      <div class="right">
        <div class="inline">
          <el-form-item label="股型描述" prop="label">
            <el-input v-model="form.label"/>
          </el-form-item>
          <el-form-item label="股型标签" prop="attribute">
            <el-input v-model="form.attribute"/>
          </el-form-item>
        </div>
        <div class="inline">
          <el-form-item label="本期解读" prop="thisWeekTitle">
            <el-input
              type="text"
              placeholder="请输入标题"
              v-model="form.thisWeekTitle"
              maxlength="15"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label-width="0" prop="thisWeekContent">
            <el-input
              v-model="form.thisWeekContent"
              type="textarea"
              placeholder="请输入正文"
            />
          </el-form-item>
        </div>
        <div class="inline">
          <el-form-item label="后市展望" prop="nextWeekTitle">
            <el-input
              type="text"
              placeholder="请输入标题"
              v-model="form.nextWeekTitle"
              maxlength="15"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label-width="0" prop="nextWeekContent">
            <el-input
              v-model="form.nextWeekContent"
              type="textarea"
              placeholder="请输入正文"
            />
          </el-form-item>
        </div>
      </div>
    </div>
    <div class="bottom">
      <span class="product_title">相关产品</span>
      <div class="funds">
        <el-form-item class="inline_label" label="基金名称" label-width="0"  prop="fundName">
          <el-input v-model="form.fundName" placeholder="请输入基金名称"></el-input>
        </el-form-item>
        <el-form-item class="inline_label" label="收益类型" label-width="0" prop="dimension">
          <el-select v-model="form.dimension" placeholder="请选择">
            <el-option
              v-for="item in income_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="inline_label" label="产品代码" label-width="0" prop="fundCode">
          <el-input v-model="form.fundCode" placeholder="请输入产品代码"></el-input>
        </el-form-item>
        <el-form-item class="inline_label" label="产品描述" label-width="0" prop="slogan">
          <el-input v-model="form.slogan" placeholder="请输入产品描述"></el-input>
        </el-form-item>
        <el-form-item class="inline_label" label="链接" label-width="0" prop="buttonLink">
          <el-input v-model="form.buttonLink" placeholder="请输入链接"></el-input>
        </el-form-item>
        <div class="fund_item">
          <span></span>
          <el-button class="save-button" type="primary" @click="resetProduct">删除</el-button>
        </div>
      </div>
    </div>
  </el-form>
</template>
<script>
import { fund_options, income_options} from '@/utils'
export default {
  name: "fund-form",
  props: {
    type: String,
    form: Object
  },
  data() {
    return {
      fund_options: fund_options,
      income_options: income_options,
      rules: {
        state: [{ required: true, trigger: "change" }],
        attribute: [{ required: true,  trigger: "blur" }],
        label: [{ required: true,  trigger: "blur" }],
        thisWeekTitle: [
          { required: true,trigger: "blur" }
        ],
        thisWeekContent: [
          { required: true, trigger: "blur" }
        ],
        nextWeekTitle: [
          { required: true, trigger: "blur" }
        ],
        nextWeekContent: [
          { required: true, trigger: "blur" }
        ],
        fundName: [
          { required: true, trigger: "blur" }
        ],
        dimension: [
          { required: true, trigger: "change" }
        ],
        fundCode: [
          { required: true, trigger: "blur" }
        ],
        slogan: [
          { required: true, trigger: "blur" }
        ],
        buttonLink: [
          { required: true, trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    title: function() {
      const type = this.formatTitle(this.type);
      const state = this.form.state ? this.form.state.label : '';
      return state ? type + state : type;
    }
  },
  methods: {
    formatTitle(type) {
      if (type === "a_fund") {
        return "A股";
      } else if (type === "bond_fund") {
        return "债券";
      } else if (type === "hk_fund") {
        return "港股";
      } else {
        return "美股";
      }
    },
    submitForm() {
      const type = this.type;
      const form = Object.assign({}, this.form, {
        title: this.title
      });
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$emit(type, { form: form, validate: true });
        } else {
          this.$emit(type, { form: form, validate: false });
        }
      });
    },
    resetProduct() {
      this.form = Object.assign({}, this.form, {
        fundName: "",
        dimension: "",
        fundCode: "",
        slogan: "",
        buttonLink: ""
      });
    }
  }
};
</script>
<style lang="less" scoped>
.top {
  display: flex;
  .left {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    border-right: 1px solid #cccccc;
    padding-right: 20px;
    .fund_title {
      margin: 0 0 30px 10px;
      font-size: 26px;
      font-weight: bold;
    }
  }
  .right {
    width: 70%;
    margin-left: 30px;
    .inline {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .el-form-item {
        width: 45%;
      }
    }
  }
}
.bottom {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  .product_title {
    font-size: 18px;
    color: #666;
    font-weight: bold;
  }
  .funds {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin-top: 20px;
    .fund_item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 80px;
      margin-bottom: 22px;
    }
    .inline_label {
      display: flex;
      flex-direction: column;
      margin-right: 5px;
    }
  }
}
</style>

import { CodeToCN, formatRate } from '../../utils';
Component({
  data: {
    rate: '',
    dimension: '',
    fontColor: ''
  },
  didUpdate(prevProps, prevData) {
    const config = this.props.config;
    if (config !== prevProps.config) {
      const dimension = Object.entries(CodeToCN).filter(item => {
        return item[0] === config.cardUpType;
      })[0][1];
      this.setData({
        dimension: dimension,
      });
      this.getRate(config.cardCode, config.cardUpType)
    }
  },
  methods: {
    getRate(fundCode, dimension) {
      my.request({
        url: `https://www.qdollar.cn/fund-center/fund/${fundCode}`,
        method: 'GET',
        dataType: 'json',
        success: (res) => {
          this.setData({
            rate: formatRate(res.data[`${dimension}`], dimension),
            fontColor: res.data[`${dimension}`] > 0 ? 'rgba(246,86,86,1)' : 'green'
          })
        },
        fail: (res) => {
          console.log('获取收益失败', res);
        }
      });
    },
    goTo() {
      const config = this.props.config;
      my.navigateTo({
        url: config.cardLink
      });
    }
  }
})
import { CodeToCN, formatRate } from '../../utils';
Component({
  data: {
    config: null,
    imgSrc: '',
    rate: '',
    dimension: '',
    fontColor: ''
  },
  didUpdate(prevProps, prevData) {
    const { type, info } = this.props;
    const { temp } = this.data;
    let imgSrc;
    if (type === 'attack') {
      imgSrc = 'https://dollarcdn.cdollar.cn/gffund/zhihuisuo/jingong-bottom.jpg';
    } else if (type === 'straddle') {
      imgSrc = 'https://dollarcdn.cdollar.cn/gffund/zhihuisuo/guanwang-bottom.jpg';
    } else {
      imgSrc = 'https://dollarcdn.cdollar.cn/gffund/zhihuisuo/fangshou-bottom.jpg'
    }
    const dimension = Object.entries(CodeToCN).filter(item => {
      return item[0] === info.dimension
    })[0][1];
    this.setData({
      imgSrc: imgSrc,
      dimension: dimension,
      config: info
    });
    if (prevProps.info !== info) {
      this.getRate(info.fundCode, info.dimension)
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
            fontColor: res.data[`${dimension}`] > 0 ? 'rgba(255,82,48,1)' : 'green'
          })
        },
        fail: (res) => {
          console.log('获取收益失败', res);
        }
      });
    },
    goTo() {
      const fundCode = this.data.config.fundCode;
      my.ap.navigateToFinance({
        type: 'fundDetail',
        fundCode: fundCode // 基金代码
      });
    }
  }
})
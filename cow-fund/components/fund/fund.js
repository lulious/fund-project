
Component({
  data: {
    info: null,
    active: 0,
    position: ''
  },
  didUpdate() {
    const active = this.data.active;
    const config = this.props.config;
    let info;
    if (active === 0) {
      info = {
        position: '100rpx',
        title: "根据量化模型提供的择时建议，请参考使用，不代表股市预测",
        head: ['指数类型', '华夏小牛预测'],
        list: config.map(item => {
          return {

            name: `${item.fundName} 指数`,
            img: item.predict === 'IN' ? '../../images/Rise.png' : '../../images/decline.png',
            text: item.predict === 'IN' ? '买入信号' : '卖出信号',
            color: item.predict === 'IN' ? '#F53C4A' : '#01BA7C'
          }
        })
      }
    } else if (active === 1) {
      info = {
        position: '300rpx',
        title: `该指数的"性价比"，低估代表比历史平均便宜，适合买入；高估适合观望`,
        head: ['指数类型', '当前价位'],
        list: config.map(item => {
          return {
            name: `${item.fundName} 指数`,
            img: item.valuation === 'LOW' ? '../../images/right_.png' : (item.valuation === 'HIGH' ? '../../images/stop.png' : '../../images/right.png'),
            text: item.valuation === 'LOW' ? '低估' : (item.valuation === 'HIGH' ? '高估' : '适中'),
            color: item.valuation === 'LOW' ? '#01BA7C' : (item.valuation === 'HIGH' ? '#F53C4A' : '#FCBE00')
          }
        })
      }
    } else {
      info = {
        position: '500rpx',
        title: "流入表示申购大于赎回，看涨的一方更强势，情绪面乐观，反之亦然",
        head: ['指数ETF', '净流入资金'],
        list: config.map(item => {
          return {
            name: `${item.fundName} ETF`,
            img: item.inFlow > 0 ? '../../images/increase.png' : '../../images/reduce.png',
            text: `${Math.abs(item.inFlow)} 亿元`,
             color: item.inFlow > 0 ? '#F53C4A':'#01BA7C'
          }
        })
      }
    }
    this.setData({
      info: info
    })
  },
  methods:{
    changeActive(e){
      const active = Number(e.target.dataset.index);
      this.setData({
        active: active
      })
    }
  }
})
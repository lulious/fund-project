Component({
  data: {
    active: 0,
    index: 0,
    xAxis: {
      label: null
    },
    yAxis: {
      tickCount: 5
    },
    legend: {
      valueStyle: {
        fill: '#FE4452', // 文本的颜色
        fontSize: '12', // 文本大小
      }
    },
    fundList: [{
      fundCode: '000300',
      fundName: '沪深300'
    }],
    simDataList: [],
    realDataList: []
  },
  didUpdate(prevProps, prevData) {
    const fundList = this.props.fundList;
    if (prevProps.fundList === null) {
      const res = fundList.map(item => {
        let simTrendList, realTrendList;
        my.request({
          url: `https://www.mdollar.cn/huaxia-alipay/index/v1/trendList?fundCode=${item.fundCode}`,
          method: 'GET',
          dataType: 'json',
          success: (res) => {
            simTrendList = res.simTrendList.reduce((total, cur) => {
              return total.concat(cur);
            });
            realTrendList = res.realTrendList.reduce((total, cur) => {
              return total.concat(cur);
            });
          }
        })
        let date = [], simTrendValue = [], realTrendValue = [];
        simTrendList.forEach(item => {
          date.push(item.day);
          simTrendValue.push(item.point);
        })
        realTrendList.forEach(item => {
          realTrendValue.push(item.point);
        })

        // 保留近三年的数据
        const {simDataList,realDataList} = this.data;
        simDataList.push(simTrendValue);
        realDataList.push(realTrendValue);
        this.setData({
          dateList: date,
          simDataList: simDataList,
          realDataList: realDataList
        })

        return Object.assign({}, item, {
          categories: date.slice(0,180),
          series: [
            {
              type: '华夏小牛模拟收益',
              color: '#FE4452',
              style: 'smooth',
              data: simTrendValue.slice(0,180)
            },
            {
              type: item.fundName,
              color: '#B5B5B5',
              style: 'smooth',
              data: realTrendValue.slice(0,180)
            },
          ]
        })
      })
      this.setData({
        fundList: res
      })
    }
  },
  methods: {
    changeActive(e) {
      const active = Number(e.target.dataset.index);
      const {index, fundList, dateList, simDataList, realDataList} = this.data;
      if(active === 0){
        const fund = fundList[`${index}`];
        fund.categories = date.slice(0,180);
        fund.series[0].data = simDataList[`${index}`].slice(0,180);
        fund.series[1].data = realDataList[`${index}`].slice(0,180);
      }else if(active === 1){
        const fund = fundList[`${index}`];
        fund.categories = date.slice(0,365);
        fund.series[0].data = simDataList[`${index}`].slice(0,365);
        fund.series[1].data = realDataList[`${index}`].slice(0,365);
      }else{
        const fund = fundList[`${index}`];
        fund.categories = date.slice(0,180);
        fund.series[0].data = simDataList[`${index}`];
        fund.series[1].data = realDataList[`${index}`];
      }
      fundList[`${index}`] = fund;
      this.setData({
        active: active,
        fundList: fundList
      })
    },

    onChange(e) {
      this.setData({
        index: e.detail.current
      })
    }
  }
})
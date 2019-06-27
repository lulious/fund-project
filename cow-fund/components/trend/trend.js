import { formatRate } from '../../utils';
const getData = new Promise(function(resolve, reject) {
  const data = {
    simTrendList: [
      { "fundCode": "000300", "type": "SIMULATE", "day": "20170905", "point": 0.36 },
      { "fundCode": "000300", "type": "SIMULATE", "day": "20170904", "point": 0.54 },
      { "fundCode": "000300", "type": "SIMULATE", "day": "20170901", "point": 0.37 },
      { "fundCode": "000300", "type": "SIMULATE", "day": "20170831", "point": -0.26 },
      { "fundCode": "000300", "type": "SIMULATE", "day": "20170830", "point": 0.07 },
      { "fundCode": "000300", "type": "SIMULATE", "day": "20170829", "point": -0.20 },
      { "fundCode": "000300", "type": "SIMULATE", "day": "20170828", "point": 1.28 },
      { "fundCode": "000300", "type": "SIMULATE", "day": "20170825", "point": 1.79 },
      { "fundCode": "000300", "type": "SIMULATE", "day": "20170824", "point": -0.55 },
      { "fundCode": "000300", "type": "SIMULATE", "day": "20170823", "point": 0.28 }
    ],
    realTrendList: [
      { "fundCode": "000300", "type": "REAL", "day": "20170905", "point": 0.30 },
      { "fundCode": "000300", "type": "REAL", "day": "20170904", "point": 0.39 },
      { "fundCode": "000300", "type": "REAL", "day": "20170901", "point": 0.22 },
      { "fundCode": "000300", "type": "REAL", "day": "20170831", "point": -0.32 },
      { "fundCode": "000300", "type": "REAL", "day": "20170830", "point": -0.01 },
      { "fundCode": "000300", "type": "REAL", "day": "20170829", "point": -0.21 },
      { "fundCode": "000300", "type": "REAL", "day": "20170828", "point": 1.24 },
      { "fundCode": "000300", "type": "REAL", "day": "20170825", "point": 1.64 },
      { "fundCode": "000300", "type": "REAL", "day": "20170824", "point": -0.57 },
      { "fundCode": "000300", "type": "REAL", "day": "20170823", "point": 0.10 }
    ]
  };
  resolve(data)
})
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
    fundList: [],
    simDataList: [],
    realDataList: []
  },
  didUpdate(prevProps, prevData) {
    const fundList = this.props.fundList;
    if (prevProps.fundList === null) {
      // 先只显示一个
      fundList.forEach(item => {
        getData.then(res => {
          let simTrendList, realTrendList;
          simTrendList = res.simTrendList;
          realTrendList = res.realTrendList;

          let date = [], simTrendValue = [], realTrendValue = [];
          simTrendList.forEach(item => {
            date.push(item.day);
            simTrendValue.push(item.point);
          })
          realTrendList.forEach(item => {
            realTrendValue.push(item.point);
          })

          // 保留近三年的数据
          const { simDataList, realDataList } = this.data;
          simDataList.push(simTrendValue);
          realDataList.push(realTrendValue);
          this.setData({
            dateList: date,
            simDataList: simDataList,
            realDataList: realDataList
          })
          const result = Object.assign({}, item, {
            categories: date.slice(0, 180),
            series: [
              {
                type: '华夏小牛模拟收益',
                color: '#FE4452',
                // style: 'smooth',
                data: simTrendValue.slice(0, 180)
              },
              {
                type: item.fundName,
                color: '#B5B5B5',
                // style: 'smooth',
                data: realTrendValue.slice(0, 180)
              }
            ]
          })

          const fundList_data = this.data.fundList;
          fundList_data.push(result);
          this.setData({
            fundList: fundList_data
          })
        })
      })

    }
  },
  methods: {
    changeActive(e) {
      const active = Number(e.target.dataset.index);
      const { index, fundList, dateList, simDataList, realDataList } = this.data;
      const fund = fundList[`${index}`];
      if (active === 0) {
        fund.categories = dateList.slice(0, 180);
        fund.series[0].data = simDataList[`${index}`].slice(0, 180);
        fund.series[1].data = realDataList[`${index}`].slice(0, 180);
      } else if (active === 1) {
        fund.categories = dateList.slice(0, 365);
        fund.series[0].data = simDataList[`${index}`].slice(0, 365);
        fund.series[1].data = realDataList[`${index}`].slice(0, 365);
      } else {
        fund.categories = dateList;
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
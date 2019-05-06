Page({
  data: {
    info: null,
    active: 0,
    list: null,
  },
  onShow() {
    my.request({
      url: 'https://www.mdollar.cn/gffund-alipay/commandPost/getCommandPostIndex',
      method: 'GET',
      dataType: 'json',
      success: (res) => {
        this.setData({
          info: this.formatData(res.data.body),
          list: this.formatData(res.data.body).map(item => { return { title: item.title, state: item.state, type: item.type } })
        });
      },
      fail: (res) => {
        console.log('页面信息失败', res);
      }
    });
  },
  formatData(data) {
    const res = data.map(item => {
      const type = item.title.slice(2);
      if (type === '进攻') {
        return Object.assign({}, item, {
          type: item.title.slice(0, 2),
          state: 'attack'
        })
      } else if (type === '防守') {
        return Object.assign({}, item, {
          type: item.title.slice(0, 2),
          state: 'guard'
        })
      } else {
        return Object.assign({}, item, {
          type: item.title.slice(0, 2),
          state: 'straddle'
        })
      }
    })
    return res;
  },
  middle(ref) {
    this.setData({
      active: ref.data.active
    })
  },
  onSetActive(active) {
    this.setData({
      active: active
    })
  },
  onShareAppMessage() {
    return {
      title: '小程序示例',
      desc: '小程序官方示例 Demo，展示已支持的接口能力及组件。',
      path: 'page/component/component-pages/view/view?param=123'
    };
  },
});

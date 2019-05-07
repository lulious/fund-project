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
        // 设置顶部bar标题
        my.setNavigationBar({
          title: res.data.body[0].header
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
      title: `${this.data.info[0].header}`,
      desc: `${this.data.info[0].header}`,
      path: 'page/index/index',
      bgImgUrl: 'https://gw.alipayobjects.com/os/q/cms/images/jvde59vb/21bf30be-0173-4754-a750-2a176195b0d5_w750_h950.png'
    };
  },
});

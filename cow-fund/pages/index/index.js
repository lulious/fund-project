
Page({
  data: {
    config: null,
    fundList: null,
    hidden: false
  },
  onLoad() {
    const userId = 'fff'
    my.request({
      url: 'https://www.mdollar.cn/huaxia-alipay/index/v1/index',
      method: 'POST',
      dataType: 'json',
      data: {
        userId: userId
      },
      success: (res) => {
        const fundList = res.data.body.fundList.map(item => {
          return {
            fundCode: item.fundCode,
            fundName: item.fundName
          }
        });
        this.setData({
          fundList: fundList,
          config: res.data.body
        });
      },
    });
  },
  onShow() {
    my.getStorage({
      key: 'enterTimes',
      success: (res) => {
        if (res.data > 4) {
          this.setData({
            hidden: true
          })
        }
        if (res.data === null) {
          my.setStorage({
            key: 'enterTimes',
            data: 1
          });
        } else {
          my.setStorage({
            key: 'enterTimes',
            data: res.data + 1
          });
        }
      }
    });

  },
    goToHome(){
      my.navigateTo({
        url:'alipays://platformapi/startapp?appId=60000148&appClearTop=false&startMultApp=YES&showOptionMenu=NO&transparentTitle=auto&transparentTitleTextAuto=YES&url=%2Fwww%2Fshop.html%3Fpid%3D2088801142198792'
      });
    }
});

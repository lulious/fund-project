import { formatDate } from '../../utils';
const ATTACK_IMG_OBJ = {
  activeImgSrc: 'https://dollarcdn.cdollar.cn/gffund/zhihuisuo/jingong-click.png',
  imgSrc: 'https://dollarcdn.cdollar.cn/gffund/zhihuisuo/jingong-noclick.png'
}
const STRADDLE_IMG_OBJ = {
  activeImgSrc: 'https://dollarcdn.cdollar.cn/gffund/zhihuisuo/guanwang-click.png',
  imgSrc: 'https://dollarcdn.cdollar.cn/gffund/zhihuisuo/guanwang-noclick.png'
}
const GUARD_IMG_OBJ = {
  activeImgSrc: 'https://dollarcdn.cdollar.cn/gffund/zhihuisuo/fangshou-click.png',
  imgSrc: 'https://dollarcdn.cdollar.cn/gffund/zhihuisuo/fangshou-noclick.png'
}
Component({
  data: {
    // topImgSrc: '',
    bottomImgSrc: '',
    height: '100%',
    active: 0,
    config: null,
    list: null
  },

  didUpdate(prevProps, prevData) {
    const { type, info, list } = this.props;
    const { endDate, startDate } = info;
    let bottomImgSrc;
    if (type === 'attack') {
      bottomImgSrc = 'https://dollarcdn.cdollar.cn/gffund/zhihuisuo/jingong-middle-2.jpg';
    } else if (type === 'straddle') {
      bottomImgSrc = 'https://dollarcdn.cdollar.cn/gffund/zhihuisuo/guanwang-middle-2.jpg';
    } else {
      bottomImgSrc = 'https://dollarcdn.cdollar.cn/gffund/zhihuisuo/fangshou-middle-2.jpg';
    }
    this.setData({
      config: info,
      bottomImgSrc: bottomImgSrc,
      time: `${formatDate(startDate)}-${formatDate(endDate)}`
    });

    this.setBgHeight();

    if (prevProps.list !== this.props.list) {
      const temp = list.map(item => {
        if (item.state === 'attack') {
          return {
            title: item.title,
            type: item.type,
            ...ATTACK_IMG_OBJ
          }
        } else if (item.state === 'guard') {
          return {
            title: item.title,
            type: item.type,
            ...GUARD_IMG_OBJ
          }
        } else {
          return {
            title: item.title,
            type: item.type,
            ...STRADDLE_IMG_OBJ
          }
        }
      })
      this.setData({
        list: temp
      })
    }
  },
  methods: {
    handleTap(e) {
      const active = e.target.dataset.active;
      this.setData({
        active: active
      });
      this.props.onSetActive(active);
    },
    setBgHeight() {
      // 获取bottomImgSrc区域高度
      const rect = my.createSelectorQuery().select('#week_info').boundingClientRect();
      rect.exec(res => {
        this.setData({
          height: res[0].height + 'px'
        })
      });
    },
  }
})
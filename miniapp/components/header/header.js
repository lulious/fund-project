Component({
  data: {
    imgSrc: ''
  },
  didUpdate() {
    const { type } = this.props;
    let imgSrc;
    if (type === 'attack') {
      imgSrc = '../../images/jingong-top.jpg';
    } else if (type === 'straddle') {
      imgSrc = '../../images/guanwang-top.jpg';
    } else {
      imgSrc = '../../images/fangshou-top.jpg'
    }
    this.setData({
      imgSrc: imgSrc
    });
  }
})
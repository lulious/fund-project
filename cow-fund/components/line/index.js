import F2 from '@antv/my-f2';
import util from '../../utils';

function render(chart, props, width, height, context) {
  const { categories, series, xAxis, yAxis, legend } = props;

  chart.clear();

  let data = [];
  if (series.length === 1) {
    data = series[0].data.map((item, i) => {
      return {
        key: categories[i],
        value: item,
        type: series[0].type,
      }
    });
  }
  else if (series.length > 1) {
    series.forEach(kind => {
      data = data.concat(kind.data.map((item, i) => {
        return {
          key: categories[i],
          value: item,
          type: kind.type,
        };
      }));
    });
  }
  context.setData({
    fundName: series[1].type
  })
  chart.source(data);

  if (xAxis) {
    if (xAxis.htAlign) {
      xAxis.label = util.label;
    }
    chart.scale('key', util.scale(xAxis));
    chart.axis('key', util.axis(xAxis));
  }
  if (yAxis) {
    chart.scale('value', util.scale(yAxis));
    chart.axis('value', util.axis(yAxis));
    chart.axis('value', {
      label: function label(text) {
        return {
          text: text + '%'
        }
      }
    })
  }
  chart.tooltip({
    custom: true, // 自定义 tooltip 内容框
    onChange: function(obj) {
      console.log(obj)
      const tooltipItems = obj.items;
      let sim = tooltipItems[0].value;
      let real = tooltipItems[1].value;
      if (Number(sim) > 0) {
        sim = {
          value: '+' + sim + '%',
          color: '#FF3847'
        }
      } else {
        sim = {
          value: sim + '%',
          color: '#01BA7C'
        }
      }
      if (Number(real) > 0) {
        real = {
          value: '+' + real + '%',
          color: '#FF3847'
        }
      } else {
        real = {
          value: real + '%',
          color: '#01BA7C'
        }
      }
      context.setData({
        fund: {
          simValue: sim,
          realValue: real,
        },
        show: true
      })
    },
    onHide(tooltip) {
      context.setData({
        show: false
      })
    }
  });
  chart.legend(false);

  const style = {};
  series.forEach(kind => {
    style[kind.type] = kind.style;
  });
  const color = {};
  series.forEach(kind => {
    color[kind.type] = kind.color;
  });

  if (series.length === 1) {
    chart.line().position('key*value').color('type', type => {
      return color[type];
    }).shape('type', type => {
      return style[type] || 'line';
    });
    if (series[0].point) {
      chart.point().position('key*value').style(series[0].point);
    }
  }
  else if (series.length > 1) {
    chart.line().position('key*value').color('type', type => {
      return color[type];
    }).shape('type', type => {
      return style[type] || 'line';
    });
    let pointType = [];
    let pointStyle;
    series.forEach(kind => {
      if (kind.point) {
        pointType.push(kind.type);
        pointStyle = kind.point;
      }
    });
    if (pointType.length) {
      chart.point().position('key*value').color('type', type => {
        return color[type];
      }).size('type', v => {
        if (pointType.indexOf(v) === -1) {
          return 0;
        }
      }).style(pointStyle);
    }
  }

  chart.changeSize(width, height);
}

Component({
  data: {
    fund: null,
    fundName: null,
    show: false
  },
  props: {
    categories: [],
    series: [],
    xAxis: {
      tickCount: 3,
    },
    yAxis: {
      tickCount: 3
    },
    tooltip: false,
    legend: false
  },
  didMount() {
    my.call('getStartupParams', {}, (result) => {
      util.tracert('line', result.appId, result.url);
    });

    const id = `am-mc-line-${this.$id}`;
    const ctx = this.ctx = my.createCanvasContext(id);
    const canvas = this.canvas = new F2.Renderer(ctx);

    const pixelRatio = this.pixelRatio = my.getSystemInfoSync().pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);

    my.createSelectorQuery()
      .select(`#${id}`)
      .boundingClientRect()
      .exec(res => {
        if (!res || !res.length || !res[0]) {
          return;
        }
        const { width, height } = res[0];

        this.setData({
          width: width * pixelRatio,
          height: height * pixelRatio,
        }, () => {
          const { padding, appendPadding } = this.props;

          this.chart = new F2.Chart({
            el: canvas,
            width,
            height,
            padding,
            appendPadding,
          });

          render(this.chart, this.props, width, height, this);
        });
      });
  },
  didUpdate(prevProps, prevData) {
    const id = `am-mc-line-${this.$id}`;
    const pixelRatio = this.pixelRatio;
    if (prevProps !== this.props) {
      my.createSelectorQuery()
        .select(`#${id}`)
        .boundingClientRect()
        .exec(res => {
          if (!res || !res.length || !res[0]) {
            return;
          }
          const { width, height } = res[0];
          if (this.data.width !== width * pixelRatio || this.data.height !== height * pixelRatio) {
            this.ctx.scale(pixelRatio, pixelRatio);
          }

          this.setData({
            width: width * pixelRatio,
            height: height * pixelRatio,
          }, () => {
            render(this.chart, this.props, width, height, this);
          });
        });
    }

  },
  methods: {
    touchStart(e) {
      if (this.canvas) {
        this.canvas.emitEvent('touchstart', [e]);
      }
    },
    touchMove(e) {
      if (this.canvas) {
        this.canvas.emitEvent('touchmove', [e]);
      }
    },
    touchEnd(e) {
      if (this.canvas) {
        this.canvas.emitEvent('touchend', [e]);
      }
    }
  },
});
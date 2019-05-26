export const CodeToCN = {
  "j1z": "近一周收益率",
  "j1y": "近一月收益率",
  "j3y": "近三月收益率",
  "j6y": "近六月收益率",
  "j1n": "近一年收益率",
  "j2n": "近两年收益率",
  "j3n": "近三年收益率",
  "j5n": "近五年收益率",
  "jnl": "今年以来收益率",
  "cll": "成立以来收益率",
  "zf": "日收益率",
  "qrnh": "七日年化收益率"
}

export function formatRate(num, dimension) {
  let res = num;
  if (dimension === 'qrnh') {
    res = res.toFixed(4);
  } else {
    res = res.toFixed(2);
  }
  if (num > 0) {
    res = '+' + res + '%';
  } else {
    res = res + '%';
  }
  return res;
}

function scale(obj) {
  let key = ['range', 'tickCount', 'max', 'min', 'mask', 'type', 'nice', 'ticks'];
  let res = {};
  for(let i = 0; i < key.length; i++) {
    let k = key[i];
    if(obj.hasOwnProperty(k)) {
      res[k] = obj[k];
    }
  }
  return res;
}

function axis(obj) {
  let key = ['label', 'line', 'grid'];
  let res = {};
  for(let i = 0; i < key.length; i++) {
    let k = key[i];
    if(obj.hasOwnProperty(k)) {
      if(k === 'line' && obj[k] === true) {
        obj[k] = F2.Global._defaultAxis.line;
      }
      else if(k === 'grid' && obj[k] === true) {
        obj[k] = F2.Global._defaultAxis.grid;
      }
      res[k] = obj[k];
    }
  }
  return res;
}

function label(text, index, total) {
  const textCfg = {};
  if (index === 0) {
    textCfg.textAlign = 'left';
  }
  if (index === total - 1) {
    textCfg.textAlign = 'right';
  }
  return textCfg;
}

function tracert(type, appId, url) {
  my.call('remotelog', {
    type: 'monitor',
    bizType: 'FORTUNEAPP',
    logLevel: 2, // 1 - high, 2 - medium, 3 - low
    actionId: 'exposure',
    param1: url,
    param4: {
      chInfo: '',
      type,
      appId,
      url,
    },
    spmId: 'a945.b10625.c25441.d47746',
  });
}

export default {
  scale,
  axis,
  label,
  tracert,
};
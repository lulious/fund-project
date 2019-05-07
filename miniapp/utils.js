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

export function formatDate(date) {
  const mm = date.slice(4, 6);
  const dd = date.slice(6);
  const month = mm.slice(0, 1) === '0' ? mm.slice(1) : mm;
  const day = dd.slice(0, 1) === '0' ? dd.slice(1) : dd;
  return `${month}月${day}日`
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
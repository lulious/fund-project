/**项目1 接口 */
// import _axios from './index'
import axios from "axios";

const baseUrl = process.env.NODE_ENV == 'development' ?'https://www.mdollar.cn': 'https://www.cdollar.cn';

/* 创建一个话题 */
const createTopic = (form) => {
  const url = baseUrl + '/cxfund-alipay/godBackManager/createMarketTopic'
  // return _axios.post(url, form)
  return axios.post(url, form)
}
const insertCommandPost = (form) => {
  const url = baseUrl + '/gffund-alipay/commandPost/insertCommandPost'
  // return _axios.post(url, form)
  return axios.post(url, form)
}
const getInfo = () => {
  const url = baseUrl + '/gffund-alipay/commandPost/selectTitle'
  return axios.get(url)
}
const getForm = (id) => {
  const url = baseUrl + `/gffund-alipay/commandPost/selectCommandPost?periods=${id}`
  return axios.get(url)
}
const deleteTopic = (form) => {
  const url = baseUrl + '/gffund-alipay/commandPost/deleteTitle'
  return axios.post(url, form)
}
const publishTopic = (form) => {
  const url = baseUrl + '/gffund-alipay/commandPost/releaseInfo'
  return axios.post(url, form)
}
export default {
  createTopic,
  insertCommandPost,
  getInfo,
  getForm,
  deleteTopic,
  publishTopic
}
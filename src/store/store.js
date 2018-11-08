/**
 * Created by cz on 2018/8/15.
 */
export default {
  id: '', // 业务员Id
  qrzdId: '', // 二维码id不加密
  sendType: '', // 寄送方式
  navType: 1, // 首页类型(杂志、图书、电子读物)
  qrzdItemPackId: '', // 二维码Id
  magazineAge: [], // 杂志年龄选项
  magazineType: [], // 杂志类型选项
  bookAge: [], // 图书年龄选项
  bookType: [], // 图书类型选项
  shoppingcarMage: [], // 杂志添加购物车
  shoppingcarBook: [], // 图书添加购物车
  shoppingcarspyp: [], // 电子读物添加购物车
  accounts: 0, // 购物车选中价钱
  originalFee: 0, // 购物车原价
  total: 0, // 购物车选中数量
  total_amount: 0, // 付款成功价钱
  remark: '', // 订单留言
  address: '', // 订单选中地址
  child: '', // 订单选中孩子
  postageSum: '', // 杂志未满多少金额
  postage: '', // 杂志需要多少邮费
  postageSumBook: '', // 图书未满多少金额
  postageBook: '', // 图书需要多少邮费
  quantity: 0,
  schoolLevel: '', // 学校类型
  scroll: 0 // 滚动位置
}

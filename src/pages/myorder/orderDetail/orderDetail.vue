<template>
  <div class="order-detail">
    <header class="detail-header" :class="{'detail-finish': detailItem.tradeStatus === 14}">
      <span class="detail-status">{{ detailItem.tradeStatusName }}</span>
      <p class="detail-date">日<span class="yin">隐</span>期: <span>{{ detailItem.createdAt | timeFormat }}</span></p>
      <p class="detail-no">订单号: <span>{{ detailItem.no }}</span></p>
      <p class="detail-amount">总金额: <span>￥{{ detailItem.totalFee }}</span></p>
      <p class="detail-postage">运<span class="yin">隐</span>费: <span>￥{{ detailItem.deliveryFee }}</span></p>
      <p class="detail-actual">实付款: <span>￥{{ detailItem.receivables }}</span></p>
      <span class="detail-button pay-button" v-if="detail.magazinesTradeStatus === 1" @click="toPay">去付款</span>
      <span class="detail-button cancel-button" v-if="detail.magazinesTradeStatus === 1" @click="cancelOrder">取消订单</span>
      <span class="detail-button cancel-button" v-if="detail.tradeStatus > 4" @click="clickDeleteOrder">删除订单</span>
    </header>
    <!-- 杂志物流 -->
    <main class="detail-flow" @click="toLogistics(detail.logisticCodeMagazine, detail.shipperCodeMagazine, '刊物')" v-if="magaLogistic">
      <div class="flow-left">
        <img src="../../../assets/car-icon.png"/>
      </div>
      <div class="flow-right">
        <p>{{ magaLogistic.accept_station }}</p>
        <p>{{ magaLogistic.accept_time }}</p>
      </div>
    </main>
    <!-- 图书物流 -->
    <main class="detail-flow" @click="toLogistics(detail.logisticCode, detail.shipperCode, '图书')" v-if="bookLogistic">
      <div class="flow-left">
        <img src="../../../assets/car-icon.png"/>
      </div>
      <div class="flow-right">
        <p>{{ bookLogistic.accept_station }}</p>
        <p>{{ bookLogistic.accept_time }}</p>
      </div>
    </main>
    <!-- 杂志地址 -->
    <main class="detail-address" v-if="detail.magAddress">
      <div class="address-left">
        <img src="../../../assets/location-icon.png"/>
      </div>
      <div class="address-right">
        <p><span class="address-name">{{ detail.magAddress.name }}</span><span class="address-phone">{{ detail.magAddress.mobile }}</span></p>
        <p>{{ detail.magAddress.addess }}</p>
      </div>
    </main>
    <!-- 杂志孩子 -->
    <!--<main class="detail-address" v-if="detail.childName">-->
      <!--<div class="address-left">-->
        <!--<img src="../../../assets/location-icon.png"/>-->
      <!--</div>-->
      <!--<div class="address-right">-->
        <!--<p><span class="address-name">{{ detail.childName }}</span><span class="address-phone">{{ detail.childMobile }}</span></p>-->
        <!--<p>{{ detail.provinceName + detail.cityName + detail.regionName + detail.schoolName + detail.gradeName }}{{ detail.className || detail.classNameDef }}</p>-->
      <!--</div>-->
    <!--</main>-->
    <!-- 图书地址 -->
    <main class="detail-address" v-if="detail.bookAddress">
      <div class="address-left">
        <img src="../../../assets/location-icon.png"/>
      </div>
      <div class="address-right">
        <p><span class="address-name">{{ detail.bookAddress.name }}</span><span class="address-phone">{{ detail.bookAddress.mobile }}</span></p>
        <p>{{ detail.bookAddress.addess }}</p>
      </div>
    </main>
    <div class="leave-massage" v-if="detail.userRemark">
      <p>{{ detail.userRemark }}</p>
    </div>
    <div class="detail-list" v-if="magaList.length > 0">
      <p class="detail-title">
        刊物
        <span>{{ magaStatusName }}</span>
      </p>
      <ul>
        <li :class="{'refunded-icon': item.refundStatus === 3}" v-for="item in magaList" :key="item.id">
          <div class="detail-left">
            <img :src="item.logo"/>
          </div>
          <div class="detail-right">
            <p class="detail-name">{{ item.name }}</p>
            <p class="detail-price">￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}</p>
            <span class="refunding-button" v-if="item.refundStatus === 1">退款中...</span>
            <span class="refuse-refund" v-if="item.refundStatus === 2">拒绝退款</span>
            <span class="detail-quantity">{{ item.quantity }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="detail-list" v-if="bookList.length > 0">
      <p class="detail-title">
        图书
        <span>{{ bookStatusName }}</span>
        <span class="refund-button" v-if="detail.booksTradeStatus === 2 && detail.booksTradeStatus !== 7" @click="applyRefund">申请退款</span>
        <span class="refund-button" v-if="bookStatusName === '已发货'" @click="getConfirm">确认收货</span>
      </p>
      <ul>
        <li :class="{'refunded-icon': item.refundStatus === 3}" v-for="item in bookList" :key="item.id">
          <div class="detail-left">
            <img :src="item.logo"/>
          </div>
          <div class="detail-right">
            <p class="detail-name">{{ item.name }}</p>
            <p class="detail-price">￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}</p>
            <span class="detail-quantity">{{ item.quantity }}</span>
            <span class="refuse-refund" v-if="item.refundStatus === 2">拒绝退款</span>
            <span class="refunding-button" v-if="item.refundStatus === 1">退款中...</span>
            <span class="cancel-refund" v-if="item.refundStatus === 1" @click="cancelRefund(item)">取消退款</span>
            <p class="refund-content" v-if="item.refundStatus > 0 && item.refundStatus !== 2">
              <span>退款原因: </span>
              <span :class="{'no-refund': item.refundStatus !== 3}">{{ item.refundReason }}</span>
            </p>
            <p class="refund-content"  v-if="item.refundStatus > 0 && item.refundStatus !== 2">
              <span>退款说明: </span>
              <span :class="{'no-refund': item.refundStatus !== 3}">{{ item.refundNote | cutString(isCut) }}
                <span v-if="item.refundNote.length > 20" class="if-show" @click="isCut = !isCut">{{ isCut ? '查看全部' : '收起' }}
                  <img v-if="!isCut" src="../../../assets/order/up-icon.png">
                  <img v-if="isCut" src="../../../assets/order/down-icon.png">
                </span>
              </span>
            </p>
            <span class="detail-quantity">{{ item.quantity }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="detail-list" v-if="spypList.length > 0">
      <p class="detail-title">电子读物
        <span>{{ spypStatusName }}</span>
      </p>
      <ul>
        <li v-for="item in spypList" :key="item.id" @click="toApp">
          <div class="detail-left">
            <img :src="item.logo"/>
          </div>
          <div class="detail-right">
            <p class="detail-name">{{ item.name }}</p>
            <p class="detail-price">￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order-detail',
  components: {},
  data () {
    return {
      iosDownload: 'https://itunes.apple.com/us/app/wei-xiao-wang/id885798822?l=zh&ls=1&mt=8',
      androidDownload: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.hzxuanma.wwwdr',
      detailItem: JSON.parse(this.$route.query.item),
      isCut: true,
      detail: {},
      magaStatusName: '',
      bookStatusName: '',
      spypStatusName: '',
      magaList: [],
      bookList: [],
      spypList: [],
      magaLogistic: '',
      bookLogistic: ''
    }
  },
  created () {
    this.loadMyOrderDeteil()
    this.loadTradeListDetail()
  },
  methods: {
    loadMyOrderDeteil () {
      this.$axios.myOrderDeteil(this.detailItem.id).then(res => {
        if (res.data.code === '0') {
          this.detail = res.data.data
          if (res.data.data.shipperCode && res.data.data.logisticCode) {
            this.loadBookTradeExpress()
          }
          if (res.data.data.shipperCodeMagazine && res.data.data.logisticCodeMagazine) {
            this.loadMagaTradeExpress()
          }
        } else {
          this.Toast.fail({title: res.data.msg})
        }
      }, err => {
        this.Toast.fail({title: err})
      }).catch(err => {
        this.Toast.fail({title: err})
      })
    },
    loadMagaTradeExpress () {
      this.$axios.tradeExpress({
        logistic_code: this.detail.logisticCodeMagazine, // 单号
        shipper_code: this.detail.shipperCodeMagazine // 运营商
      }).then(res => {
        if (res.data.result.status === '0') {
          this.magaLogistic = res.data.expressList[0]
        } else {
          this.Toast.fail({title: res.data.result.msg})
        }
      }, err => {
        this.Toast.fail({title: err})
      })
    },
    loadBookTradeExpress () {
      this.$axios.tradeExpress({
        logistic_code: this.detail.logisticCode, // 单号
        shipper_code: this.detail.shipperCode // 运营商
      }).then(res => {
        if (res.data.result.status === '0') {
          this.bookLogistic = res.data.expressList[0]
        } else {
          this.Toast.fail({title: res.data.result.msg})
        }
      }, err => {
        this.Toast.fail({title: err})
      })
    },
    loadTradeListDetail () {
      this.$axios.tradeListDetail(this.detailItem.id).then(res => {
        if (res.data.code === '0') {
          this.magaStatusName = res.data.data.magazineTypeTradeStatusName
          this.bookStatusName = res.data.data.bookTypeTradeStatusName
          this.spypStatusName = res.data.data.packetTypeTradeStatusName
          this.magaList = res.data.data.magazines
          this.bookList = res.data.data.books
          this.spypList = res.data.data.packets
        } else {
          this.Toast.fail({title: res.data.msg})
        }
      }, err => {
        this.Toast.fail({title: err})
      }).catch(err => {
        this.Toast.fail({title: err})
      })
    },
    cancelRefund (item) {
      this.$axios.refundCancel({id: item.id}).then(res => {
        if (res.data.code === '0') {
          this.Toast.success({
            title: '操作成功'
          })
          this.loadTradeListDetail()
        } else {
          this.Toast.warning({
            title: res.data.msg
          })
        }
      }, err => {
        this.Toast.fail({title: err})
      }).catch(err => {
        this.Toast.fail({title: err})
      })
    },
    cancelOrder () {
      this.$axios.cancelOrder({id: this.detailItem.id}).then(res => {
        if (res.data.code === '0') {
          this.Toast.success({
            title: '操作成功'
          })
          this.loadMyOrderDeteil()
          this.loadTradeListDetail()
        } else {
          this.Toast.fail({title: res.data.msg})
        }
      }, err => {
        this.Toast.fail({title: err})
      }).catch(err => {
        this.Toast.fail({title: err})
      })
    },
    toPay () {
      this.$router.push({
        path: '/pay',
        query: {
          no: this.detailItem.no,
          total: this.detailItem.receivables,
          cls: 55
        }
      })
    },
    toApp () {
      if (this.detailItem.tradeStatus !== 2) return
      this.Dialog.alert({
        title: '温馨提示',
        msg: '已购电子读物请到【校网APP】-【我的】-【我的电子读物】内查询收听'
      }, res => {
        if (res.buttonIndex === 2) {
          if (this.isIos) {
            window.location.href = this.iosDownload
          } else {
            window.location.href = this.androidDownload
          }
        }
      })
    },
    applyRefund () {
      this.$router.push({
        path: '/refundList',
        query: {
          tradeId: this.detailItem.id,
          cls: 2
        }
      })
    },
    getConfirm () {
      this.$axios.tradeTakeover({id: this.detailItem.id}).then(res => {
        if (res.data.code === '0') {
          this.Toast.success({title: '操作成功!'})
          setTimeout(() => {
            this.loadMyOrderDeteil()
            this.loadTradeListDetail()
          }, 1000)
        } else {
          this.Toast.fail({title: res.data.msg})
        }
      }, err => {
        this.Toast.fail({title: err})
      }).catch(err => {
        this.Toast.fail({title: err})
      })
    },
    clickDeleteOrder () {
      this.Dialog.alert({
        title: '温馨提示',
        msg: '您确定要删除吗'
      }, res => {
        if (res.buttonIndex === 2) {
          this.$axios.tradeDel({id: this.detailItem.id}).then(res => {
            if (res.data.code === '0') {
              setTimeout(() => {
                this.$router.push({path: '/myOrder'})
                this.Toast.success({
                  title: '操作成功'
                })
              }, 1000)
            } else {
              this.Toast.fail({title: res.data.msg})
            }
          }, err => {
            this.Toast.fail({title: err})
          }).catch(err => {
            this.Toast.fail({title: err})
          })
        }
      })
    },
    toLogistics (logisticCode, shipperCode, type) {
      this.$router.push({
        path: '/Logistics',
        query: {
          logistic_code: logisticCode,
          shipper_code: shipperCode,
          type: type
        }
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './orderDetail.styl'
</style>

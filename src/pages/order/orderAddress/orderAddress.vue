<template>
  <div class="order-address">
    <div class="order-head" @click.stop="toAddressList()">
      <div class="border-bg"></div>
      <div class="order-address">
        <div class="order-address-left" v-if="!AddressNull">
          <p class="address-info">
            <span class="address-name">{{ address.name }}</span>
            <span class="address-phone">{{ address.phone }}</span>
          </p>
          <p class="address-content">{{ address.address }}</p>
        </div>
        <div class="order-address-left" v-if="AddressNull">
        <p class="not-choose-address">您还没有选择地址</p>
        </div>
        <div class="order-address-right">
          <img src="../../../assets/address-link-icon.png"/>
        </div>
      </div>
      <div class="border-bg"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    address: {
      type: Object
    },
    type: {
      type: String
    }
  },
  data () {
    return {
      AddressNull: JSON.stringify(this.address) === '{}'
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    toAddressList () {
      if (this.type === 'home') {
        this.$router.push({
          path: '/homeAddress'
        })
      } else if (this.type === 'school') {
        this.$router.push({
          path: '/schoolAddress'
        })
      }
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './orderAddress.styl'
</style>

<template>
  <div class="solicit-subscription-magazine">
    <header class="magazine-seek">
      <p @click="toAgelist"><span>{{ ageContent }}</span><img src="../../../assets/pull-down-icon.png"></p>
      <p @click="toTypelist"><span>{{ typeContent }}</span><img src="../../../assets/pull-down-icon.png"></p>
    </header>
    <ul class="magazine-list">
      <li v-for="(item, index) in lists" :key="index" @click="todDetail(item)">
        <div class="picture">
          <img :src="item.logo">
        </div>
        <div class="content">
          <p class="title">{{ item.name }}</p>
          <p class="ageName">{{ item.ageName }}</p>
          <p class="units" v-if="item.feeUnitNum">{{ item.feeUnitTypeName + item.feeUnitNum + item.feeUnitName }}</p>
          <p class="gift" v-if="item.giftName">
            <img src="../../../assets/gift-icon.png">
            {{ item.giftName }}
          </p>
          <p class="amount">
            <img @click.stop="onReduce(item)" v-if="item.quantity > 0" src="../../../assets/minus-icon.png">
            <span v-if="item.quantity > 0">{{ item.quantity }}</span>
            <img @click.stop="onAdd(item)" src="../../../assets/add-icon.png">
          </p>
          <p class="price">￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}</p>
        </div>
      </li>
    </ul>
    <p class="noContent" v-if="lists.length === 0">暂无内容</p>
  </div>
</template>

<script>
import store from '@/store/store.js'
export default {
  name: 'solicit-subscription-magazine',
  data () {
    return {
      ageContent: '年级区间',
      typeContent: '杂志类别'
    }
  },
  props: {
    lists: {
      type: Array
    }
  },
  mounted () {
    this.setMagazineAge()
    this.setMagazineType()
  },
  methods: {
    setMagazineAge () {
      if (store.magazineAge.length > 0) {
        let str = ''
        store.magazineAge.forEach((item, index) => {
          if (index > 0) {
            str += ','
          }
          str += item.name
        })
        this.ageContent = str
      }
    },
    setMagazineType () {
      if (store.magazineType.length > 0) {
        let str = ''
        store.magazineType.forEach((item, index) => {
          if (index > 0) {
            str += ','
          }
          str += item.name
        })
        this.typeContent = str
      }
    },
    toAgelist () {
      this.$router.push({
        path: '/ageList',
        query: {
          name: 'maga'
        }
      })
    },
    toTypelist () {
      this.$router.push({
        path: '/typeList',
        query: {
          name: 'maga'
        }
      })
    },
    onReduce (item) {
      store.quantity -= 1
      item.quantity -= 1
      store.shoppingcarMage.forEach((obj, index) => {
        if (item.id === obj.id) {
          if (item.quantity === 0) {
            store.shoppingcarMage.splice(index, 1)
          } else {
            obj.quantity = item.quantity
          }
        }
      })
    },
    onAdd (item) {
      store.quantity += 1
      let exist = false
      if (store.shoppingcarMage.length > 0) {
        store.shoppingcarMage.forEach(obj => {
          if (item.id === obj.id) {
            item.quantity = obj.quantity
            item.quantity += 1
            exist = true
            obj.quantity = item.quantity
          }
        })
        if (!exist) {
          item.quantity += 1
          store.shoppingcarMage.push(item)
        }
      } else {
        item.quantity += 1
        store.shoppingcarMage.push(item)
      }
    },
    todDetail (item) {
      this.$router.push({
        path: '/magaDetail',
        query: {
          item: JSON.stringify(item)
        }
      })
    }
  },
  watch: {
    ageContent () {
      let ageArr = []
      store.magazineAge.forEach(item => {
        ageArr.push(item.id)
      })
      this.$emit('ageChange', ageArr.join(','))
    },
    typeContent () {
      let typeArr = []
      store.magazineType.forEach(item => {
        typeArr.push(item.id)
      })
      this.$emit('typeChange', typeArr.join(','))
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './magazine.styl'
</style>

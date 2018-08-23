<template>
  <div class="add-home-address">
    <ul>
      <li>
        <input type="text" v-model="form.name" placeholder="请输入收货人姓名">
        <span>姓名</span>
      </li>
      <li>
        <input type="text" v-model="form.mobile" placeholder="请输入您的手机号">
        <span>手机</span>
      </li>
      <li>
        <img src="../../../../assets/link-icon.png"/>
        <p @click="onInputClick">{{ address || '请选择地区' }}</p>
        <span>省市区</span>
      </li>
      <li>
        <p contenteditable="true" placeholder="请输入您的详细地址" v-html="form.address" ref="textarea"></p>
        <span>地址</span>
      </li>
    </ul>
    <div class="submit" @click="onSubmit()">完成</div>
  </div>
</template>

<script>
import Picker from 'better-picker'
export default {
  name: '',
  data () {
    return {
      cityIndex: 0,
      picker: '',
      provinces: [],
      cities: [],
      areas: [],
      address: '',
      form: {
        name: '',
        mobile: '',
        provinceId: '',
        cityId: '',
        regionId: '',
        address: ''
      }
    }
  },
  computed: {
    dynamicCities: {
      get () {
        return [this.provinces, this.cities, this.areas]
      },
      set (items) {
        this.provinces.push({
          text: items.provinceName,
          value: items.provinceId
        })
        items.cities.forEach(item => {
          this.cities.push({
            text: item.cityName,
            value: item.cityId
          })
        })
        items.cities[this.cityIndex].regions.forEach(item => {
          this.areas.push({
            text: item.regionName,
            value: item.regionId
          })
        })
      }
    }
  },
  created () {
    this.loadAccountListarea()
  },
  mounted () {
  },
  methods: {
    loadAccountListarea () {
      this.$axios.accountListarea({id: localStorage.getItem('id')}).then(res => {
        if (res.data.code === '0') {
          this.dynamicCities = res.data.data.area
          this.$nextTick(() => {
            this.setPicker()
          })
        } else {
          console.log(res.data.data.msg)
        }
      }, err => {
        console.log(err)
      }).catch(err => {
        console.log(err)
      })
    },
    setPicker () {
      this.picker = new Picker({
        data: this.dynamicCities,
        selectedIndex: [0, 0, 0],
        title: '请选择地区'
      })
      this.picker.on('picker.select', (selectedVal, selectedIndex) => {
        this.form.cityId = selectedVal[1]
        this.form.provinceId = selectedVal[0]
        this.form.regionId = selectedVal[2]
        this.address = ''
        this.address += this.dynamicCities[0][selectedIndex[0]].text
        this.address += this.dynamicCities[1][selectedIndex[1]].text
        this.address += this.dynamicCities[2][selectedIndex[2]].text
      })
      this.picker.on('picker.change', (index) => {
        this.cityIndex = index
      })
    },
    onInputClick () {
      this.picker.show()
    },
    onSubmit () {
      this.form.address = this.$refs.textarea.innerHTML
      this.$axios.addressUpdate(this.form).then(res => {
        if (res.data.code === '0') {
          this.Toast.success({
            title: '操作成功'
          })
          this.$router.goBack()
        } else {
          this.Toast.fail({
            title: res.data.data.msg
          })
        }
      }, err => {
        this.Toast.fail({
          title: err
        })
      }).catch(err => {
        this.Toast.fail({
          title: err
        })
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './addHomeAddress.styl'
</style>

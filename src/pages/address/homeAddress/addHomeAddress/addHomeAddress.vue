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
        <p @click="showPicker">{{ cityArea || '请选择地区' }}</p>
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
import area from '../../../../../static/data/area.json'
export default {
  name: '',
  data () {
    return {
      cityIndex: 0,
      picker: '',
      data: area.result,
      tempIndex: [0, 0, 0],
      address: {},
      rules: {
        name: false,
        phone: false
      },
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
    // 动态城市选择数据
    linkageData () {
      let provinces = []
      let cities = []
      let areas = []
      this.data.forEach(item => {
        provinces.push({
          text: item.provincename,
          value: item.provinceid
        })
      })
      this.data[this.tempIndex[0]].citylist.forEach(item => {
        cities.push({
          text: item.cityname,
          value: item.cityid
        })
      })
      this.data[this.tempIndex[0]].citylist[this.tempIndex[1]].regionlist.forEach(item => {
        areas.push({
          text: item.regionname,
          value: item.regionid
        })
      })
      return [provinces, cities, areas]
    },
    // 省市区
    cityArea () {
      if (!this.address.provinceName) {
        return ''
      }
      return this.address.provinceName + ',' + this.address.cityName + ',' + this.address.regionName
    }
  },
  mounted () {
    // 初始化选择器
    this.address = {
      provinceName: '',
      cityName: '',
      regionName: ''
    }
    this.picker = new Picker({
      data: this.linkageData,
      selectedIndex: [0, 0, 0],
      title: '请选择地区'
    })
    // 选中
    this.picker.on('picker.select', (selectedVal, selectedIndex) => {
      this.form.cityId = selectedVal[1]
      this.form.provinceId = selectedVal[0]
      this.form.regionId = selectedVal[2]
      this.address.provinceName = this.linkageData[0][selectedIndex[0]].text
      this.address.cityName = this.linkageData[1][selectedIndex[1]].text
      this.address.regionName = this.linkageData[2][selectedIndex[2]].text
    })
    // 改变
    this.picker.on('picker.change', (index, selectedIndex) => {
      this.tempIndex[index] = selectedIndex
      if (index > 1) {
        return
      }
      if (index === 0) {
        this.tempIndex = [selectedIndex, this.tempIndex[1], this.tempIndex[2]]
      } else {
        this.tempIndex = [this.tempIndex[0], selectedIndex, this.tempIndex[2]]
      }
    })
  },
  methods: {
    // 展示城市列表
    showPicker () {
      this.picker.data = this.linkageData
      this.picker.show()
    },
    onSubmit () {
      this.form.address = this.$refs.textarea.innerHTML
      this.form.name = this.Trim(this.form.name)
      this.form.address = this.Trim(this.form.address)
      if (!this.rules.name) {
        this.Toast.warning({title: '请输入姓名'})
      } else if (!this.rules.phone) {
        this.Toast.warning({title: '请输入正确手机号'})
      } else if (this.form.regionId === '') {
        this.Toast.warning({title: '请选择省/市/区'})
      } else if (this.$refs.textarea.innerHTML === '') {
        this.Toast.warning({title: '请输入详细地址'})
      } else {
        this.$axios.addressUpdate(this.form).then(res => {
          if (res.data.code === '0') {
            this.Toast.success({
              title: '操作成功'
            })
            this.$router.goBack()
          } else {
            this.Toast.fail({
              title: res.data.msg
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
  },
  watch: {
    'form.name' (val) {
      let name = /^[\u4e00-\u9fa5]{0,}$/
      this.rules.name = name.test(val)
      if (!name.test(val)) {
        this.form.name = val.substring(0, 4)
      }
    },
    'form.mobile' (val) {
      this.rules.phone = false
      let phone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (val.length === 11) {
        this.rules.phone = phone.test(val)
      }
    },
    linkageData () {
      // 填充数据
      this.picker.refill(this.linkageData)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './addHomeAddress.styl'
</style>

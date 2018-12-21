<template>
  <div class="add-home-school">
    <ul class="address-list">
      <li class="input">
        <span class="lable">收件人</span>
        <input type="text" v-model="form.name" placeholder="请输入收件人姓名" />
      </li>
      <li class="input">
        <span class="lable">手机</span>
        <input type="text" v-model="form.mobile" placeholder="请输入收件人手机号" />
      </li>
      <li class="select">
        <span class="lable">省市区</span>
        <img src="../../../../assets/link-icon.png" />
        <p class="like-input"  @click="showPicker(1)">{{ cityArea || '请选择省市区' }}</p>
      </li>
      <li class="address">
        <span class="lable">地址</span>
        <p contenteditable="true" v-html="form.address" ref="textarea"></p>
      </li>
    </ul>
    <ul class="school-list">
      <li class="input">
        <span class="lable">学生姓名</span>
        <input type="text" v-model="schoolFrom.name" placeholder="请输入收件人姓名" />
      </li>
      <li class="select">
        <span class="lable">地区</span>
        <img src="../../../../assets/link-icon.png" />
        <p class="like-input" @click="showPicker(2)">{{ schoolCityArea || '请选择省市区' }}</p>
      </li>
      <li class="select">
        <span class="lable">学校</span>
        <img src="../../../../assets/link-icon.png" />
        <p class="like-input" @click="onCheckSchool">{{ schoolName || '请选择学校' }}</p>
      </li>
      <li class="select">
        <span class="lable">年级</span>
        <img src="../../../../assets/link-icon.png" />
        <p class="like-input" @click="onCheckGrade">{{ gradeName || '请选择孩子当前就读年级' }}</p>
      </li>
      <li class="class-name">
        <span class="lable">选填班级</span>
        <img v-if="!isSelectClass" class="select-icon" src="../../../../assets/check-icon.png" @click="isSelectClass = !isSelectClass" />
        <img v-if="isSelectClass" class="select-icon" src="../../../../assets/checked-icon.png" @click="isSelectClass = !isSelectClass" />
        <img class="link-icon" src="../../../../assets/link-icon.png" />
        <p class="like-input" @click="onCheckClass">{{ className || '请选择孩子当前就读班级' }}</p>
      </li>
      <li class="class-name">
        <span class="lable">自填班级</span>
        <img v-if="isSelectClass" class="select-icon" src="../../../../assets/check-icon.png" @click="isSelectClass = !isSelectClass" />
        <img v-if="!isSelectClass" class="select-icon" src="../../../../assets/checked-icon.png" @click="isSelectClass = !isSelectClass" />
        <input type="text" placeholder="请输入班级名称" v-model="schoolFrom.className" :disabled="isSelectClass"/>
      </li>
    </ul>
    <div class="footer">
      <span class="cancel" @click="onCancel">取消</span>
      <span class="submit" @click="onSubmit">完成</span>
    </div>
  </div>
</template>

<script>
import Picker from 'better-picker'
import store from '@/store/store.js'
export default {
  name: 'add-home-school',
  data () {
    return {
      isSelectClass: true,
      tempIndex: [0, 0, 0],
      schoolAddress: {
        provinceName: '',
        cityName: '',
        regionName: ''
      },
      addressType: 1,
      schoolList: [],
      schoolName: '',
      gradeList: [],
      gradeName: '',
      classList: [],
      className: '',
      areaPicker: '',
      address: {
        provinceName: store.address.provinceName || '',
        cityName: store.address.cityName || '',
        regionName: store.address.regionName || ''
      },
      picker: '',
      data: [],
      rules: {
        name: false,
        phone: false
      },
      form: {
        id: store.address.id || '',
        name: store.address.name || '',
        mobile: store.address.mobile || '',
        provinceId: store.address.provinceId || '',
        cityId: store.address.cityId || '',
        regionId: store.address.regionId || '',
        address: store.address.address || ''
      },
      schoolFrom: {
        provinceId: '', // 省
        cityId: '', // 市
        regionId: '', // 区
        schoolId: '', // 学校id
        gradeId: '', // 年级
        classId: '', // 班级id
        className: '', // 自定义班级名称
        name: '' // 孩子姓名
      }
    }
  },
  created () {
  },
  mounted () {
    this.loadAccountListarea()
    this.loadGradeList()
    this.loadClassList()
  },
  computed: {
    // 动态城市选择数据
    linkageData () {
      let provinces = []
      let cities = []
      let areas = []
      this.data.forEach(item => {
        provinces.push({
          text: item.provinceName,
          value: item.provinceId
        })
      })
      this.data[this.tempIndex[0]].cities.forEach(item => {
        cities.push({
          text: item.cityName,
          value: item.cityId
        })
      })
      this.data[this.tempIndex[0]].cities[this.tempIndex[1]].regions.forEach(item => {
        areas.push({
          text: item.regionName,
          value: item.regionId
        })
      })
      return [provinces, cities, areas]
    },
    cityArea () {
      if (!this.address.provinceName) {
        return ''
      }
      return this.address.provinceName + ',' + this.address.cityName + ',' + this.address.regionName
    },
    schoolCityArea () {
      if (!this.schoolAddress.provinceName) {
        return ''
      }
      return this.schoolAddress.provinceName + ',' + this.schoolAddress.cityName + ',' + this.schoolAddress.regionName
    }
  },
  methods: {
    loadAccountListarea () {
      this.$axios.accountListarea({id: localStorage.getItem('createId')}).then(res => {
        if (res.data.code === '0') {
          this.data = [res.data.data.area]
          this.setPicker()
        } else {
          this.Toast.fail({title: res.data.msg})
        }
      }, err => {
        this.Toast.fail({title: err})
      }).catch(err => {
        this.Toast.fail({title: err})
      })
    },
    setPicker () {
      this.areaPicker = new Picker({
        data: this.linkageData,
        selectedIndex: [0, 0, 0],
        title: '请选择地区'
      })
      this.areaPicker.on('picker.select', (selectedVal, selectedIndex) => {
        if (this.addressType === 1) {
          this.form.cityId = selectedVal[1]
          this.form.provinceId = selectedVal[0]
          this.form.regionId = selectedVal[2]
          this.address.provinceName = this.linkageData[0][selectedIndex[0]].text
          this.address.cityName = this.linkageData[1][selectedIndex[1]].text
          this.address.regionName = this.linkageData[2][selectedIndex[2]].text
        } else {
          this.schoolFrom.cityId = selectedVal[1]
          this.schoolFrom.provinceId = selectedVal[0]
          this.schoolFrom.regionId = selectedVal[2]
          this.schoolAddress.provinceName = this.linkageData[0][selectedIndex[0]].text
          this.schoolAddress.cityName = this.linkageData[1][selectedIndex[1]].text
          this.schoolAddress.regionName = this.linkageData[2][selectedIndex[2]].text
        }
      })
      this.areaPicker.on('picker.change', (index, selectedIndex) => {
        this.tempIndex[index] = selectedIndex
        if (index > 1) {
          return
        }
        if (index === 0) {
          this.tempIndex = [selectedIndex, this.tempIndex[1], this.tempIndex[2]]
        } else {
          this.tempIndex = [this.tempIndex[0], selectedIndex, this.tempIndex[2]]
        }
        this.picker.refill(this.linkageData)
      })
    },
    showPicker (type) {
      this.areaPicker.data = this.linkageData
      this.addressType = type
      this.areaPicker.show()
    },
    loadSchoolList () {
      let params = {
        schoolLevel: store.schoolLevel,
        adminId: localStorage.getItem('createId'),
        regionId: this.schoolFrom.regionId
      }
      this.$axios.schoolList(params).then(res => {
        if (res.data.code === '0') {
          this.schoolList = []
          res.data.data.forEach(item => {
            this.schoolList.push({
              level: item.isHighGrade,
              text: item.schoolName,
              value: item.schoolId
            })
          })
        } else {
          this.Toast.fail({title: res.data.msg})
        }
      }, err => {
        this.Toast.fail({title: err})
      }).catch(err => {
        this.Toast.fail({title: err})
      })
    },
    loadGradeList () {
      this.$axios.gradeList().then(res => {
        if (res.data.code === '0') {
          res.data.data.forEach(item => {
            this.gradeList.push({
              text: item.name,
              value: item.id
            })
          })
        } else {
          this.Toast.fail({title: res.data.msg})
        }
      }, err => {
        this.Toast.fail({title: err})
      }).catch(err => {
        this.Toast.fail({title: err})
      })
    },
    loadClassList () {
      this.$axios.schclassList().then(res => {
        if (res.data.code === '0') {
          res.data.data.forEach(item => {
            this.classList.push({
              text: item.name,
              value: item.id
            })
          })
        } else {
          this.Toast.fail({title: res.data.msg})
        }
      }, err => {
        this.Toast.fail({title: err})
      }).catch(err => {
        this.Toast.fail({title: err})
      })
    },
    onCheckSchool () {
      if (this.schoolFrom.regionId === '') {
        this.Toast.warning({
          title: '清先选择地区'
        })
      } else {
        this.picker = new Picker({
          data: [this.schoolList],
          selectedIndex: 0,
          title: '请选择学校'
        })
        this.picker.on('picker.select', (selectedVal, selectedIndex) => {
          this.schoolFrom.schoolId = selectedVal[0]
          this.schoolName = this.schoolList[selectedIndex].text
        })
        this.picker.show()
      }
    },
    onCheckGrade () {
      this.picker = new Picker({
        data: [this.gradeList],
        selectedIndex: 0,
        title: '请选择年级'
      })
      this.picker.on('picker.select', (selectedVal, selectedIndex) => {
        this.schoolFrom.gradeId = selectedVal[0]
        this.gradeName = this.gradeList[selectedIndex].text
      })
      this.picker.show()
    },
    onCheckClass () {
      if (!this.isSelectClass) return
      this.picker = new Picker({
        data: [this.classList],
        selectedIndex: 0,
        title: '请选择班级'
      })
      this.picker.on('picker.select', (selectedVal, selectedIndex) => {
        this.schoolFrom.classId = selectedVal[0]
        this.className = this.classList[selectedIndex].text
      })
      this.picker.show()
    },
    onSubmit () {
      this.form.address = this.$refs.textarea.innerHTML
      this.form.name = this.Trim(this.form.name)
      this.form.address = this.Trim(this.form.address)
      let reg = /^[0-9]+.?[0-9]*$/
      if (this.form.name === '') {
        this.Toast.warning({title: '请输入姓名'})
      } else if (reg.test(this.form.name) || this.form.name.length > 12) {
        this.Toast.warning({title: '姓名不能为纯数字，名字最多十二位'})
      } else if (this.form.phone === '') {
        this.Toast.warning({title: '请输入手机号'})
      } else if (this.form.regionId === '') {
        this.Toast.warning({title: '请选择地址省/市/区'})
      } else if (this.$refs.textarea.innerHTML === '') {
        this.Toast.warning({title: '请输入详细地址'})
      } else if (this.schoolFrom.name === '') {
        this.Toast.warning({title: '请填写学生姓名'})
      } else if (this.schoolFrom.provinceId === '' || this.schoolFrom.cityId === '' || this.schoolFrom.regionId === '') {
        this.Toast.warning({title: '请选择孩子省/市/区'})
      } else if (this.schoolFrom.schoolId === '') {
        this.Toast.warning({title: '请选择学校'})
      } else if (this.schoolFrom.gradeId === '') {
        this.Toast.warning({title: '请选择年级'})
      } else {
        this.$axios.addressUpdate(this.form).then(res => {
          if (res.data.code === '0') {
            this.Toast.success({
              title: '操作成功'
            })
            store.address = {
              id: res.data.data.id,
              name: this.form.name,
              mobile: this.form.mobile,
              provinceName: this.address.provinceName,
              provinceId: this.form.provinceId,
              cityName: this.address.cityName,
              cityId: this.form.cityId,
              regionName: this.address.regionName,
              regionId: this.form.regionId,
              address: this.form.address
            }
            store.schoolFrom = this.schoolFrom
            this.$router.push({path: '/order'})
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
    },
    onCancel () {
      this.$router.go(-1)
    }
  },
  watch: {
    'schoolFrom.regionId' () {
      this.schoolName = ''
      this.form.schoolId = ''
      this.loadSchoolList()
    },
    isSelectClass (val) {
      if (val) {
        delete this.schoolFrom['className']
      } else {
        delete this.schoolFrom['classId']
        this.className = ''
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './addHomeAndSchool.styl'
</style>

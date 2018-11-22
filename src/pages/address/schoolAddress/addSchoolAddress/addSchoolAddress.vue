<template>
  <div class="add-child-address">
    <ul>
      <li class="item-list">
        <span class="item-title">姓名</span>
        <input class="item-content" type="text" placeholder="请输入孩子姓名" v-model="form.name">
      </li>
      <!--<li class="item-list">-->
        <!--<span class="item-title">性别</span>-->
        <!--<div class="item-content">-->
          <!--<div class="boy">-->
            <!--<img v-if="form.sex === 1" @click="form.sex = 0" src="../../../../assets/check-icon.png"/>-->
            <!--<img v-if="form.sex === 0" @click="form.sex = 1" src="../../../../assets/checked-icon.png"/>-->
            <!--<img src="../../../../assets/boy-icon.png"/>-->
            <!--<span>男</span>-->
          <!--</div>-->
          <!--<div class="gril">-->
            <!--<img v-if="form.sex === 0" @click="form.sex = 1" src="../../../../assets/check-icon.png"/>-->
            <!--<img v-if="form.sex === 1" @click="form.sex = 0" src="../../../../assets/checked-icon.png"/>-->
            <!--<img src="../../../../assets/girl-icon.png"/>-->
            <!--<span>女</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</li>-->
      <li class="item-list">
        <span class="item-title">地区</span>
        <img class="link-icon" src="../../../../assets/link-icon.png">
        <span class="item-content" @click="showPicker">{{ cityArea || '请选择地区' }}</span>
      </li>
      <li class="item-list">
        <span class="item-title">学校</span>
        <img class="link-icon" src="../../../../assets/link-icon.png">
        <span class="item-content" @click="onCheckSchool">{{ schoolName || '请选择学校' }}</span>
      </li>
      <li class="item-list">
        <span class="item-title">入学年份</span>
        <img class="link-icon" src="../../../../assets/link-icon.png">
        <span class="item-content" @click="onCheckEnrollment">{{ enrollmentName || '请选择孩子入学年份' }}</span>
      </li>
      <li class="item-list">
        <span class="item-title">年级</span>
        <img class="link-icon" src="../../../../assets/link-icon.png">
        <span class="item-content" @click="onCheckGrade">{{ gradeName || '请选择孩子当前就读年级' }}</span>
      </li>
      <li class="item-list">
        <span class="item-title">选填班级</span>
        <img class="checked" v-if="!isSelect" @click="isSelect = !isSelect" src="../../../../assets/check-icon.png"/>
        <img class="checked" v-if="isSelect" @click="isSelect = !isSelect" src="../../../../assets/checked-icon.png"/>
        <img class="link-icon" src="../../../../assets/link-icon.png">
        <span class="item-content" style="color: #F8BD48" @click="onCheckClass">{{ className || '请选择孩子当前就读年级' }}</span>
      </li>
      <li class="item-list">
        <span class="item-title">自填班级</span>
        <img class="checked" v-if="isSelect" @click="isSelect = !isSelect" src="../../../../assets/check-icon.png"/>
        <img class="checked" v-if="!isSelect" @click="isSelect = !isSelect" src="../../../../assets/checked-icon.png"/>
        <input class="item-content" type="text" placeholder="请输入班级名称" v-model="form.className" :disabled="isSelect">
      </li>
      <!--<li class="item-list">-->
        <!--<span class="item-title">家长</span>-->
        <!--<input class="item-content" type="text" placeholder="请输入家长姓名" v-model="form.parent">-->
      <!--</li>-->
      <li class="item-list">
        <span class="item-title">电话</span>
        <input class="item-content" type="text" placeholder="请输入孩子家长联系电话" v-model="form.mobile">
      </li>
      <!--<li class="item-list">-->
        <!--<span class="item-title">关系</span>-->
        <!--<img class="link-icon" src="../../../../assets/link-icon.png">-->
        <!--<span class="item-content" @click="onCheckRelation">{{ relationName || '请输入家长与孩子关系' }}</span>-->
      <!--</li>-->
    </ul>
    <div class="submit" @click="onSubmit()">完成</div>
  </div>
</template>

<script>
import Picker from 'better-picker'
import relation from '../../../../../static/data/relation.json'
import store from '@/store/store.js'
export default {
  name: 'add-child-address',
  data () {
    return {
      tempIndex: [0, 0, 0],
      areaPicker: '',
      address: {},
      picker: '',
      data: [],
      isSelect: true,
      enrollmentList: [],
      enrollmentName: '',
      schoolList: [],
      schoolName: '',
      gradeList: [],
      gradeName: '',
      classList: [],
      className: '',
      relationList: relation.relationList,
      relationName: '',
      rules: {
        phone: false
      },
      form: {
        uid: localStorage.getItem('userId'), // 用户id
        avatar: '', // 头像
        classId: '', // 班级id
        className: '', // 自定义班级名称
        enrollment: '', // 入学年份
        gradeId: '', // 年级
        isDefault: 0, // 默认选中
        mobile: '', // 电话
        name: '', // 孩子姓名
        parent: '家长', // 家长姓名
        relation: 0, // 关系
        schoolId: '', // 学校id
        sex: 0, // 性别 0: 男; 1: 女
        provinceId: '', // 省
        cityId: '', // 市
        regionId: '' // 区
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
    // 省市区
    cityArea () {
      if (!this.address.provinceName) {
        return ''
      }
      return this.address.provinceName + ',' + this.address.cityName + ',' + this.address.regionName
    }
  },
  created () {
    this.loadAccountListarea()
    this.setEnrollmentList()
    this.loadGradeList()
    this.loadClassList()
  },
  mounted () {
  },
  methods: {
    loadAccountListarea () {
      this.$axios.accountListarea({id: store.id}).then(res => {
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
      // 初始化选择器
      this.address = {
        provinceName: '',
        cityName: '',
        regionName: ''
      }
      this.areaPicker = new Picker({
        data: this.linkageData,
        selectedIndex: [0, 0, 0],
        title: '请选择地区'
      })
      // 选中
      this.areaPicker.on('picker.select', (selectedVal, selectedIndex) => {
        this.form.cityId = selectedVal[1]
        this.form.provinceId = selectedVal[0]
        this.form.regionId = selectedVal[2]
        this.address.provinceName = this.linkageData[0][selectedIndex[0]].text
        this.address.cityName = this.linkageData[1][selectedIndex[1]].text
        this.address.regionName = this.linkageData[2][selectedIndex[2]].text
      })
      // 改变
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
        this.areaPicker.refill(this.linkageData)
      })
    },
    showPicker () {
      this.areaPicker.data = this.linkageData
      this.areaPicker.show()
    },
    // 展示城市列表
    setEnrollmentList () {
      let thisYear = new Date().getFullYear()
      for (let i = thisYear; i > 1980; i--) {
        this.enrollmentList.push({
          text: i,
          value: i
        })
      }
    },
    loadSchoolList () {
      let params = {
        schoolLevel: store.schoolLevel,
        adminId: store.id,
        regionId: this.form.regionId
      }
      this.$axios.schoolList(params).then(res => {
        if (res.data.code === '0') {
          this.schoolList = []
          res.data.data.forEach(item => {
            this.schoolList.push({
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
    onCheckArea () {
      this.picker = new Picker({
        data: this.dynamicCities,
        selectedIndex: [0, this.cityIndex, 0],
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
      this.picker.show()
    },
    onCheckSchool () {
      if (this.form.regionId === '') {
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
          this.form.schoolId = selectedVal[0]
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
        this.form.gradeId = selectedVal[0]
        this.gradeName = this.gradeList[selectedIndex].text
      })
      this.picker.show()
    },
    onCheckClass () {
      if (!this.isSelect) return
      this.picker = new Picker({
        data: [this.classList],
        selectedIndex: 0,
        title: '请选择班级'
      })
      this.picker.on('picker.select', (selectedVal, selectedIndex) => {
        this.form.classId = selectedVal[0]
        this.className = this.classList[selectedIndex].text
      })
      this.picker.show()
    },
    onCheckRelation () {
      this.picker = new Picker({
        data: [this.relationList],
        selectedIndex: 0,
        title: '请选择关系'
      })
      this.picker.on('picker.select', (selectedVal, selectedIndex) => {
        this.form.relation = selectedVal[0]
        this.relationName = this.relationList[selectedIndex].text
      })
      this.picker.show()
    },
    onCheckEnrollment () {
      this.picker = new Picker({
        data: [this.enrollmentList],
        selectedIndex: 0,
        title: '请选择入学年份'
      })
      this.picker.on('picker.select', (selectedVal, selectedIndex) => {
        this.form.enrollment = selectedVal[0]
        this.enrollmentName = this.enrollmentList[selectedIndex].text
      })
      this.picker.show()
    },
    onSubmit () {
      this.form.name = this.Trim(this.form.name)
      if (this.form.name === '') {
        this.Toast.warning({title: '请输入姓名'})
      }
      if (!this.rules.phone) {
        this.Toast.warning({title: '请输入正确的手机号'})
      } else {
        this.$axios.childUpdate(this.form).then(res => {
          if (res.data.code === '0') {
            this.$router.push({
              path: '/schoolAddress',
              query: this.$route.query
            })
          } else {
            this.Toast.fail({title: res.data.msg})
          }
        }, err => {
          this.Toast.fail({title: err})
        }).catch(err => {
          this.Toast.fail({title: err})
        })
      }
    }
  },
  watch: {
    isSelect (val) {
      if (val) {
        delete this.form['className']
      } else {
        delete this.form['classId']
        this.className = ''
      }
    },
    'form.mobile' (val) {
      let phone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (val.length === 11) {
        this.rules.phone = phone.test(val)
      }
    },
    'form.regionId' () {
      this.loadSchoolList()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './addSchoolAddress.styl'
</style>

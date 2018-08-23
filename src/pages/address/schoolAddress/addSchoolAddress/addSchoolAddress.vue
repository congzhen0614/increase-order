<template>
  <div class="add-child-address">
    <ul>
      <li class="item-list">
        <span class="item-title">姓名</span>
        <input class="item-content" type="text" placeholder="请输入孩子姓名">
      </li>
      <li class="item-list">
        <span class="item-title">性别</span>
        <div class="item-content">
          <div class="boy">
            <img v-if="sex === 2" @click="sex = 1" src="../../../../assets/check-icon.png"/>
            <img v-if="sex === 1" @click="sex = 2" src="../../../../assets/checked-icon.png"/>
            <img src="../../../../assets/boy-icon.png"/>
            <span>男</span>
          </div>
          <div class="gril">
            <img v-if="sex === 1" @click="sex = 2" src="../../../../assets/check-icon.png"/>
            <img v-if="sex === 2" @click="sex = 1" src="../../../../assets/checked-icon.png"/>
            <img src="../../../../assets/girl-icon.png"/>
            <span>女</span>
          </div>
        </div>
      </li>
      <li class="item-list">
        <span class="item-title">地区</span>
        <img class="link-icon" src="../../../../assets/link-icon.png">
        <span class="item-content">请选择地区</span>
      </li>
      <li class="item-list">
        <span class="item-title">入学年份</span>
        <img class="link-icon" src="../../../../assets/link-icon.png">
        <span class="item-content">请选择孩子入学年份</span>
      </li>
      <li class="item-list">
        <span class="item-title">学校</span>
        <img class="link-icon" src="../../../../assets/link-icon.png">
        <span class="item-content">请选择学校</span>
      </li>
      <li class="item-list">
        <span class="item-title">年级</span>
        <img class="link-icon" src="../../../../assets/link-icon.png">
        <span class="item-content">请选择孩子当前就读年级</span>
      </li>
      <li class="item-list">
        <span class="item-title">选填班级</span>
        <img class="checked" v-if="!isSelect" @click="isSelect = !isSelect" src="../../../../assets/check-icon.png"/>
        <img class="checked" v-if="isSelect" @click="isSelect = !isSelect" src="../../../../assets/checked-icon.png"/>
        <img class="link-icon" src="../../../../assets/link-icon.png">
        <span class="item-content" style="color: #F8BD48">请选择孩子当前就读年级</span>
      </li>
      <li class="item-list">
        <span class="item-title">自填班级</span>
        <img class="checked" v-if="isSelect" @click="isSelect = !isSelect" src="../../../../assets/check-icon.png"/>
        <img class="checked" v-if="!isSelect" @click="isSelect = !isSelect" src="../../../../assets/checked-icon.png"/>
        <input class="item-content" type="text" placeholder="请输入班级名称">
      </li>
      <li class="item-list">
        <span class="item-title">家长</span>
        <input class="item-content" type="text" placeholder="请输入家长姓名">
      </li>
      <li class="item-list">
        <span class="item-title">电话</span>
        <input class="item-content" type="text" placeholder="请输入孩子家长联系电话">
      </li>
      <li class="item-list">
        <span class="item-title">关系</span>
        <img class="link-icon" src="../../../../assets/link-icon.png">
        <span class="item-content">请输入家长与孩子关系</span>
      </li>
    </ul>
    <div class="submit" @click="onSubmit()">完成</div>
  </div>
</template>

<script>
export default {
  name: 'add-child-address',
  data () {
    return {
      isSelect: true,
      sex: 1,
      form: {}
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {},
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './addSchoolAddress.styl'
</style>

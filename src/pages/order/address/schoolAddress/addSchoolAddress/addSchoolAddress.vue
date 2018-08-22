<template>
  <div class="add-school-address">
    <ul class="user-school-address">
      <li>
        <span>姓名</span>
        <input type="text" placeholder="请输入收货人姓名">
      </li>
      <li>
        <span>性别</span>
        <div class="child-sex">
          <p>
            <img class="check-sex" v-if="!sex" @click.stop="sex=!sex" src="../../../../../assets/check-icon.png">
            <img class="check-sex" v-if="sex" @click.stop="sex=!sex" src="../../../../../assets/checked-icon.png">
            <img class="sex-icon" src="../../../../../assets/boy-icon.png">
            <span>男</span>
          </p>
          <p>
            <img class="check-sex" v-if="sex" @click.stop="sex=!sex" src="../../../../../assets/check-icon.png">
            <img class="check-sex" v-if="!sex" @click.stop="sex=!sex" src="../../../../../assets/checked-icon.png">
            <img class="sex-icon" src="../../../../../assets/girl-icon.png">
            <span>女</span>
          </p>
        </div>
      </li>
      <li>
        <span>省市区</span>
        <img class="school-address-link" src="../../../../../assets/link-icon.png"/>
        <input v-if="address===''" type="text" placeholder="请选择地区" readonly>
        <p v-if="address!==''"></p>
      </li>
      <li>
        <span>入学年份</span>
        <img class="school-address-link" src="../../../../../assets/link-icon.png"/>
        <input v-if="address===''" type="text" placeholder="请选择孩子入学年份" readonly>
        <p v-if="address!==''"></p>
      </li>
      <li>
        <span>学校</span>
        <img class="school-address-link" src="../../../../../assets/link-icon.png"/>
        <input v-if="address===''" type="text" placeholder="请选择学校" readonly>
        <p v-if="address!==''"></p>
      </li>
      <li>
        <span>年级</span>
        <img class="school-address-link" src="../../../../../assets/link-icon.png"/>
        <input v-if="address===''" type="text" placeholder="请选择孩子当前就读年级" readonly>
        <p v-if="address!==''"></p>
      </li>
      <li>
        <span>选填班级</span>
        <img class="check-class" v-if="fillBySelf" @click.stop="fillBySelf=!fillBySelf" src="../../../../../assets/check-icon.png"/>
        <img class="check-class" v-if="!fillBySelf" @click.stop="fillBySelf=!fillBySelf" src="../../../../../assets/checked-icon.png"/>
        <img class="school-address-link" src="../../../../../assets/link-icon.png"/>
        <input v-if="address===''" type="text" placeholder="请选择班级名称" readonly>
        <p v-if="address!==''"></p>
      </li>
      <li>
        <span>自填班级</span>
        <img class="check-class" v-if="!fillBySelf" @click.stop="fillBySelf=!fillBySelf" src="../../../../../assets/check-icon.png"/>
        <img class="check-class" v-if="fillBySelf" @click.stop="fillBySelf=!fillBySelf" src="../../../../../assets/checked-icon.png"/>
        <input v-if="address===''" type="text" placeholder="请输入班级名称">
      </li>
      <li>
        <span>家长</span>
        <input v-if="address===''" type="text" placeholder="请输入家长姓名">
      </li>
      <li>
        <span>电话</span>
        <input type="text" placeholder="请输入孩子家长联系电话">
      </li>
      <li>
        <span>关系</span>
        <img class="school-address-link" src="../../../../../assets/link-icon.png"/>
        <input v-if="address===''" type="text" placeholder="请输入家长与孩子关系" readonly>
        <p v-if="address!==''"></p>
      </li>
    </ul>
    <div class="address-submit">完成</div>
  </div>
</template>

<script>
export default {
  name: 'add-home-address',
  components: {},
  data () {
    return {
      address: '',
      sex: true,
      fillBySelf: true
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

<template>
  <div class="apply-refund">
    <section class="refund-reason">
      <p class="title">
        <span class="text">退款原因</span>
        <img src="./must_select.png">
      </p>
      <div @click="showSelector()" class="refund-type" :class="{ hasVal: refundReason }">{{ refundReason || '请选择退款类型'}}</div>
    </section>
    <!-- 退款说明 -->
    <section class="refund-explain">
      <p class="title">
        <span class="text">退款说明</span>
        <img src="./not_must_select.png">
      </p>
      <div class="explain-box">
        <textarea class="explain-area" placeholder="请在此输入退款说明" v-model="reason"></textarea>
      </div>
    </section>
    <!-- 图片 -->
    <ul class="pic-list">
      <li v-if="picList && picList.length" v-for="(pic, index) in picList" :key="index" class="pic-item">
        <img class="pic" :src="pic">
        <img class="close-icon" src="./close_icon.png" @click.prevent.stop="deleteItem(index)">
      </li>
      <li class="pic-item" @click="submitPic()">
        <input ref="file" type="file" name="image" accept="image/*" style="display: none;" @change="handleInputChange($event)">
        <img class="pic" src="./submit_pic_icon.png">
      </li>
    </ul>
    <div class="submit">
      <span @click="doSubmit">提交</span>
    </div>
  </div>
</template>

<script>
import Picker from 'better-picker'
// 退款原因
let data1 = [{
  text: '未收到货',
  value: 0
}, {
  text: '收到商品与描述不符',
  value: 1
}, {
  text: '少件/漏发',
  value: 2
}, {
  text: '下单重复',
  value: 3
}, {
  text: '商品质量问题',
  value: 4
}]
export default {
  name: 'apply-refund',
  components: {},
  data () {
    return {
      // 上传图片数组
      picList: [],
      imgList: [],
      imgFile: {},
      // 理由
      reason: '',
      // 关系数组
      relationList: data1,
      // 选择器
      picker: new Picker({
        data: [data1],
        selectedIndex: [0, 1, 2],
        title: '退款原因'
      }),
      refundReason: ''
    }
  },
  mounted () {
    // 选择
    this.picker.on('picker.select', (index, selectedIndex) => {
      this.refundReason = this.relationList[index].text
    })
  },
  computed: {
    params () {
      let param = {}
      param.id = this.$route.query.id
      param.refundNote = this.reason
      param.refundReason = this.refundReason
      param.refundImgs = this.imgList
      return param
    }
  },
  methods: {
    // 返回上一页
    goBack () {
      this.$router.goBack()
    },
    // 更改评分
    changeScore (index) {
      this.score = index + 1
    },
    // 上传图片
    submitPic () {
      this.$refs.file.click()
    },
    // 监听 input 改变
    handleInputChange (event) {
      let file = event.target.files[0]
      const imgMaxSize = 1024 * 1024 * 10 // 10MB
      // 检查文件类型
      if (['jpeg', 'png', 'gif', 'jpg'].indexOf(file.type.split('/')[1]) < 0) {
        // 不是图片格式文件
        this.Toast.warning({
          title: '请上传标准格式的图片'
        })
        return
      }
      // 文件大小限制
      if (file.size > imgMaxSize) {
        this.Toast.warning({
          title: '图片大小超过限制'
        })
        return
      }
      this.transformFileToDataUrl(file)
    },
    // 将 File append 进 FromData
    transformFileToFormData (file) {
      const formData = new FormData()
      formData.append('type', file.type)
      formData.append('size', file.size || 'image/jpeg')
      formData.append('name', file.name)
      formData.append('lastModifiedDate', file.lastModifiedDate)
      formData.append('file', file)
      // 上传图片，等接口
      this.uploadImg(formData)
    },
    // 图片压缩
    transformFileToDataUrl (file) {
      const imgCompassMaxSize = 200 * 1024
      // 存储文件相关信息
      this.imgFile.type = file.type || 'image/jpeg'
      this.imgFile.size = file.size
      this.imgFile.name = file.name
      this.imgFile.lastModifiedDate = file.lastModifiedDate
      // 封装好的函数
      const reader = new FileReader()
      // file转dataURL是个异步函数，要将代码写在回调离
      reader.onload = (e) => {
        const result = e.target.result
        this.picList.push(result)
        if (result.length < imgCompassMaxSize) {
          this.compress(result, this.processData, false) // 图片不压缩
        } else {
          this.compress(result, this.processData) // 图片压缩
        }
      }
      reader.readAsDataURL(file)
      this.transformFileToFormData(file)
    },
    // 使用 canvas 绘制图片并压缩
    compress (dataURL, callback, shouldCompress = true) {
      const img = new window.Image()
      img.src = dataURL
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        let compressedDataUrl = shouldCompress ? canvas.toDataURL(this.imgFile.type, 0.2) : canvas.toDataURL(this.imgFile.type, 1)
        callback(compressedDataUrl)
      }
    },
    processData (dataUrl) {
      // 这里使用二进制方式处理 dataUrl
      const binaryString = window.atob(dataUrl.split(',')[1])
      const arrayBuffer = new ArrayBuffer(binaryString.length)
      const intArray = new Uint8Array(arrayBuffer)
      const imgFile = this.imgFile
      for (let i = 0, j = binaryString; i < j; i++) {
        intArray[i] = binaryString.charCodeAt(i)
      }
      const data = [intArray]
      let blob = ''
      try {
        blob = new Blob(data, { type: imgFile.type })
      } catch (error) {
        window.BlobBuilder = window.BlobBuilder || window.WebkitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder
        if (error.name === 'TypeError' && window.BlobBuilder) {
          const builder = new window.BlobBuilder()
          builder.append(arrayBuffer)
          blob = builder.getBlob(imgFile.type)
        } else {
          this.Toast.fail({
            title: '版本过低，不支持上传图片'
          })
          throw new Error('版本过低，不支持上传图片')
        }
      }
      // blob 转 file
      const fileOfBlob = new File([blob], imgFile.name)
      const formData = new FormData()
      // type
      formData.append('type', imgFile.type)
      // size
      formData.append('size', fileOfBlob.size)
      formData.append('name', imgFile.name)
      formData.append('lastModifiedDate', imgFile.lastModifiedDate)
      // append 文件
      formData.append('file', fileOfBlob)
      // 上传图片
      // this.uploadImg(formData)
    },
    // 上传图片
    uploadImg (formData) {
      this.$axios.upLiadImages(formData).then(res => {
        res.data.paths.forEach(item => {
          this.imgList.push(item)
        })
      }, err => {
        console.log(err)
      })
    },
    // 删除单项
    deleteItem (index) {
      this.picList.splice(index, 1)
      this.imgList.splice(index, 1)
    },
    // 提交
    doSubmit () {
      this.$axios.applyRefund(this.params).then(res => {
        if (res.data.code === '0') {
          this.Toast.success({
            title: '申请退款成功'
          })
          this.$router.go(-1)
          this.$router.back()
        } else {
          this.Toast.warning({
            title: res.data.msg
          })
        }
      }, err => {
        console.log(err)
      })
    },
    // 选择退款原因
    showSelector () {
      this.picker.show()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './applyRefund.styl'
</style>

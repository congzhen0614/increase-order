<template>
  <div class="play" :class="{miniPlay: mini}" @click="mini = false">
    <img class="mini-img" v-show="mini" :src="logo">
    <audio class="my-audio" ref="myAudio">
      <source :src="url" type="audio/ogg">
      <source :src="url" type="audio/mpeg">
    </audio>
    <img class="close-icon" src="../../assets/play/close-icon.png" @click="clickClose" v-show="!mini"/>
    <img class="mini-icon"  src="../../assets/play/mini-icon.png" @click.stop="mini = !mini" v-show="!mini"/>
    <img class="play-icon"  src="../../assets/play/play-icon.png" @click="clickPlay" v-show="!play && !mini"/>
    <img class="paus-icon"  src="../../assets/play/paus-icon.png" @click="clickPaus" v-show="play && !mini"/>
    <!-- 进度条背景 -->
    <div class="progress-bar-bg" :style="progressBarWidth" v-show="!mini">
      <!-- 进度条进度 -->
      <div class="progress-bar-jd" :style="{width: playWidth}" v-show="!mini"></div>
      <div class="progress-bar-bs" :style="{left: playPlace}" v-show="!mini">
        <img class="progress-bar-tp" :src="logo" v-show="!mini"/>
      </div>
    </div>
    <!-- 进度条开始时间 -->
    <div class="progress-bar-st" v-show="!mini">{{ lengthOfPlay }}</div>
    <!-- 进度条结束时间 -->
    <div class="progress-bar-et" v-show="!mini">{{ lengthOfSong }}</div>
  </div>
</template>

<script>
export default {
  name: 'play',
  data () {
    return {
      progressBarWidth: {
        width: (window.innerWidth * 0.98 / 50 - 2) + 'rem'
      },
      playWidth: '0%',
      playPlace: '0%',
      play: false,
      mini: false,
      player: '',
      duration: '', // 歌曲长度
      currentTime: '' // 播放长度
    }
  },
  props: {
    logo: {
      type: String
    },
    url: {
      type: String
    }
  },
  mounted () {
    this.lengthOfSong = 0
    this.lengthOfPlay = 0
    this.clickPlay()
  },
  computed: {
    lengthOfSong: {
      get () {
        return this.duration
      },
      set (duration) {
        this.duration = this.keepTwo(parseInt(duration / 60)) + ':' + this.keepTwo(parseInt(duration % 60))
      }
    },
    lengthOfPlay: {
      get () {
        return this.currentTime
      },
      set (currentTime) {
        this.currentTime = this.keepTwo(parseInt(currentTime / 60)) + ':' + this.keepTwo(parseInt(currentTime % 60))
      }
    }
  },
  methods: {
    keepTwo (val) {
      if (val.toString().length === 1) {
        return '0' + val
      } else {
        return val
      }
    },
    clickPlay () {
      let audio = this.$refs.myAudio
      this.play = true
      audio.play()
      this.player = setInterval(() => {
        this.lengthOfSong = audio.duration
        this.lengthOfPlay = audio.currentTime
        let str = (audio.currentTime / audio.duration * 100).toString()
        this.playPlace = this.playWidth = str.substring(0, str.indexOf('.') + 2) + '%'
        if (audio.ended) {
          clearInterval(this.player)
          this.play = false
        }
      }, 100)
    },
    clickPaus () {
      let audio = this.$refs.myAudio
      this.play = false
      audio.pause()
      clearInterval(this.player)
    },
    clickClose () {
      this.$emit('playerClose')
    }
  },
  watch: {}
}
</script>

<style>
  .my-audio {
    display: none;
  }
  .play {
    position: fixed;
    bottom: 5px;
    left: 1%;
    margin: 0 auto;
    width: 98%;
    height: 100px;
    background: rgba(248, 189, 72, 0.99);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }
  .miniPlay {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    border: 3px solid #FFFFFF;
    background: rgba(248, 189, 72, 0.99);
    bottom: 1.4rem;
  }
  .mini-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .close-icon, .mini-icon {
    float: right;
    width: 0.32rem;
    height: 0.32rem;
    margin: 0.2rem;
    margin-bottom: 0;
  }
  .play-icon, .paus-icon {
    width: 0.8rem;
    height: 0.8rem;
    position: absolute;
    left: 0.3rem;
    top: 50%;
    margin-top: -0.4rem;
  }
  .progress-bar-bg {
    height: 4px;
    border-radius: 2px;
    background: rgba(224, 169, 61, 1);
    position: absolute;
    margin-top: -2px;
    left: 1.55rem;
    top: 50%;
  }
  .progress-bar-jd {
    height: 4px;
    border-radius: 2px;
    background: #ffffff;
  }
  .progress-bar-bs {
    width: 0.52rem;
    height: 0.52rem;
    border-radius: 50%;
    border: 2px solid #FFFFFF;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.15);
    margin-top: -0.3rem;
    margin-left: -0.3rem;
    position: absolute;
    top: 50%;
  }
  .progress-bar-tp {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .progress-bar-st, .progress-bar-et {
    font-size: 0.24rem;
    color: #655022;
    position: absolute;
    top: 70%;
  }
  .progress-bar-st {
    left: 1.4rem;
  }
  .progress-bar-et {
    right: 0.3rem;
  }
</style>

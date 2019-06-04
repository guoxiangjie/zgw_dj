<template>
  <div class="DoubleSwiper" onselectstart="return false" style="-moz-user-select:none;">
    <div class="DoubleSwiper_conter" v-if="imgs.length!=0">
      <div class="Top" :style="{'width':(width+160)+'px'}">
        <div class="swiper" :style="{'width':width+'px'}">
          <div
            :style="{'width':(width*imgs.length)+'px','transform':'translateX('+(-width*MaxActive)+'px)'}"
            class="content clearfix"
          >
            <div
              v-for="(item,index) in imgs"
              :key="index"
              class="content-img"
              :class="{'MaxActive':MaxActive==index}"
              :style="{'width':width+'px'}"
            >
              <img :src="item.AttachmentPath" alt srcset>
            </div>
          </div>
        </div>
        <div v-if="MaxActive!=0" class="swiper-btn swiper-up" @click="up"></div>
        <div v-if="MaxActive!=imgs.length-1" class="swiper-btn swiper-down" @click="down"></div>
        <div class="swiper-num">
          <span>{{MaxActive+1}}</span>
          /{{imgs.length}}
        </div>

      </div>

      <div class="bottom">
        <div class="swiper" :style="{'width':minWitdh*4+20*(3)+'px'}">
          <div
            :style="{'width':minWitdh*imgs.length+20*imgs.length+'px','transform':'translateX('+(-minWitdh*minTranslate-(20*minTranslate))+'px)'}"
            class="content clearfix"
          >
            <div
              v-for="(item,index) in imgs"
              :key="index"
              class="content-img"
              :class="{'MaxActive':MaxActive==index}"
              :style="{'width':minWitdh+'px','margin-right':'20px'}"
              @click="minchange(index)"
            >
              <img class="minImg" :src="item.AttachmentPath" alt srcset>
            </div>
          </div>
        </div>
      </div>
                <div
          class="text"
          :key="index"
          v-show="index==MaxActive"
          v-for="(item,index) in imgs"
        >{{item.Introduce}}</div>
    </div>
      
    <div v-else class="error">
      暂未提供图集信息
    </div>

  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 800
    },
    imgs: {
      type: Array,
      default: () => {
        return [];
      }
    },
    minWitdh: {
      type: Number,
      default: 183
    }
  },
  watch: {
    MaxActive(n) {
      let num = n - 2 > 0 ? n - 2 : 0;
      this.minTranslate = num;
    }
  },
  data() {
    return {
      MaxActive: 0,
      minTranslate: 0
    };
  },
  methods: {
    up() {
      this.MaxActive = this.MaxActive - 1;
    },
    down() {
      this.MaxActive = this.MaxActive + 1;
    },
    minchange(index) {
      this.MaxActive = index;
    }
  }
};
</script>

<style lang="less" scoped>
.clearfix:after {
  content: "";
  height: 0;
  line-height: 0;
  display: block;
  visibility: hidden;
  clear: both;
}
.error{
  height: 300px;
  font-size: 24px;
  color: #ccc;
  text-align: center;
  line-height: 300px;
}
.clearfix {
  zoom: 1;
}
.swiper-btn {
  width: 60px;
  height: 60px;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  cursor: pointer;
}
.swiper-up {
  background: url("../assets/img/icon-xiangzuo.png") no-repeat center center;
  left: 0;
}
.swiper-down {
  background: url("../assets/img/icon-xiangyou.png") no-repeat center center;
  right: 0;
}
.text {
  width: 800px;
  color: rgba(87, 87, 87, 1);
  min-height: 100px;
  font-size: 16px;
  text-align: justify;
  padding-left:80px;
  margin-top: 30px;
}
.DoubleSwiper_conter{
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  padding-left: 75px;
}
.swiper-num {
  width: 60px;
  height: 45px;
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  line-height: 45px;
  justify-content: center;
  color: #000;
  font-size: 28px;
  font-weight: bold;
  span {
    font-size: 38px;
    color: red;
  }
}
.Top {
  padding: 0 80px;
  position: relative;
  .swiper {
    overflow: hidden;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    .content {
      transform: translateZ(0);
      transition: transform 0.4s;
      .content-img {
        float: left;
        width: 100%;
        padding: 8px;

        img {
          display: block;
          width: 100%;
        }
      }
    }
  }
}

.bottom {
  padding-left: 80px;
  padding-top: 20px;
  .swiper {
    background: rgba(255, 255, 255, 1);
    overflow: hidden;
    .content {
      transform: translateZ(0);
      transition: transform 0.4s;
      .content-img {
        float: left;
        width: 100%;
        background: #000;
        cursor: pointer;
        img {
          display: block;
          width: 100%;
          opacity: 0.3;
        }
      }
      .MaxActive {
        .minImg {
          opacity: 1;
        }
      }
    }
  }
}
</style>

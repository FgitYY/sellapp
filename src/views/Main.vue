<template>
  <div>
    <!-- 商家头部 -->
    <div class="main" :style="{backgroundImage:'url('+this.avatar+')'}">
      <div class="main-age"></div>
      <div class="main-top">
        <div class="demo-avatar">
          <Avatar shape="square" :src="this.avatar" />
        </div>
        <div class="avatar-right">
          <div class="avatar-right-top">
            <div class="top-name">
              <img src="../assets/images/brand@2x.png" />
              <h1>{{name}}</h1>
            </div>
            <div class="top-description">
              <p>{{description}}/{{deliveryTime}}分钟送达</p>
            </div>
            <div class="top-supports">
              <div class="top-supports-left">
                <img src="../assets/images/decrease_1@2x.png" alt />
                <p>{{add}}</p>
              </div>
              <div class="top-supports-right">
                <span @click="modal11 = true">{{supportslength}}个</span>
                <span>></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-bottom">
        <img src="../assets/images/bulletin@2x.png" />
        <p>{{bulletin}}</p>
        <span @click="modal11 = true">></span>
      </div>
    </div>
    <!-- 容器页面 -->
    <div class="router-link-tab">
      <router-link to="/goods">商品</router-link>
      <router-link to="/evalute">评价</router-link>
      <router-link to="/merchant">商家</router-link>
    </div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
   <transition name="shopcar">
    <div v-show="shopcartop" class="shopchar-top">
      <shopcar></shopcar>
    </div>
      </transition>
    <div @click="shopcartop=!shopcartop" class="shopchar-bar">
      <div class="shopchar-img">
        <div :class="total==0?'shop-img-content':'img-content-shop'">
          <Icon type="md-cart" />
        </div>
      </div>
      <div class="cenetr">
        <h1 :class="total==0?'h1':'h1s'">￥{{total}}</h1>
        <p v-html="total>20?'运费￥0元':'另需配送费￥4元'"></p>
      </div>
      <div class="rt">
        <h1 v-html="total>20?'已免配送费':'￥20起送'"></h1>
      </div>
    </div>
    <Modal  v-model="modal11" :closable="false" footerHide  fullscreen>
      <button @click="modal11=false">关闭</button>
    </Modal>
  </div>
</template>

<script >
import { getseller } from "../api/apis";
import shopcar from './Shopcar'
export default {
   components: {
     shopcar
  },
  data() {
    return {
      shopcartop:false,
      modal11: false,
      name: "", //商家名称
      avatar: "", //商家头像
      description: "", //配送描述
      deliveryTime: "", //配送时间
      score: "", //口味评分
      serviceScore: "", //服务评分
      rankRate: "", //等级评分
      minPrice: "", //起送价
      deliveryPrice: "", //配送费
      ratingCount: "", //评价人数
      sellCount: "", //销售人数
      bulletin: "", //商家公告
      supports: "", //特色支持
      pics: "", //商家店面图片
      infos: "", //其他信息
      add: "", //第一个特色支持
      supportslength: ""
    };
  },
  methods: {
    clickremove() {
     this.$Modal.remove();//关闭Mdoel
    }
  },
  created() {
    //发送请求
    getseller().then(res => {
      self.messageInfo = res.data.data.id;
      this.name = res.data.data.name; //设置获取的商家名称
      this.avatar = res.data.data.avatar;
      this.description = res.data.data.description;
      this.deliveryTime = res.data.data.deliveryTime;
      this.supports = res.data.data.supports;
      this.add = this.supports[0].description;
      this.supportslength = this.supports.length;
      this.bulletin = res.data.data.bulletin;
    });
  },
  computed:{
    goodscar(){
      return this.$store.state.goodslist
    },
    total(){
      return this.$store.state.total
    }
  }
};
</script>

<style lang="less" scoped>
.ivu-modal{
  background-color: red;
}
.ivu-modal-content {
  background-color: rgba(255, 255, 255, 0.6);
}
.main {
  background-color: #000000;
  overflow: hidden;
  position: relative;
  .main-age {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: inherit;
    filter: blur(5px);
  }
  .main-top {
    z-index: 2;
    position: relative;
    justify-content: space-around;
    width: 100%;
    height: 130px;
    overflow: hidden;
    align-items: center;
    top: 0px;
    display: flex;
    .demo-avatar {
      width: 40%;
      width: 65px;
      height: 65px;
      span {
        width: 100%;
        height: 100%;
      }
    }
    .avatar-right {
      width: 60%;
      height: auto;
      .avatar-right-top {
        width: 100%;
        .top-name {
          display: flex;
          img {
            vertical-align: middle;
            width: 30px;
            height: 20px;
            margin-right: 5px;
          }
          h1 {
            color: #ffffff;
            font-size: 16px;
          }
        }
        p {
          color: #ffffff;
        }
      }
      .top-supports {
        display: flex;
        width: 100%;
        .top-supports-left {
          display: flex;
          align-items: center;
          width: 75%;
          img {
            width: 20px;
            vertical-align: middle;
            height: 20px;
          }
        }
        .top-supports-right {
          text-align: center;
          display: flex;
          justify-content: space-around;
          padding: 5px;
          background-color: #3d3832;
          border-radius: 15px;
          color: #ffffff;
          width: 25%;
        }
      }
    }
  }
  .main-bottom {
    z-index: 2;
    position: relative;
    display: flex;
    width: 100%;
    padding: 10px;
    justify-content: space-around;
    align-items: center;
    background-color: rgba(133, 133, 133, 0.6);
    img {
      vertical-align: middle;
      width: 10%;
      width: 22px;
      height: 14px;
    }
    p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #ffffff;
      width: 80%;
    }
    span {
      color: #ffffff;
    }
  }
}
.router-link-active {
  color: red;
}
a {
  color: #cccccc;
}
.router-link-tab {
  display: flex;
  border-bottom: 1px solid #cccccc;
  justify-content: space-around;
  padding: 5px 0px 5px 0px;
}
.shopchar-top{
  position: fixed;
  width: 100%;
  height: 200px;
  bottom: 50px;
  background-color: #fff;
}
.shopchar-bar {
  position: fixed;
  height: 50px;
  width: 100%;
  background-color: #131d27;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .shopchar-img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #131d27;
    margin-left: 10px;
    .shop-img-content {
      width: 50px;
      height: 50px;
      background-color: #2a353a;
      border-radius: 50%;
      margin-left: 10px;
      margin-top: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
    }
    .img-content-shop {
      width: 50px;
      height: 50px;
      background-color: #2a353a;
      border-radius: 50%;
      margin-left: 10px;
      margin-top: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      background-color:orange;
      color: #fff
    }
  }
  .rt {
    background-color: #2a353a;
    h1 {
      padding: 15px 20px 15px 20px;
      font-size: 14px;
    }
  }
  .cenetr {
    display: flex;
    align-items: center;
    .h1 {
      border-right: 1px solid #2a353a;
      padding-right: 5px;
      color: #2a353a;
      font-size: 24px;
    }
    .h1s{
       border-right: 1px solid #2a353a;
      padding-right: 5px;
      color: red;
      font-size: 24px;
    }
    p {
      padding-left: 5px;
    }
  }
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.shopcar-enter-active {
  transition: all .3s ease;
}
.shopcar-leave-active {
  transition: all .8s ease;
}
.shopcar-enter, .shopcar-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(300px);
  opacity: 0;
}
</style>
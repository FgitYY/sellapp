<template>
  <div class="merchant-main">
    <!-- 商家 -->
    <div class="merchant-top">
      <div class="name-top">
        <div class="left">
          <h1>{{name}}</h1>
          <div class="grade">
            <div class="grade-lt">
              <Rate allow-half class="grder-li-1" v-model="value" />
            </div>
            <div class="grade-rt">
              <span>({{ratingCount}})</span>
              <span>月售{{sellCount}}单</span>
            </div>
          </div>
        </div>
        <div class="right">
          <p>
            <Icon  type="md-heart" />
          </p>
          <p>{{text}}</p>
        </div>
      </div>
      <div class="name-bottom">
        <div>
          <p>起送价</p>
          <p>
            {{minPrice}}
            <span>元</span>
          </p>
        </div>
        <div>
          <p>商家配送</p>
          <p>
            {{deliveryPrice}}
            <span>元</span>
          </p>
        </div>
        <div>
          <p>平均配送时间</p>
          <p></p>
          <span>分钟</span>
        </div>
      </div>
    </div>
    <div class="merchant-notice">
      <h1>公告与活动</h1>
      <p>{{bulletin}}</p>
      <div class="text">
        <p>
          <img src="../assets/images/decrease_3@2x.png" alt /> 在线支付满28减5，满50减10
        </p>
        <p>
          <img src="../assets/images/discount_3@2x.png" alt /> 单人精彩赛
        </p>
        <p>
          <img src="../assets/images/discount_3@2x.png" alt /> 清肺雪梨汤8折抢购
        </p>
        <p>
          <img src="../assets/images/special_3@2x.png" alt /> 特价饮品八折抢购
        </p>
        <p>
          <img src="../assets/images/special_3@2x.png" alt /> 单人特色套餐
        </p>
        <p>
          <img src="../assets/images/invoice_3@2x.png" alt /> 该商家支持开发票,请在下单时填好发票抬头
        </p>
        <p>
          <img src="../assets/images/special_3@2x.png" alt /> 已加入"外卖保"计划，食品安全保障
        </p>
      </div>
    </div>
    <div class="merchant-img">
      <h1>商家实景</h1>
      <div class="img">
        <img v-for="(v,i) in pics" :key="i" :src="v" alt />
      </div>
    </div>
    <div class="merchant-msg">
      <h1>商家信息</h1>
      <p v-for="(v,i) in infos" :key="i">{{v}}</p>
    </div>
  </div>
</template>

<script>
import { getseller } from "../api/apis";
export default {
  methods:{
  
  },
  data() {
    return {
      text:'已收藏',
      value: 0,//评分组件
      name: "",
      minPrice: "", //起送
      deliveryPrice: "", //配送费
      ratingCount: "", //坪价人数
      deliveryTime: "", //配送时间
      sellCount: "", //销售总数
      pics: "", //商家店面图片
      supports: "", //特色支持
      infos: [], //其他信息
      bulletin: "" //公告
    };
  },
  created() {
    getseller().then(res => {
      this.minPrice = res.data.data.minPrice;
      this.deliveryPrice = res.data.data.deliveryPrice;
      this.ratingCount = res.data.data.ratingCount;
      this.deliveryTime = res.data.data.deliveryTime;
      this.sellCount = res.data.data.sellCount;
      this.pics = res.data.data.pics;
      this.supports = res.data.data.supports;
      this.infos = res.data.data.infos;
      this.bulletin = res.data.data.bulletin;
      this.name = res.data.data.name;
      this.value = res.data.data.serviceScore;
    });
  }
};
</script>

<style lang="less" scoped>
 .ivu-rate{
   font-size: 16px;
 }
.merchant-main {
  h1 {
    font-size: 20px;
  }
  background-color: #f3f3f6;
  .merchant-top {
    padding: 20px 0px 20px 0px;
    background-color: #ffffff;
    .name-top {
      display: flex;
      width: 100%;
      padding-bottom: 20px;
      border-bottom: 1px solid #e8e8e8;
      .left {
        text-align: center;
        width: 60%;
        h1 {
          font-size: 18px;
        }
        .grade {
          justify-content: center;
          display: flex;
          width: 100%;
          justify-content: space-around;
          .grade-lt {
            .ivu-rate {
              display: flex;
              width: 100%;
              justify-content: center;
            }
          }
          .grade-rt {
            display: flex;
            align-items: center;
            font-size: 0.5em;
          }
          img {
            width: 14px;
            height: 14px;
            vertical-align: middle;
            margin-right: 5px;
          }
        }
      }
      .right {
        width: 40%;
        text-align: center;
        i {
          font-size: 16px;
          color: red;
        }
      }
    }
    .name-bottom {
      padding-top: 20px;
      display: flex;
      justify-content: space-around;
    }
  }
  .merchant-notice {
    margin-top: 20px;
    padding: 10px 10px 0px 10px;
    background-color: #fff;
    p {
      color: red;
      padding: 10px;
    }
    .text {
      p {
        img {
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
        color: #000;
        display: flex;
        align-items: center;
        border-top: 1px solid #e8e8e8;
      }
    }
  }
  .merchant-img {
    margin-top: 20px;
    background-color: #ffffff;
    padding: 10px;
    .img {
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      img {
        width: 120px;
        height: 80px;
      }
    }
  }
  .merchant-msg {
    margin-top: 20px;
    background-color: #ffffff;
    padding: 10px;
    p {
      // margin-top: 20px;
      padding: 10px 10px 10px 10px;
      border-bottom: 1px solid #e8e8e8;
    }
  }
}
</style>
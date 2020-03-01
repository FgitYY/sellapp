<template>
  <div class="evaluate">
    <div class="evaluate-top">
      <div class="evaluate-top-left">
        <h1>{{overall}}</h1>
        <p>综合评价</p>
        <p style="color:#bcc1c2">高于周边商家{{rankRate}}%</p>
      </div>
      <div class="evalute-top-right">
        <div class="list1">
          <p>服务态度</p>
          <Rate allow-half v-model="value" />
          <span>{{value}}</span>
        </div>
        <div class="list2">
          <p>服务态度</p>
          <Rate allow-half v-model="value" />
          <span>{{value}}</span>
        </div>

        <div class="list3">
          <p>送达时间</p>
          <p style="color:#bcc1c2">{{deliveryTime}}分钟</p>
        </div>
      </div>
    </div>
    <div class="evaluate-main">
      <div class="btn">
        <Button type="primary">全部</Button>
        <Button type="info">满意</Button>
        <Button type="dashed">不满意</Button>
      </div>
      <div class="select">
        <Icon type="ios-checkmark-circle" />
        <span>只看有内容的评价</span>
      </div>
      <div class="content">
        <div class="cont-content" v-for="(v,i) in data" :key="i">
          <div class="demo-avatar">
            <Avatar :src="v.avatar" />
          </div>
          <div class="rt">
            <div class="title">
              <p>{{v.username}}</p>
              <p>{{timestampToTime(v.rateTime)}}</p>
            </div>
            <div class="grade">
              <Rate allow-half v-model="v.score" />
              <span>50分钟送达</span>
            </div>
            <div class="text">{{v.text}}</div>
            <div class="botm">
              <Icon :type="v.rateType==0?'md-thumbs-up':'md-thumbs-down'" />
              <span v-for="(item,index) in v.recommend" :key="index" v-show="index<3">{{item}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getratings, getseller } from "../api/apis";
export default {
  data() {
    return {
        value:0,//评分组件
      overall: "", //综合评价
      deliveryTime: "", //送达时间
      serviceScore: "", //服务评分
      rankRate: "", //高于周边
      avatar: "", //用户头像
      username: "", //评价用户名
      rateTime: "", //评价时间
      deliveryTimeA: "", //送达时间
      rateType: "", //评价类型
      text: "", //评价内容
      recommend: "", //用户推荐菜名
      data: []
    };
  },
  created() {
    getseller().then(res => {
      this.overall = (
        (res.data.data.score +
          res.data.data.serviceScore +
          res.data.data.foodScore) /
        3
      ).toFixed(1);
      this.deliveryTime = res.data.data.deliveryTime;
      this.rankRate = res.data.data.rankRate;
      this.value=res.data.data.serviceScore;
    });
    getratings().then(res => {
      this.data = res.data.data;
    });
  },
  methods: {
    timestampToTime: function(timestamp) {
      const date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const Y = date.getFullYear() + "-";
      const M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      const D = date.getDate() + " ";
      return Y + M + D;
    }
  }
};
</script>

<style lang="less" scoped>
 .ivu-rate{
   font-size: 16px;
 }
.evaluate {
    .ivu-rate-star {
        margin-right: 0px
    }
  background-color: #f3f3f6;
  .evaluate-top {
    background-color: #fff;
    padding: 10px 0px 10px 0px;
    display: flex;
    width: 100%;
    .evaluate-top-left {
      width: 40%;
      text-align: center;
      border-right: 1px solid #e8e8e8;
      h1 {
        color: #fa9a03;
      }
      p {
        line-height: 25px;
      }
    }
    .evalute-top-right {
      p{
        font-size: 0.5em
      }
      width: 60%;
      .list3{
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-left: 10px;
          p{
              padding-right: 30px
          }
      }
      div {
          display: flex;
          align-items: center;
          justify-content: space-between;
        span {
          color: #fa9a03;
          padding-right: 5px
        }
      }
      .list1 {
        display: flex;
        padding-left: 10px;
      }
      .list2 {
        display: flex;
        padding-left: 10px;

      }
      .list3 {
        display: flex;
        
      }
    }
  }
  .evaluate-main {
    margin-top: 20px;
    background-color: #ffffff;
    .btn {
      margin: 20px 20px 0px 20px;
      padding: 20px;
      border-bottom: 1px solid #cccccc;
      .ivu-btn-primary {
        background-color: #00a1dc;
        border-color: #00a1dc;
      }
      .ivu-btn-info {
        background-color: #cceef7;
        border-color: #cceef7;
      }
      .ivu-btn-dashed {
        background-color: #e9ecec;
        border-color: #e9ecec;
      }
      button {
        margin-right: 10px;
      }
    }
    .select {
      padding: 10px 10px 10px 15px;
      font-size: 16px;
      i {
        font-size: 24px;
      }
      color: #b7bbbf;
      border-bottom: 2px solid #cccccc;
    }
    .content {
      margin: 20px;
      .cont-content {
        padding: 20px;
        border-bottom: 1px solid #cccccc;
        display: flex;
        width: 100%;
        .demo-avatar {
          text-align: center;
          width: 20%;
        }
        .rt {
          width: 80%;
          .title {
            width: 100%;
            display: flex;
            justify-content: space-between;
          }
          .botm {
            display: flex;
            display: flex;
            align-items: center;
            .ivu-icon-md-thumbs-up{
              color: #00a1dc;
            }
            span {
              border: 1px solid #cccccc;
              margin-left: 5px;
              font-size: 12px;
              margin-right: 5px;
              padding: 2px;
            }
          }
        }
      }
    }
  }
}
</style>
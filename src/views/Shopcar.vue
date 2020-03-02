<template>
  <div>
    <!-- 购物车 -->
    <div class="title">
      <p>购物车</p>
      <p @click="cleargoods()">
        <Icon type="ios-trash" />清空购物车
      </p>
    </div>
    <div class="shopcontent" v-for="(item1,indx) in goods1" :key="indx">
      <div v-show="item1.num!=0" class="content-main">
        <div class="content-lt">{{item1.name}}</div>
        <div class="content-rt">
          <button class="minus" @click="clickdec1(item1.name)">-</button>
          <p> {{item1.num}}</p>
          <button class="plus" @click="clickadd1(item1.name)">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickadd1(name) {
      this.$store.commit("goodsadd", name);
    },
    clickdec1(name) {
      this.$store.commit("goodsdec", name);
    },
    cleargoods(){
       this.$store.commit("goodsclear")
    }
  },
  //getters 使用filter过滤来过滤掉等于0的数据
  computed: {
    goodstop() {
      return this.$store.state.goodslist;
    },
    goods1() {
      return this.$store.state.goods;
    }
  }
};
</script>
<style lang="less" scoped>
.shopcontent {
  .content-main {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .content-lt {
      margin-left: 10px;
    }
    .content-rt {
      display: flex;
      margin-right: 10px;
      p{
        width: 20px;
        text-align: center;
      }
      button {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
      .plus {
        background-color: #00a1dc;
        color: #ffffff;
        text-align: center;
        line-height: 18px;
        border: 1px solid #00a1dc;
      }
      .minus {
        background-color: #ffffff;
        color: #00a1dc;
        text-align: center;
        line-height: 12px;
        border: 2px solid #00a1dc;
      }
    }
  }
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f4f4f4;
}

</style>


<template>
  <div>
    <!-- 购物车 -->
    <div class="title">
      <p>购物车</p>
      <p>
        <Icon type="ios-trash" />清空购物车
      </p>
    </div>
    <div class="shopcontent" v-for="(item,index) in goods1" :key="index">
       <div v-for="(item1,indx) in goods1[index].foods" :key="indx">
            {{item1.name}}
         </div>
    </div>
  </div>
</template>

<script>
    export default {
        //getters 使用filter过滤来过滤掉等于0的数据 
        computed:{
            goodstop(){
                return this.$store.state.goodslist
            }
            ,
             goods1(){
                return  this.$store.getters.goods1
             }
          }
        
    }
</script>
<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f4f4f4;
}
</style>
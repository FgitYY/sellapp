<template>
  <div class="goods_lists">
    <!-- 商品 -->
    <div class="goods_left">
      <ul class="content">
        <div
          v-for="(item1,index1) in goodslist"
          :key="index1"
          :class="{selected:curselected==index1}"
          @click="clickLfet(item1,index1)"
        >
          <div class="item-left">
            <img
              style="width:14px;height:14px"
              v-show="item1.type==1"
              src="../assets/images/special_1@2x.png"
              alt
            />
            <img
              style="width:14px;height:14px"
              v-show="item1.type==2"
              src="../assets/images/discount_1@2x.png"
              alt
            />
            <span>{{item1.name}}</span>
          </div>
        </div>
      </ul>
    </div>
    <div class="goods_right">
      <ul class="content">
        <div v-for="(item2,index2) in goodslist" :key="index2" :id="index2">
          <div class="title">{{item2.name}}</div>
          <div v-for="(v,i) in goodslist[index2].foods" :key="i" class="goods_main">
            <div class="content1">
              <div class="left demo-avatar">
                <Avatar shape="square" :src="v.image" />
              </div>
              <div class="right">
                <h1>{{v.name}}</h1>
                <p v-show="v.description.length<4">{{v.description}}</p>
                <p>
                  月售{{v.sellCount}}
                  <span>好评率{{v.rating}}%</span>
                </p>
                <div class="right-btom">
                  <p class="text">
                    ￥{{v.price}}
                    <span v-if="v.oldPrice!=''">￥{{v.oldPrice}}</span>
                  </p>
                  <div>
                    <button class="minus" @click="clickdec(v.name)" v-show="v.num!=0">-</button>
                    <p class="num" >{{v.num}}</p>
                    <button class="plus" @click="clickadd(v.name)">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { getgoods } from "../api/apis";
import BScroll from "better-scroll"; //引用better-scroll
export default {
  data() {
    return {
      // data: [], //商品数组
      curselected: 0, //点击商品的索引
      scrollY: 0
    };
  },
  methods: {
    clickLfet(v, i) {
      //记录点击的索引 保存
      this.curselected = i;
      this.rightDiv.scrollToElement(document.getElementById(i), 1000); //滚动到是定位置
    },
    clickadd(name){
      this.$store.commit('goodsadd',name);      
      this.$store.commit('setgoods')
    },
    clickdec(name){
      this.$store.commit('goodsdec',name)
      this.$store.commit('setgoods')

    }
  },
  created() {
    getgoods().then(res => {
      this.$store.commit('initgoodslist',res.data.data)
    });

  },
  mounted() {
    //左侧
    new BScroll(document.querySelector(".goods_left"), {
      click: true //允许容器点击
    });
    //右侧
    this.rightDiv = new BScroll(document.querySelector(".goods_right"), {
      probeType: 3
    });
    //右边联动左边
    // 1.监听右侧滚动距离
    // 2.判定滚动距离属于哪个div盒子
    //第一个div 1231  第二个 151 第三个151  第四个371 第五个261 第六个371
    // if(y>=0&&y<1231){

    // }else if(y>=1231&&y<1231+151){
      
    // }else-if(y>=1231+151&&y<1231+151+151)
    this.rightDiv.on("scroll", obj => {
      const y = Math.abs(obj.y);
      for (const hightobj of this.getHight) { 
        if ( y >= hightobj.min && y < hightobj.max) {
          this.curselected = hightobj.index;
          return;
        }
      }
      //获取div的高度
    });
  },
  //计算属性结果缓存 适合高频率的运算
  computed: {
    getHight() {
      const arr = [];
      let  total = 0;
      for (let i = 0; i < this.goodslist.length; i++) {
        //当前div1的高度
        const cutHight = document.getElementById(i).offsetHeight;
        //div的最小
        arr.push({ min: total, max: total + cutHight, index: i });  
        total += cutHight;
        // 根据规律判断出区间 为最小值为前面div的和  最大值为前面div的和加自身的高
      }
      return arr;
    },
    //从vuex中拿数据
    goodslist(){
      return this.$store.state.goodslist
    }
  }
};
</script>

<style lang="less" scoped>
.selected {
  background-color: #fff;
}
.goods_lists {
  display: flex;
  .goods_left {
    background-color: #f3f6f6;
    height: 300px;
    overflow: scroll;
    width: 80px;
    .item-left {
      margin: 0px 10px 0px 10px;
      padding: 10px 0px 10px 0px;
      border-bottom: 1px solid #cccccc;
      img {
        margin-bottom: -2px;
      }
    }
  }
  .goods_right {
    height: 400px;
    overflow: scroll;
    flex: 1;
    .title {
      padding: 10px;
      background-color: #f3f6f6;
    }
    .goods_main {
      .content1 {
        display: flex;
        width: 100%;
        border-bottom: 1px solid #cccccc;
        padding: 20px;
        .left {
          width: 30%;
          span {
            width: 55px;
            height: 55px;
            img {
              vertical-align: middle;
            }
          }
        }
        .right {
          width: 70%;
          h1 {
            font-size: 18px;
          }
          .right-btom {
            display: flex;
            justify-content: space-between;
            .text {
              color: red;
              font-weight: bold;
              span {
                color: #cccccc;
                text-decoration: line-through;
              }
            }
          }
          div {
            display: flex;
            .num {
              padding: 0px 10px 0px 10px;
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
    }
  }
}
</style>
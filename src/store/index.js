import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)
//使用 创建一个vuex的仓库  存放所有需要交互的数据
const store = new vuex.Store({//store实例对象
    //存放所有交互数据
    state: {
        goodslist: [],//商品的数组
        goods: [],
        total:0
    },
    //改变state的唯一方式
    mutations: {
        //只有mutations中的函数能够对state数据进行修改
        //初始化商品数组
        initgoodslist(state, Goods) {
            state.goodslist = Goods
        },
        //商品数量加
        goodsadd(state, name) {
            for (let value of state.goodslist) {
                for (let v of value.foods) {
                    if (v.name == name) {
                        v.num += 1
                        state.total+=v.price
                        return
                    }
                }
            }
        },
        //商品减少
        goodsdec(state, name) {
            for (let value of state.goodslist) {
                for (let v of value.foods) {
                    if (v.name == name) {
                        v.num -= 1
                        state.total-=v.price
                        return
                    }
                }
            }
        },
        setgoods(state) {
            //一个新的临时数组
            //遍历当前数组
           state.goods=[]
           for(let title of state.goodslist){
               for(let i of title.foods){
                   if(i.num>0){
                       state.goods.push(i)
                   }
               }
           }

    },
    //清空购物车
       goodsclear(state){
          for(let value of state.goodslist){
              for(let v of value.foods){
                  v.num=0
                  state.total=0
              }
          }
       }

    //vuex版本的计算属性
 }
})
//mutations函数必须手动触发
//两个参数 第一个参数的名字 第二个要传入的参数
// store.commit('chen')
store.commit('setgoods')
export default store

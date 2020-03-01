import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)
//使用 创建一个vuex的仓库  存放所有需要交互的数据
const store = new vuex.Store({//store实例对象
    //存放所有交互数据
    state: {
        goodslist: []//商品的数组
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
                    }
                }
            }
        },
        goodsww(state) {
            let newArr = [];
            state.goodslist.forEach((value, index) => {
                newArr[index] = value;
                newArr[index].foods = value.foods.filter(
                    item => item.num != 0)
            })
        }
    },
    //vuex版本的计算属性
    getters: {
        goods1: state => {
            return  state.goodslist.forEach((i) => {
                    state.goodslist[i].foods.forEach((value)=>{
                       value.num.filter(itm=>itm.num!=0)
                   })
                })
         
        },
    }
})
//mutations函数必须手动触发
//两个参数 第一个参数的名字 第二个要传入的参数
// store.commit('chen')

export default store

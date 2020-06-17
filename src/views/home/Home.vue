<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-content"
                 :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-content"
                   :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2" />
      <goods-list :goodsList="showGoodsList"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>

    <!-- ul>li{列表$}*50 -->
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  import {getHomeMultidata, getHomeGoods} from "../../network/home";
  import {debounce} from "../../common/utils";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },

    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,   // backTop的显示隐藏
        tabOffsetTop: 0,   // tab-control的offsetTop位置
        isTabFixed: false,  // tab-control吸顶用的
        saveY: 0,
        itemImgListener: null
      }
    },
    computed: {
      showGoodsList() {
        return this.goods[this.currentType].list
      }
    },
    // 被 keep-alive 缓存的组件激活时调用。
    activated() {
      this.$refs.scroll.scroll.refresh()
      this.$refs.scroll.scroll.scrollTo(0, this.saveY, 0)
    },
    // 被 keep-alive 缓存的组件停用时调用。
    deactivated() {
      // 1.保存Y值
      this.saveY = this.$refs.scroll.scroll.y
      // 2.取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },


    // created 里面只写主要的逻辑, 如果方法复杂, 抽到 methods里
    created() {
      // 请求多个数据
      // 这个方法是 methods中定义的方法
      this.getHomeMultidata()

      //  请求 [流行,新款,精选] 的商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },

    mounted() {
      // 对需要监听的事件进行保存
      this.itemImgListener = () => {
        debounce(this.$refs.scroll.scroll.refresh(), 50)
      }
      // 监听item中图片加载完成
      this.$bus.$on('itemImageLoad', this.itemImgListener)
    },

    methods: {
      /* 事件监听相关方法 */

      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        // 保持两个 tab-control 的状态一致
        this.$refs.tabControl1.equal(index)
        this.$refs.tabControl2.equal(index)

      },
      backClick() {
        // 回到顶部
        this.$refs.scroll.scrollTo(0, 0, 300)
        // console.log(this.$refs.scroll.scroll.scrollTo)
      },

      // 拿到实时滚动的位置, 做 backTop的显示隐藏
      contentScroll(position) {
        // 判断 BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
        // 决定 tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },

      // 上拉加载更多
      loadMore() {
        this.getHomeGoods(this.currentType)
      },

      swiperImageLoad() {
        // $el 代表内部的 DOM 元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },


      /* 网络请求相关的方法 */
      getHomeMultidata() {
        // 这个方法是 home.js中的方法
        getHomeMultidata().then(res => {
          // console.log(res)
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        }, err => {
          console.log('没拿到数据')
        })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        // 这个方法是 home.js中的方法
        getHomeGoods(type, page).then(res => {
          // console.log(res)
          // 保存数据
          this.goods[type].list.push(...res.data.list)
          // 修改页码
          this.goods[type].page += 1
          // 调 BScroll 的方法, 使之能多次上拉加载更多
          this.$refs.scroll.scroll.finishPullUp()
        })
      }

    }


  }
</script>

<!-- scoped 作用域, 加上后里面的选择器只选择本页面模板中的元素, 不会对其他页面的元素产生干扰 -->
<style scoped>
  #home {
    padding-top: 44px;
    /* vh 代表视口高度 */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  /* 很重要: 让它达到某一位置后 固定(position: fixed)
        有些浏览器不支持(移动端一般都支持)*/
  .tab-content {
    /* 用了滚动库后, 这个属性失效了 */
    position: sticky;
    top: 44px;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }


</style>

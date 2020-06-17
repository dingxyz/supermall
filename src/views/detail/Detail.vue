<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" ref="nav" @itemClick="itemClick"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <!-- 注意:  detailInfo 用的是驼峰命名-->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info  ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods-list="recommendList"/>
    </scroll>
    <detail-bottom-bar @addToCart="addCart"/>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "../../components/common/scroll/Scroll";
  import GoodsList from "../../components/content/goods/GoodsList";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail";
  import {debounce} from "../../common/utils";
  import {backTopMixin} from "../../common/mixin";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
    },
    // 对混入的代码进行注册
    mixins: [backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        themeTops: [],
        currentIndex: 0,
        recommendList: [],  // 推荐信息
        themeTops: [],  // 位置
        getThemeTopY: null,
        currentIndex: 0
      }
    },

    // created 在实例创建完成后被立即调用
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid
      // 2.根据iid请求数据
      getDetail(this.iid).then(res => {
        // 2.1.获取结果
        const data = res.result;

        // 2.2.获取顶部信息
        this.topImages = data.itemInfo.topImages;

        // 2.3.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

        // 2.4.获取店铺信息
        this.shop = new Shop(data.shopInfo);

        // 2.5.获取商品的详情信息
        this.detailInfo = data.detailInfo

        // 2.6.保存参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        // 2.7.保存评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
      })
      // 3.获取详情页最下面的推荐信息
      getRecommend().then((res, error) => {
        if (error) return
        this.recommendList = res.data.list
      })

      this.getThemeTopY = debounce(() => {
        // 保存位置
        this.themeTops = []
        this.themeTops.push(0)
        this.themeTops.push(this.$refs.params.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop)
        this.themeTops.push(Number.MAX_VALUE)

      },100)
    },

    mounted() {
    },

    updated() {

    },

    methods: {
      imageLoad() {
        this.$refs.scroll.scroll.refresh()

        this.getThemeTopY()
      },

      itemClick(index) {
        // scrollTo(x, y, 滚动的时间)
        this.$refs.scroll.scroll.scrollTo(0, -this.themeTops[index], 200)
      },

      // 滚动到某个位置 显示对应的标题
      contentScroll(position) {
        // 1.获取Y值
        const positionY = -position.y
        let length = this.themeTops.length - 1
        // 2.positionY 和主题中的值进行对比
        for (let i=0; i<length; i++) {
          if(this.currentIndex !== i && (positionY >= this.themeTops[i] && positionY < this.themeTops[i+1])) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        // 判断 BackTop是否显示
        this.listenShowBackTop(position)
      },

      // 点击加入购物车
      addCart() {
        // 1.获取购物车需要展示的信息
        const product = {}
        product.iid = this.iid;
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;

        // 2.将商品添加到购物车里
        this.$store.dispatch('addCart', product).then(res => {
          // 弹出 toast
          this.$toast.showToast(res,2000)
        })

      }

    },

  }
</script>

<style scoped>
  #detail {
    /* 要给父元素设定固定的高度, 要不然内部无法滚动 */
    height: 100vh;
    position: relative;
    z-index: 10;
    background-color: #fff;
  }

  .detail-nav-bar {
    position: relative;
    z-index: 11;
    background-color: #ffffff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
  }

  /*.back-top {*/
  /*  position: fixed;*/
  /*  right: 10px;*/
  /*  bottom: 65px;*/
  /*}*/
</style>

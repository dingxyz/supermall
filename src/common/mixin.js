// 混入
import BackTop from "../components/content/backTop/BackTop";



// 回到顶部的封装
// 从 Home.vue中抽出来的, 用在 Detail.vue中了, 可以在Home.vue中用这个混入
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,   // backTop的显示隐藏
    }
  },

  methods: {
    // 回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300)
      // console.log(this.$refs.scroll.scroll.scrollTo)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}

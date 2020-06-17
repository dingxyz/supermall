<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

	export default {
		name: "Scroll",
    props: {
		  probeType: {
		    type: Number,
        default: 0
      },
      pullUpLoad: {
		    type: Boolean,
        default: false
      },
      // data: {
      //   type: Array,
      //   default: () => {
      //     return []
      //   }
      // }
    },
    data() {
		  return {
		    scroll: {}
      }
    },
    mounted() {
		  // 1.创建 BScroll对象
		  this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        // 根据传入的值决定要不要实时监听位置
        probeType: this.probeType,
        // 根据传入的值决定要不要 做上拉加载更多
        pullUpLoad: this.pullUpLoad,
        // scrollbar: true,  // 滚动条
      })

      // 2.监听滚动位置
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })

      // 3.监听上拉到底部
      this.scroll.on('pullingUp', () => {
        console.log('上拉加载更多');
        this.$emit('pullingUp')
      })

		  // setTimeout(this.__initScroll, 20)
    },

    methods: {
		  scrollTo(x, y, time=300) {
		    this.scroll.scrollTo(x, y, time)
      }

		  // __initScroll() {
		  //   // 1.初始化BScroll对象
		  //   if (!this.$refs.wrapper) return
      //   this.scroll = new BScroll(this.$refs.wrapper, {
      //     probeType: this.probeType,
      //     click: true,
      //     pullUpLoad: this.pullUpLoad
      //   })
      //
      //   // 2.将监听事件回调
      //   this.scroll.on('scroll', pos => {
      //     this.$emit('scroll', pos)
      //   })
      //
      //   // 3.监听上拉到底部
      //   this.scroll.on('pullingUp', () => {
      //     console.log('上拉加载');
      //     this.$emit('pullingUp')
      //   })
      // },
      // refresh() {
      //   this.scroll && this.scroll.refresh && this.scroll.refresh()
      // },
      // finishPullUp() {
		  //   this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
      // },
      // scrollTo(x, y, time) {
		  //   this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
      // }
    },
    // watch: {
		//   data() {
    //     setTimeout(this.refresh, 20)
    //   }
    // }
	}
</script>

<style scoped>

</style>

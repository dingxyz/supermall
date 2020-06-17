<template>
  <scroll class="content" ref="scroll">
    <div>
      <cart-list-item v-for="(item) in cartList"
                      :key="item.iid"
                      :item-info="item">
      </cart-list-item>
    </div>
  </scroll>
</template>

<script>
  import Scroll from "../../../components/common/scroll/Scroll";
  import CartListItem from './CartListItem'

  import { mapGetters } from 'vuex'

  export default {
		name: "CartList",
    components: {
		  Scroll,
      CartListItem
    },
    computed: {
      // 选择需要从 getters中导入的方法
      ...mapGetters(['cartList'])
    },
    activated() {
		  this.$refs.scroll.scroll.refresh()
    }
  }
</script>

<style scoped>
  .content {
    height: calc(100% - 44px - 49px - 44px);
    overflow: hidden;
  }

</style>

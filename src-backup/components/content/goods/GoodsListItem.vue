<template>
  <div class="goods" >
    <img :src="goodsItem.show.img" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">¥{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
	export default {
		name: "GoodsListItem",
    props: {
		  goodsItem: {
		    type: Object,
        default: {}
      }
    },
    // mounted: function () {
    //   // console.log(this.goods);
    // },
    methods: {
      imageLoad() {
        // 发送事件到事件总线
        this.$bus.$emit('itemImageLoad')
      },
      // goToDetail: function () {
      //   // 1.获取iid
      //   let iid = this.goods.iid;
      //
      //   // 2.跳转到详情页面
      //   this.$router.push({path: '/detail', query: {iid}})
      // }
    },
    // computed: {
    //   getImg() {
    //     return this.goods.img || this.goods.image || this.goods.show.img
    //   }
    // }
	}
</script>

<style scoped>
  .goods {
    padding-bottom: 40px;
    /* 子元素绝对定位, 其父元素要开启相对定位*/
    position: relative;

    width: 48%;
  }
  .goods img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>

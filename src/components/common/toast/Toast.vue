<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      showToast(message='默认的文字', duration=1500){
        this.isShow = true
        this.message = message

        setTimeout(() =>{
          this.isShow = false
        }, duration)

      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;

    z-index: 999;

    color: #ffffff;
    background-color: rgba(0,0,0,.75);
  }

</style>

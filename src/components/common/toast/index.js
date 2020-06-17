import Toast from "./Toast";

const toast = {}

// 会默认将Vue传进去
toast.install = function (Vue) {
  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 2. new的方式, 根据组件构造器, 创建出组件对象
  const toast = new toastContrustor()

  // 3. 将组件对象, 手动挂载到某一个元素上.(min.js中也这样用的)
  toast.$mount(document.createElement('div'))

  // 4. 向document中添加 toast.$el (toast.$el 对应的就是 div)
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}


export default toast
// 之后在min.js中引入并安装

const actions = {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.查看是否添加过
      // 会将相等的 item返回给 oldInfo
      const oldInfo = context.state.cartList.find(item => item.iid === payload.iid)

      // 2. +1或者新添加
      if (oldInfo) {
        oldInfo.count += 1
        resolve('当前商品数量加1')
      } else {
        payload.count = 1
        payload.checked = true
        context.state.cartList.push(payload)
        resolve('添加了新的商品')
      }
    })
  }
}

export default actions


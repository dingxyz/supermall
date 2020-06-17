const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // parallel: false,
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('assets', resolve('src-1/assets'))
      .set('common', resolve('src-1/common'))
      .set('components', resolve('src-1/components'))
      .set('network', resolve('src-1/network'))
      .set('views', resolve('src-1/views'))
  }
}


// 这个不能用
// module.exports = {
//   configureWebpack: {
//     resolve: {
//       // 配置别名
//       alias: {
//         // 默认 @ 代表 src-1
//         '@': './src-1',
//         'components': './src-1/components',
//         'common': '@common',
//         'assets': '@/assets',
//         'network': '@/network',
//         'views': '@/views',
//       }
//     }
//   }
// }


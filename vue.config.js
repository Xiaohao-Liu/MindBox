// vue.config.js
module.exports = {
    // 选项...
    publicPath:"./",
    transpileDependencies: [
      'vue-echarts',
      'resize-detector'
    ],
    pages:{
        index: {
            // page 的入口
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'MindBox',
          }
    }
  }
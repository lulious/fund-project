module.exports = {
    publicPath: './', //相对路径转绝对路径
    // webpack-dev-server 的配置项
    devServer: {
        disableHostCheck: true
    },
    css: {
        extract: false, 
        sourceMap: false, 
        loaderOptions: {
            less: {
                javascriptEnabled: true //less 配置
            }
        },
        modules: false 
    },
}
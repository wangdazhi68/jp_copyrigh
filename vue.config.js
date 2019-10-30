const webpack = require('webpack');
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/dist/" : "/",
    outputDir: "dist",
    // 静态资源目录
    assetsDir: 'assets',
    devServer: {
        // proxy: {
        //     '/api': {
        //         target: 'http://192.168.50.144:8080/',
        //         ws: true,
        //         changeOrigin: true
        //     },
        // }
    }
}
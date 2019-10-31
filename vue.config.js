const webpack = require('webpack');
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/dist/" : "/",
    outputDir: "dist",
    // 静态资源目录
    assetsDir: 'assets',
    devServer: {
        //proxy: 'http://39.107.66.190:8080'
        // proxy: {
        //     '/api': {
        //         target: 'http://39.107.66.190:8080',
        //         ws: true,
        //         changeOrigin: true,
        //     },
        // }
    }
}
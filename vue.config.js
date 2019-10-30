const webpack = require('webpack');
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/dist/" : "/",
    outputDir: "dist",
    // 静态资源目录
    assetsDir: 'assets',
}
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack');
const path = require('path');

module.exports = merge(common, {
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify("1.0.0"),
            EXPRESSION: "1+2",
            COPYRIGHT: {
                AUTHOR: JSON.stringify("Will Author")
            }
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,//启动缓存
                parallel: true,//启动并⾏行行压缩 //如果为true的话，可以获得sourcemap
                sourceMap: true // set to true if you want JS source maps
            }),
            //压缩css资源的
            new OptimizeCSSAssetsPlugin({}) ]
    },
    // 启用相应模式（development,production）下的webpack内置的优化
    mode: 'production'
})
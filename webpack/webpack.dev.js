const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack');
const path = require('path');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false),
            VERSION: JSON.stringify("1.1.1"),
            EXPRESSION: "1+2",
            COPYRIGHT: {
                AUTHOR: JSON.stringify("Will Author")
            }
        })
    ],
    // 启用相应模式（development,production）下的webpack内置的优化
    mode: 'development',
    watch: true,
    watchOptions: {
        ignored: /node_modules/, //忽略略不不⽤用监听变更更的⽬目录
        poll:1000, //每秒询问的⽂文件变更更的次数
        aggregateTimeout: 500, //防⽌止重复保存频繁重新编译,500毫秒内重复保存不不打包
    },
    devServer: {
        contentBase:path.resolve(__dirname,'../dist'),
        host:'localhost',
        compress:true,
        port:8080
    }
})
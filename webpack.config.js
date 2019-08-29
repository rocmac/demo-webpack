const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    devtool:'eval-source-map',
    entry: './src/index.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath:'/'
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/, //忽略略不不⽤用监听变更更的⽬目录
        poll:1000, //每秒询问的⽂文件变更更的次数
        aggregateTimeout: 500, //防⽌止重复保存频繁重新编译,500毫秒内重复保存不不打包
    },
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
    module: {
        rules: [
            {
                test: /\.(html|htm)$/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname,'src'),
                exclude: /node_modules/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, 'css-loader']
            },
            {
                test: /\.(jpg|png|bmp|gif|svg|ttf|woff|woff2|eot)$/,
                use: [{
                    loader: 'url-loader',
                    options:{
                        limit:4096,
                        outputPath: 'images',
                        publicPath:'/images'
                    }
                }
                ]
            }
        ]
    },
    plugins: [
        //参数类似于webpackOptions.output
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename:'css/[id].css'
        }),
        new HtmlWebpackPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        contentBase:path.resolve(__dirname,'dist'),
        host:'localhost',
        compress:true,
        port:8080
    }
}

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js',
        publicPath:'/'
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
    ]
}
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './client/client.js'
    ],
    output: {
        path: require('path').resolve('./dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ["@babel/preset-react","@babel/preset-env"],
                    plugins: ['transform-class-properties',
                        new HtmlWebpackPlugin(),
                        new HtmlWebpackRootPlugin(),
                        "@babel/plugin-syntax-jsx"]
                }
            }
        ]
    }
};
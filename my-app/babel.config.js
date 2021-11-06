const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
module.exports = {
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: ["babel"],
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015', 'react-hmre'],
                    plugins: ['transform-class-properties', new HtmlWebpackPlugin(), new HtmlWebpackRootPlugin()]
                }
            }
        ]
    },
    presets:[
        "@babel/preset-env",
        "@babel/preset-react",
        "es2015", "react"
    ],
    plugins: [ "@babel/plugin-transform-arrow-functions",
        "@babel/plugin-proposal-class-properties" ]

}
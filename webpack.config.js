const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: 'dist/index.html'
        }
    },
    module: {
        rules: []
    },
    plugins: [new HtmlWebpackPlugin({
        template: './public/index.html',
        inject: 'body'
    })],
};
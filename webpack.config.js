const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: "./src/assets/js/index.js",
    output: {
        clean: true,
        filename: "app.bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    devServer: {
        static: "./src",
        compress: true,
        port: 9000,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(s[ac]ss|css)$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "God of War",
            template: "src/index.html"
        })
    ],
};

let path = require('path')

module.exports = {
    mode: 'production',

    watch: true,

    entry: path.resolve(__dirname, './src/index.js'),

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react'],
                    plugins: ["transform-object-rest-spread"]

                }
            }
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }]
    }
}
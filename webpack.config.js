const path = require('path');

const config = {
    entry: './src/factory.js',
    plugins: [],
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'datepicker.js',
        sourceMapFilename: '[file].map',
        library: 'datepicker',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                test: /\.json/,
                loader: 'json'
            },
            {
                test: /\.js$/,
                exclude: [/(node_modules)/],
                loader: 'babel'
            }
        ]
    }
};

module.exports = config;
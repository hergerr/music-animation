const path = require('path');

module.exports = {
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 8081,
        devMiddleware: {
            writeToDisk: false,
        },
    },
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/public',
        filename: 'bundle.js',
    },
};

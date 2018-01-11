var path = require('path');
var fs = require('fs');


var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });


module.exports = {
    entry: './src/main.ts',
    target: 'node',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'gate.js'
    },
    resolve: {
        extensions: ['.ts', '.ts', '.js'],
        modules: [
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "node_modules")
        ],
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }]
    },
    externals: nodeModules
}
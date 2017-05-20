const fs = require('fs');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const ExternalsPlugin = require('webpack2-externals-plugin');
const NotifierPlugin = require('webpack-notifier');

module.exports = function(env) {
    const isDev = env === 'dev';

    const config = {
        name: 'Server',
        target: 'node',
        entry: {
            server: path.resolve('src/server/server.ts')
        },
        output: {
            filename: '[name].js',
            path: path.resolve('dist')
        },
        resolve: {
            extensions: ['.ts', '.js', '.json']
        },
        module: {
            rules: [
                { test: /\.ts$/, use: [ 'ts-loader' ] }
            ]
        },
        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),
            new NotifierPlugin({
                title: 'Webpack Server Build',
                excludeWarnings: true,
                skipFirstNotification: true
            }),
            new ExternalsPlugin({
                type: 'commonjs',
                include: path.resolve('node_modules')
            })
        ],
        stats: {
            version: false,
            chunks: false
        }
    };

    const production = merge.smart(config, {
        plugins: [
            new webpack.optimize.UglifyJsPlugin()
        ]
    });

    return isDev ? config : production;
};
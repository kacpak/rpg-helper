import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import BabiliPlugin from 'babili-webpack-plugin';

import paths from '../paths';

const isProduction = process.env.NODE_ENV === 'production';

const baseConfig = {
    entry: {
        app: ['./src/app/bootstrap.js']
    },
    output: {
        path: paths.public,
        filename: '[name].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: [ [ 'env', {
                            targets: {
                                browsers: ['> 1%', 'last 2 versions', 'safari >= 7', 'ie >= 11']
                            },
                            useBuiltIns: true
                        } ] ],
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader'
                    }
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
        }
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new HtmlWebpackPlugin({
            template: './src/app/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'style.css',
            disable: !isProduction
        }),
        new webpack.ProvidePlugin({
            $: 'jquery/dist/jquery.slim.js',
            jQuery: 'jquery/dist/jquery.slim.js',
            Tether: 'tether'
        })
    ]
};

const devBuild = webpackMerge.smart(baseConfig, {
    entry: {
        app: ['webpack-hot-middleware/client?reload=true']
    },
    devtool: '#cheap-module-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});

const prodBuild = webpackMerge.smart(baseConfig, {
    devtool: '#source-map',
    plugins: [
        new BabiliPlugin(),
        new webpack.LoaderOptionsPlugin({ minimize: true }),
    ]
});

export default isProduction ? prodBuild : devBuild;

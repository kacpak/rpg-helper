import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import BabiliPlugin from 'babili-webpack-plugin';
import FaviconsPlugin from 'favicons-webpack-plugin';

import paths from './paths';

const isProduction = process.env.NODE_ENV === 'production';

const babelOptions = {
    babelrc: false,
    presets: [ [ 'env', {
        targets: {
            browsers: ['> 1%', 'last 2 versions', 'safari >= 7', 'ie >= 11']
        },
        useBuiltIns: true
    } ] ],
};

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
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: babelOptions,
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
                        scss: ExtractTextPlugin.extract({
                            use: ['css-loader', 'sass-loader'],
                            fallback: 'vue-style-loader'
                        })
                    },
                    extractCSS: isProduction
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
        }),
        new FaviconsPlugin({
            logo: path.join(paths.root, 'src/app/assets/', isProduction ? 'rpg-logo.svg' : 'rpg-logo-dev.svg'),
            emitStats: true,
            // The name of the json containing all favicon information
            statsFilename: 'iconstats-[hash].json',
            persistentCache: true,
            inject: true,
            // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
            background: '#fff',
            // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
            title: 'RPG Helper',

            // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                coast: false,
                favicons: true,
                firefox: true,
                opengraph: false,
                twitter: false,
                yandex: false,
                windows: false
            }
        })
    ]
};

const devBuild = webpackMerge.smart(baseConfig, {
    entry: {
        app: ['webpack-hot-middleware/client?reload=true']
    },
    devtool: '#inline-source-map',
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

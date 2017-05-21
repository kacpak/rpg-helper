import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config';

const compiler = webpack(webpackConfig);

export default function(app) {
    app.use(webpackDevMiddleware(compiler, {
        hot: true,
        reload: true,
        stats: {
            colors: true
        },
        historyApiFallback: true,
        publicPath: webpackConfig.output.publicPath,
        index: 'index.html'
    }));

    app.use(webpackHotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
    }));
}

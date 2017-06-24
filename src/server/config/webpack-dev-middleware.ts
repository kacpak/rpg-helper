import * as path from 'path';
import * as webpack from 'webpack';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config';

const compiler = webpack(webpackConfig);

export default function(app) {
    const devMiddleware = webpackDevMiddleware(compiler, {
        stats: {
            colors: true
        },
        publicPath: webpackConfig.output.publicPath,
        index: 'index.html'
    });

    app.use(devMiddleware);
    app.use(webpackHotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
    }));

    app.get('*', (req, res) => {
        const indexPath = path.join(webpackConfig.output.path, 'index.html');
        const index = devMiddleware.fileSystem.readFileSync(indexPath);
        res.end(index);
    });
}

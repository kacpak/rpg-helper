import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as debug from 'debug';
import * as express from 'express';
import {Express} from 'express';
import * as http from 'http';
import * as path from 'path';
import rootRouter from './public';
import apiRouter from './rest';

interface Configuration {
  port?: number;
  rootDir?: string;
  secretKey?: string;
}

class Server {

  private configuration: Configuration = {};

  constructor() {
    this.setupConfiguration();

    const app = express();
    const server = http.createServer(app);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(compression());

    this.setupRoutes(app);
    this.listen(server);
  }

  private setupConfiguration() {
    this.configuration.port = process.env.port || 3000;
    this.configuration.rootDir = path.resolve('dist');
    this.configuration.secretKey = process.env.secret_key || 'debug';
  }

  private setupRoutes(app: Express) {
    app.use('/', rootRouter);
    app.use('/api', apiRouter);
  }

  private listen(server: http.Server) {
    server.listen(this.configuration.port)
      .on('error', (error: any) => {
        if (error.syscall !== 'listen') {
          throw error;
        }

        switch (error.code) {
          case 'EACCES':
            console.error(`Port ${this.configuration.port} requires elevated privileges`);
            process.exit(1);
            break;
          case 'EADDRINUSE':
            console.error(`Port ${this.configuration.port} is already in use`);
            process.exit(1);
            break;
          default:
            throw error;
        }
      })
      .on('listening', () => console.log(`==> Listening on port ${server.address().port}. Open up http://localhost:${server.address().port}/ in your browser.`));
  }

}
const server = new Server();

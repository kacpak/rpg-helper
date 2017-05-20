import * as debug from 'debug';
import {IDebugger} from 'debug';

class Logger {
  private debugLogger: IDebugger;

  constructor() {
    this.debugLogger = debug('rpg-helper');
  }

  public log(message: any): void {
    console.log(message);
  }

  public debug(message: any, type?: string): void {
    console.log(message);
    if (!type) {
        this.debugLogger(message);
    } else {
        debug(type)(message);
    }
  }

  public error(message: any): void {
    console.error(message);
  }
}

const logger = new Logger();
export default logger;

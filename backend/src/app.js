import express from 'express';
// import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.errors();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  errors() {
    this.server.use(errors());
  }
}

export default new App().server;

import express, { Application } from 'express';
import { errorMiddleware } from './middlewares/error.middlewares';
import { CorsMiddleware } from './server';
import { UserRoutes } from './routes/user.routes';
export class App {
  private app: Application;

  constructor(corsConfig: CorsMiddleware) {
    this.app = express();
    this.middleware(corsConfig);
    this.setupAllRoutes();
  }

  listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
    this.app.use(errorMiddleware);
  }
  private setupUserRoutes() {
    const userRoutes = new UserRoutes();
    const userBaseRoute = '/user';

    this.app.use(userBaseRoute, userRoutes.getRoutes());
  
  }
  private setupAllRoutes() {
     this.setupUserRoutes();
  }

  private middleware(corsConfig: CorsMiddleware) {
    this.app.use(express.json());
    this.app.use(corsConfig);
    this.app.use(express.urlencoded({ extended: true }));
   
  }
}
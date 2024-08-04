import express, { Application } from 'express';
import { errorMiddleware } from './middlewares/error.middlewares';
import { CorsMiddleware } from './server';
import { UserRoutes } from './disaster/routes/user.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import { EmailRoutes } from './disaster/routes/email.routes';
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

    this.app.use(userBaseRoute, userRoutes.postRoutes());
  
  }
  private setupEmailRoutes() {
    const emailRoutes = new EmailRoutes();
    const emailBaseRoute = '/email';

    this.app.use(emailBaseRoute, emailRoutes.postRoutes());
  
  }
  private setupAllRoutes() {
     this.setupUserRoutes();
     this.setupSwagger();
     this.setupEmailRoutes();
  }
   private setupSwagger() {
    this.app.use(
      '/documentation',
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec),
    );
  }

  private middleware(corsConfig: CorsMiddleware) {
    this.app.use(express.json());
    this.app.use(corsConfig);
    this.app.use(express.urlencoded({ extended: true }));
   
  }
}
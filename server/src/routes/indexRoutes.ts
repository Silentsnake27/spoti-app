import { Router } from 'express';
import { indexController } from '../controllers/indexControllers';
// import request from 'request';
class IndexRoutes {

   public router: Router = Router();

   constructor() {
    this.config();
   }

   config(): void {
        this.router.get('/token', indexController.spotifyToken );
    
   }
    
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;

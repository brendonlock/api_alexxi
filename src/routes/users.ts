import { Express, Request, Response } from "express";
import { createUserHandler, getCurrentUser }  from '../controller/user.controller';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from '../controller/session.controller';
import validateResource from "../middleware/validateResource";
import { createUserSchema } from '../schemas/user.schema';
import { createSessionSchema } from '../schemas/session.schema';
import requireUser from "../middleware/requireUser";
import { PostsController } from '../controller/posts.controller';

function routes(app: Express) {

    app.get('/api/v1/healthcheck', (req: Request, res: Response) => {res.sendStatus(200)});
  
    app.post('/api/v1/users/create', validateResource(createUserSchema), createUserHandler); //register

    app.get('/api/v1/@me', requireUser, getCurrentUser); //get current user

    app.post('/api/v1/sessions', validateResource(createSessionSchema), createUserSessionHandler); //login

    app.get('/api/v1/sessions', requireUser, getUserSessionsHandler) //

    app.delete('/api/v1/sessions', requireUser, deleteSessionHandler)  //logout

    // refactor 

    app.post('/api/v1/releases/upload', (req: Request, res: Response) => {
        res.sendStatus(200);
        console.log(`Request: ${req.body}`)

        const { } = req.body
    })

    app.get('/api/v1/images/free-downloads', (req: Request, res: Response) => {

        res.sendStatus(200)
    }) //

    app.get('/api/v1/google-analytics/posts', PostsController.getPosts);
    
}

export default routes
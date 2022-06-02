import { Request, Response, Application } from "express";
import { User, user } from "../models/users";

const user_obj = new User();

//return a json data for all users in database
async function index(req: Request, res: Response) {
   
    try {
        const result = await user_obj.index();
                
        res.status(200).json(result);
       
    } catch (e) {
        res.status(400).json(`${e}`);
    }
    
}

//return a json data for one user in database
async function show(req: Request, res: Response) {
   const slug = req.params.slug;
    try {
        const result = await user_obj.show(slug);
                
        res.status(200).json(result);
       
    } catch (e) {
        res.status(400).json(`${e}`);
    }
    
}
//create and return a json data for the user in database
async function create(req: Request, res: Response) {
    const u: user = req.body;
     try {
         const result = await user_obj.create(u);
                 
         res.status(200).json(result);
        
     } catch (e) {
         res.status(400).json(`${e}`);
     }
     
 }
 //update and return a json data for the user in database
async function update(req: Request, res: Response) {
    const u: user = req.body;
     try {
         const result = await user_obj.update(u);
                 
         res.status(200).json(result);
        
     } catch (e) {
         res.status(400).json(`${e}`);
     }
     
 }
 //delete the user in database
async function delete_(req: Request, res: Response) {
    const slug = req.params.slug;
     try {
         const result = await user_obj.delete(slug);
                 
         res.status(200).json(result);
        
     } catch (e) {
         res.status(400).json(`${e}`);
     }
     
 }
//main routes of user model
function mainRoutes(app: Application) {
    
    app.get('/users', index);
    app.get('/users/:slug', show);
    app.post('/users', create);
    app.patch('/users/:slug', update);
    app.delete('/users/:slug', delete_);

    
}

export default mainRoutes;
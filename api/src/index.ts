import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './database';
import logs_route from './handlars/logs';
import user_route from './handlars/users';
import account_route from './handlars/account';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../swagger.json'
dotenv.config();


//initial port and app
const PORT = process.env.PORT ||5000;
const app = express();
//usig middel ware cors and body parser
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: true
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//configre the server to listen to port and running it
app.listen(PORT, (): void => {
    db.create();
    console.log(`server running on port ${PORT}...`);
});

app.get('/',(req,res)=>{
    res.send('hello');
});
//calling routes of all projects
account_route(app);
user_route(app);
logs_route(app);
 
//export the app to use when importing the file
export default app;

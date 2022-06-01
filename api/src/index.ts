import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import create from './database';
import bodyParser from 'body-parser';
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


//configre the server to listen to port and running it
app.listen(PORT, (): void => {
    create();
    console.log(`server running on port ${PORT}...`);
});


 
//export the app to use when importing the file
export default app;

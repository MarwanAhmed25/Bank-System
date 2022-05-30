import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import create from './database';
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

app.set('view engine', 'ejs');
app.set('views', 'front');
const p = path.join(__dirname, 'static/../../static');
app.use(express.static(p));
//configre the server to listen to port and running it
app.listen(PORT, (): void => {
    create();
    console.log(`server running on port ${PORT}...`);
});

app.get('/',async (req,res)=>{
  
    res.render('index');
});

 
//export the app to use when importing the file
export default app;

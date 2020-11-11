import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';

dotenv.config({path:'variables.env'});


const app = express();

//conectar la base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error));



// habilitar pug

app.set('view engine', 'pug');


app.use((req,res,next)=>{
    const year =new Date();
    res.locals.ActualYear = year.getFullYear();
    res.locals.nombresitio="Agencia de Viajes";
    next();
});

//agregar body parser para leer los datos del form
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));
app.use('/',router);

/** Puerto y Host para la app */
const port = process.env.PORT || 4000; 
const host = process.env.HOST || '0.0.0.0';

app.set("port",port);

app.listen(port,host ,() => {
    console.log(`El servidor esta funcionando en el host ${host} Puerto: ${port}`);
});  
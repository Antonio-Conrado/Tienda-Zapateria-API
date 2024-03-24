import express from 'express';
import dotenv from 'dotenv';

import catalogosRouter from './routes/catalogosRouter.js';
import usuarioRouter from './routes/usuarioRouter.js';
import inventarioRouter from './routes/inventarioRouter.js';
import db from './config/db.js';


const app = express();
app.use(express.json());
dotenv.config();

//conexión a la bd
try {
    await db.sync();
} catch (error) {
    console.log('No se pudo conectar a la bd', error);
};

//variables.env
const port = process.env.PORT || 4000;

//routes
app.use('/catalogos',catalogosRouter);
app.use('/',usuarioRouter);
app.use('/admin', inventarioRouter);


//definir carpeta public
app.use(express.static('public'));
app.listen(port);
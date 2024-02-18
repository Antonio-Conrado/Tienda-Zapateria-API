import express from 'express';
import catalogosRouter from './routes/catalogosRouter.js';
import db from './config/db.js';


const app = express();

app.use(express.json());

//conexión a la bd
try {
    await db.sync();
} catch (error) {
    console.log('No se pudo conectar a la bd', error);
};

//variables.env
const port = process.env.PORT || 4000;
app.use('/catalogos',catalogosRouter);
//definir carpeta public
app.use(express.static('public'));
app.listen(port);
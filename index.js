import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

import bodyParser from 'body-parser';

const app = express();
//conexión a la bd
try {
    await db.sync();
} catch (error) {
    console.log('No se pudo conectar a la bd', error);
};



//habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//variables.env
const port = process.env.PORT || 3000;
app.use('/',router);
//definir carpeta public
app.use(express.static('public'));
app.listen(port);
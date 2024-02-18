import express from 'express';
const router = express.Router();

//categorias
import { 
    nuevaCategoria,
    obtenerCategorias,
    eliminarCategoria,
    editarCategoria
} from '../controllers/catalogos/categoriaController.js';

//color

import { 
    nuevoColor,
    obtenerColores,
    eliminarColor,
    editarColor
} from '../controllers/catalogos/colorController.js';

//marca
import { 
    nuevaMarca,
    obtenerMarcas,
    eliminarMarca,
    editarMarca

} from '../controllers/catalogos/marcaController.js';

//talla


//proveedor


//router categorias
router.get('/categorias', obtenerCategorias);
router.post('/categorias/nueva', nuevaCategoria);
router.delete('/categorias/:id', eliminarCategoria);
router.put('/categorias/editar/:id', editarCategoria);

// router color
router.get('/colores', obtenerColores);
router.post('/colores/nuevo', nuevoColor);
router.delete('/colores/:id', eliminarColor);
router.put('/colores/editar/:id', editarColor);

//router marca
router.get('/marcas/', obtenerMarcas);
router.post('/marcas/nuevo', nuevaMarca);
router.delete('/marcas/:id', eliminarMarca);
router.put('/marcas/editar/:id', editarMarca);


//router talla

//router proveedor

export default router;
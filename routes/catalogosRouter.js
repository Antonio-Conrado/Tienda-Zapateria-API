import express from 'express';
const router = express.Router();

import checkAuth from '../middleware/auth.js';

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
import {
    nuevaTalla,
    obtenerTallas,
    eliminarTalla,
    editarTalla

} from '../controllers/catalogos/tallaController.js';



//router categorias
router.get('/categorias',
    checkAuth(['administrador', 'empleado']),
    obtenerCategorias
);
router.post('/categorias/nueva',
    checkAuth(['administrador', 'empleado']),
    nuevaCategoria
);
router.delete('/categorias/:id',
    checkAuth(['administrador', 'empleado']),
    eliminarCategoria
);
router.put('/categorias/editar/:id',
    checkAuth(['administrador', 'empleado']),
    editarCategoria
);

// router color
router.get('/colores',
    checkAuth(['administrador', 'empleado']),
    obtenerColores
);
router.post('/colores/nuevo',
    checkAuth(['administrador', 'empleado']),
    nuevoColor
);
router.delete('/colores/:id',
    checkAuth(['administrador', 'empleado']),
    eliminarColor
);
router.put('/colores/editar/:id',
    checkAuth(['administrador', 'empleado']),
    editarColor
);

//router marca
router.get('/marcas',
    checkAuth(['administrador', 'empleado']),
    obtenerMarcas
);
router.post('/marcas/nuevo',
    checkAuth(['administrador', 'empleado']),
    nuevaMarca
);
router.delete('/marcas/:id',
    checkAuth(['administrador', 'empleado']),
    eliminarMarca
);
router.put('/marcas/editar/:id',
    checkAuth(['administrador', 'empleado']),
    editarMarca
);


//router talla
router.get('/tallas',
    checkAuth(['administrador', 'empleado']),
    obtenerTallas
);
router.post('/tallas/nuevo',
    checkAuth(['administrador', 'empleado']),
    nuevaTalla
);
router.delete('/tallas/:id',
    checkAuth(['administrador', 'empleado']),
    eliminarTalla
);
router.put('/tallas/editar/:id',
    checkAuth(['administrador', 'empleado']),
    editarTalla
);



export default router;
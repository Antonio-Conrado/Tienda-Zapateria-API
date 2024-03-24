import express from 'express';
const router = express.Router();

import { 
    nuevoInventario, 
    obtenerInventarios, 
    obtenerInventario, 
    editarInventario,
    eliminarInventario
} from '../controllers/inventario/inventarioController.js';

import checkAuth from '../middleware/auth.js';

router.post('/inventario',
    checkAuth(['administrador, empleado']),
    nuevoInventario
);

router.get('/inventario',
    checkAuth(['administrador, empleado']),
    obtenerInventarios
);
router.get('/inventario/:id',
    checkAuth(['administrador, empleado']),
    obtenerInventario
);

router.put('/inventario/:id',
    checkAuth(['administrador']),
    editarInventario
);

router.delete('/inventario/:id',
    checkAuth(['administrador']),
    eliminarInventario
);

export default router;
import express from 'express';
const router = express.Router();

import { nuevoInventario } from '../controllers/inventario/inventarioController.js';

import checkAuth from '../middleware/auth.js';

router.post('/inventario',
    checkAuth(['administrador']),
    nuevoInventario
);
export default router;
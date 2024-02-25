import express from 'express';
const router = express.Router();

//rol
import {
    nuevoRol, 
    obtenerRoles,
    eliminarRol,
    editarRol
} from '../controllers/usuarios/rolController.js';

//usuarioController
import {
    nuevoUsuario,
    confirmarUsuario,
    login
} from '../controllers/usuarios/usuarioController.js';


import checkAuth from '../middleware/auth.js';
//rol
router.post('/roles/nuevo',
    checkAuth(['administrador']),
    nuevoRol
);

router.get('/roles',
    checkAuth(['administrador']),
    obtenerRoles
);

router.delete('/roles/:id',
    checkAuth(['administrador']),
    eliminarRol
);

router.put('/roles/editar/:id',
    checkAuth(['administrador']),
    editarRol
);

//usuario
router.post('/nuevo-usuario', nuevoUsuario);
router.get('/confirmar-cuenta/:token', confirmarUsuario);
router.post('/login', login);


export default router;
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario/Usuario.js';

const checkAuth =  (rolPermitido) => {
    
    return async (req, res, next) => {
        let token;
        
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET,  { algorithm: 'RS256' });
                
                //autenticar endpoints por rol
                if(!rolPermitido.includes(decoded.rol)){
                    return res.status(401).json({ mensaje: 'No está autorizado para ver la información!' });
                };

                
                let datos = await Usuario.findOne({where:{id : decoded.id}})
                const objectUser = {
                    id : datos.id,
                    nombres : datos.nombres,
                    apellidos : datos.apellidos,
                    email : datos.email,
                    telefono : datos.telefono,
                    roleId : datos.roleId
                };

                req.user = objectUser;
                return next();
            } catch (error) {
                return res.status(401).json({ mensaje: 'No está autorizado para ver la información. Token no válido o ha expirado!' });
            }
        };

        if (!token) {
            return res.status(401).json({ mensaje: 'No está autorizado para ver la información!' });
        }
    }
};

export default checkAuth;

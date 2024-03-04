import Usuario from "../../models/Usuario/Usuario.js";
import Rol from "../../models/Usuario/Rol.js";
import generarJWT from '../../helpers/generarJWT.js';

const nuevoUsuario = async(req,res,next) =>{
    const {nombres, apellidos, telefono, email, password, roleId} = req.body;
    try {
        const idRol = await Rol.findByPk(roleId);
        if(!idRol){
            return res.status(400).json({mensaje : 'No existe el Rol!'});
        };
        if(idRol.dataValues.estado === false){
            return  res.status(400).json({mensaje : 'Rol no disponible!'});
        };

        await Usuario.create({
            nombres: nombres.trim(),
            apellidos: apellidos.trim(),
            telefono,
            email,
            password,
            roleId
        });
        res.status(200).json({ mensaje: 'Se agregó el usuario correctamente!'});

    } catch (error) {
        res.status(500).json({mensaje : "Hubo un problema. Comuníquese con el Administrador!", tipo : `${error}`});
    }
};

const confirmarUsuario = async(req,res,next) =>{
    const{token} = req.params;
    const usuario = await Usuario.findOne({where:{
        token
    }});

    if(!usuario){
        return res.status(404).json({mensaje : 'El token es inválido!'});
    };

    try {
        usuario.token = null;
        usuario.confirmado = true;

        await usuario.save();
        res.status(200).json({mensaje :"Has confirmado tu cuenta!"});

    } catch (error) {
        res.status(500).json({mensaje : "Hubo un problema. Comuníquese con el Administrador!", tipo : `${error}`});
    }
};

const login = async(req,res,next) =>{
    const {email, password} = req.body;

    const usuario = await Usuario.findOne({where:{
        email
    }});
    
    if(!usuario){
        return res.status(404).json({mensaje: 'El usuario no existe!'});
    };

    try {
        if(!usuario.confirmado){
            return res.status(400).json({mensaje :'Tu cuenta no ha sído confirmada!'})
        };

        const nombreRol = await Rol.findOne({ where: { id: usuario.roleId } });
        if(await usuario.verificarPassword(password)){

            const usuarioAutenticado ={
                id : usuario.id,
                nombres : usuario.nombres,
                rol : nombreRol.nombre
            };

            res.status(200).json({
                mensaje : 'Has iniciado sesión correctamente!',
                datos: usuarioAutenticado,
                token: generarJWT({
                    id: usuario.id,
                    rol: nombreRol.nombre
                })
            });
        }else{
            return res.status(400).json({mensaje : 'Password Incorrecto!'});
        }

    } catch (error) {
        res.status(500).json({mensaje : "Hubo un problema. Comuníquese con el Administrador!", tipo : `${error}`});
    }
};



export {
    nuevoUsuario,
    confirmarUsuario,
    login
};
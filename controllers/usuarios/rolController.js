import Rol from "../../models/Usuario/Rol.js";

const nuevoRol = async(req,res,next) =>{
    try {
        const existeRol = await Rol.findOne({
            where:{
                nombre : req.body.nombre.trim()
        }});

        if(!existeRol){
            const roles = await Rol.create({
                nombre : req.body.nombre.trim().toLowerCase(),
                estado : req.body.estado
            });
            res.status(200).json({mensaje : 'Se agregó el rol correctamente!', datos :roles});
        }else{
            res.status(409).json({mensaje : "El rol ya existe!"});
        };
        
    } catch (error) {
        res.status(500).json({mensaje : "Hubo un problema. Comuníquese con el Administrador!", tipo : `${error}`});
    }
};

const obtenerRoles = async(req,res,next) =>{
    try {
        const roles = await Rol.findAll();
        if(!roles.length){
            res.status(400).json({mensaje : "No hay roles disponibles!"});
        }else{
            res.status(200).json(roles);
        }
    } catch (error) {
        res.status(500).json({mensaje : 'Hubo un error al obtener los roles!', tipo : `${error}`});
        next();
    }
};

const eliminarRol = async(req,res,next) =>{
    try {
        const rol = await Rol.destroy({
            where:{
                id : req.params.id
        }});
        if(!rol){
            res.status(404).json({mensaje : "El rol no se encontró!"});
        }else{
            res.status(200).json({mensaje : "El rol se eliminó exitosamente!"});
        };
    } catch (error) {
        res.status(500).json({mensaje : 'Hubo un error al eliminar el rol!', tipo : `${error}`});
        next();
    }
};

const editarRol = async(req,res,next) =>{
    try {
        const existeRol = await Rol.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!existeRol) {
            res.status(404).json({ mensaje: 'El rol no se encontró!' });
            next()
        }else{

            await Rol.update({
                nombre: req.body.nombre.trim().toLowerCase(),
                estado: req.body.estado
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({ mensaje: "El rol se editó correctamente!" });
    
        };
        
    } catch (error) {
        res.status(500).json({mensaje : 'Hubo un error al editar el rol!', tipo : `${error}`});
        next();
    };
};

export { 
    nuevoRol,
    obtenerRoles,
    eliminarRol,
    editarRol
};
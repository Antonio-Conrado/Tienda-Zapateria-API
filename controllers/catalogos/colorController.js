import Color from "../../models/Catalogos/Color.js";

const nuevoColor = async(req,res,next) =>{
    try {
        const existeColor = await Color.findOne({
            where:{
                nombre : req.body.nombre.trim()
        }});

        if(!existeColor){
            const color = await Color.create({
                nombre : req.body.nombre.trim(),
                estado : req.body.estado
            });
            res.status(200).json({mensaje : 'Se agregó el color correctamente!', datos :color});
        }else{
            res.status(409).json({mensaje : "El color ya existe!"});
        };
        
    } catch (error) {
        res.status(500).json({mensaje : 'Hubo un error al crear el nuevo color!', tipo : `${error}`});
        next();
    };
};

const obtenerColores = async(req,res,next) =>{
    try {
        const colores = await Color.findAll();
        if(!colores.length){
            res.status(400).json({mensaje : "No hay colores disponibles!"});
        }else{
            res.status(200).json(colores);
        };
        
    } catch (error) {
        res.status(500).json({mensaje : 'Hubo un error al obtener los colores!', tipo : `${error}`});
        next();
    };

};

const eliminarColor = async(req,res,next) =>{
    try {
        const color = await Color.destroy({
            where:{
                id : req.params.id
        }});
        if(!color){
            res.status(404).json({mensaje : "El color no se encontró!"});
        }else{
            res.status(200).json({mensaje : "El color se eliminó exitosamente!"});
        };
        
    } catch (error) {
        res.status(500).json({mensaje : 'Hubo un error al eliminar el color!', tipo : `${error}`});
        next();
    };

};

const editarColor = async(req,res,next) =>{
    try {
        const existeColor = await Color.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!existeColor) {
            res.status(404).json({ mensaje: 'El color no se encontró!' });
            next()
        }else{

            await Color.update({
                nombre: req.body.nombre.trim(),
                estado: req.body.estado
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({ mensaje: "El color se editó correctamente!" });
    
        };
        
    } catch (error) {
        res.status(500).json({mensaje : 'Hubo un error al editar el color!', tipo : `${error}`});
        next();
    };
};


export {
    nuevoColor,
    obtenerColores,
    eliminarColor,
    editarColor
};
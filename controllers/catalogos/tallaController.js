import Talla from "../../models/Catalogos/Talla.js";

const nuevaTalla = async (req, res, next) => {
    try {
        const existeTalla = await Talla.findOne({ where: { Talla: req.body.talla } });

        if (!existeTalla) {
            const talla = await Talla.create({
                talla: req.body.talla,
                estado: req.body.estado
            });
            res.status(200).json({ mensaje: 'Se agregó la talla correctamente!', datos: talla });
        } else {
            res.status(409).json({ mensaje: 'La talla ya existe!' });
            next();
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Hubo un error al crear la talla!', tipo: `${error}` });
        next();
    }

};

const obtenerTallas = async (req, res, next) => {
    try {
        const tallas = await Talla.findAll();
        if (!tallas.length) {
            res.status(400).json({ mensaje: 'No hay tallas disponibles!' })
            next();
        } else {
            res.status(200).json(tallas);
        };
    } catch (error) {
        res.status(500).json({ mensaje: 'Hubo un error al obtener las tallas!', tipo: `${error}` });
        next();
    }

};

const eliminarTalla = async (req, res, next) => {
    try {
        const talla = await Talla.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!talla) {
            res.status(404).json({ mensaje: 'La talla no existe!' });
            next();
        } else {
            res.status(200).json({ mensaje: 'La talla se eliminó correctamente!' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Hubo un error al eliminar la talla!', tipo: `${error}` });
        next();
    }
};

const editarTalla = async (req, res, next) => {
    try {
        const existeTalla = await Talla.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!existeTalla) {
            res.status(404).json({ mensaje: 'La talla no se encontró!' });
            next()
        }else{

            await Talla.update({
                talla: req.body.talla,
                estado: req.body.estado
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({ mensaje: "La talla se editó correctamente!" });
    
        };
    } catch (error) {
        res.status(500).json({ mensaje: 'Hubo un error al editar la talla!', tipo: `${error}` });
        next();
    }
};

export {
    nuevaTalla,
    obtenerTallas,
    eliminarTalla,
    editarTalla
};
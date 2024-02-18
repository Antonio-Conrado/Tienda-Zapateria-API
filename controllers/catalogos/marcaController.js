import Marca from "../../models/Catalogos/Marca.js";

const nuevaMarca = async (req, res, next) => {
    try {
        const existeMarca = await Marca.findOne({ where: { nombre: req.body.nombre.trim() } });

        if (!existeMarca) {
            const marca = await Marca.create({
                nombre: req.body.nombre.trim(),
                estado: req.body.estado
            });
            res.status(200).json({ mensaje: 'Se agregó la marca correctamente!', datos: marca });
        } else {
            res.status(409).json({ mensaje: 'La marca ya existe!' });
            next();
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Hubo un error al crear la marca!', tipo: `${error}` });
        next();
    }

};

const obtenerMarcas = async (req, res, next) => {
    try {
        const marcas = await Marca.findAll();
        if (!marcas.length) {
            res.status(400).json({ mensaje: 'No hay marcas disponibles!' })
            next();
        } else {
            res.status(200).json(marcas);
        };
    } catch (error) {
        res.status(500).json({ mensaje: 'Hubo un error al obtener las marcas!', tipo: `${error}` });
        next();
    }

};

const eliminarMarca = async (req, res, next) => {
    try {
        const marca = await Marca.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!marca) {
            res.status(404).json({ mensaje: 'La marca no existe!' });
            next();
        } else {
            res.status(200).json({ mensaje: 'La marca se eliminó correctamente!' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Hubo un error al eliminar la marca!', tipo: `${error}` });
        next();
    }
};

const editarMarca = async (req, res, next) => {
    try {
        const existeMarca = await Marca.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!existeMarca) {
            res.status(404).json({ mensaje: 'La marca no se encontró!' });
            next()
        }else{

            await Marca.update({
                nombre: req.body.nombre.trim(),
                estado: req.body.estado
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({ mensaje: "La marca se editó correctamente!" });
    
        };
    } catch (error) {
        res.status(500).json({ mensaje: 'Hubo un error al editar la marca!', tipo: `${error}` });
        next();
    }
};

export {
    nuevaMarca,
    obtenerMarcas,
    eliminarMarca,
    editarMarca
};
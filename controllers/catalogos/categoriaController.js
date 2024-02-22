import Categoria from '../../models/Catalogos/Categoria.js';

const nuevaCategoria = async (req, res, next) => {
    try {
        const categoria = await Categoria.create({
                nombre : req.body.nombre.trim(),
                estado : req.body.estado
        });
        res.status(200).json({ mensaje: 'Se agregó la categoria correctamente!', datos: categoria });

    } catch (error) {
        res.status(500).json({ mensaje: 'Hubo un problema al crear la nueva categoria!', tipo: `${error}` });
        next();
    };
};

const obtenerCategorias = async (req, res, next) => {
    try {
        const categorias = await Categoria.findAll();
        if (!categorias.length) {
            res.status(400).json({ mensaje: "No hay categorias disponibles!" });
        } else {
            res.status(200).json(categorias);
        };

    } catch (error) {
        res.status(500).json({ mensaje: 'Hubo un problema al obtener las categorias!', tipo: `${error}` });
        next();
    };

};

const eliminarCategoria = async (req, res, next) => {
    try {
        const categoria = await Categoria.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!categoria) {
            res.status(404).json({ mensaje: "La categoria no se encontró!" });
        } else {
            res.status(200).json({ mensaje: "La categoria se eliminó exitosamente!" });
        };

    } catch (error) {
        res.status(500).json({ mensaje: 'Hubo un problema al eliminar la categoria!', tipo: `${error}` });
        next();
    };
};

const editarCategoria = async (req, res, next) => {
    try {
        const nuevoCategoria = await Color.update({
            nombre: req.body.nombre.trim(),
            estado: req.body.estado
        }, {
            where: {
                id: req.params.id
            },
        });

        if (nuevoCategoria[0] === 1) {
            res.status(200).json({ mensaje: "La categoria se editó correctamente!" });
        } else {
            res.status(404).json({ mensaje: 'El id de la categoria no se encontró!' });
        };

    } catch (error) {
        res.status(500).json({ mensaje: 'Hubo un problema al editar la categoria!', tipo: `${error}` });
        next();
    };

};


export {
    nuevaCategoria,
    obtenerCategorias,
    eliminarCategoria,
    editarCategoria
};
import db from "../../config/db.js";
import DetalleInventario from "../../models/DetalleInventario.js";
import Inventario from "../../models/Inventario.js";
import InventarioTalla from "../../models/InventarioTalla.js";
import InventarioColor from "../../models/InventarioColor.js";

//tablas relacionadas
import Categoria from "../../models/Catalogos/Categoria.js";
import Marca from "../../models/Catalogos/Marca.js";
import Talla from "../../models/Catalogos/Talla.js";
import Color from "../../models/Catalogos/Color.js";

import {
    verificarEstado,
    validacionesFormularios
} from "../../helpers/validacionesInventario.js";

const nuevoInventario = async (req, res, next) => {
    // estructura para el json con sus datos respectivos
    const { tblDetalleInventario, tblInventario, tblInventarioTalla, tblInventarioColor } = req.body;

    //verificar si existe el dato agregado o si el estado es false(No disponible) en tblDetalleInventario
    const estadoDisponible = await verificarEstado(tblDetalleInventario);
    if (estadoDisponible.estado) {
        return res.status(400).json({ mensaje: estadoDisponible.mensaje });
    };
    const validacion = await validacionesFormularios(tblInventario);
    if (validacion) {
        return res.status(400).json({ mensaje: validacion.mensaje })
    };

    const transaction = await db.transaction();
    try {
        const detalleInventario = await DetalleInventario.create(tblDetalleInventario, { transaction });

        // Crear un nuevo registro en Inventario dentro de la transacción
        tblInventario.idDetalleInventario = detalleInventario.idDetalleInventario;
        tblInventario.idUsuario = req.user.id;

        const inventario = await Inventario.create(tblInventario, { transaction });

        //InventarioTalla
        if (tblInventarioTalla && tblInventarioTalla.length > 0) {
            const tallas = await InventarioTalla.bulkCreate(
                tblInventarioTalla.map(item => ({
                    idInventario: inventario.dataValues.idInventario,
                    idTalla: item.idTalla
                })),
                { transaction }
            );
        } else {
            throw new Error('La talla es obligatoria!');
        }
        //InventarioColor

        if (tblInventarioColor && tblInventarioColor.length > 0) {

            const colores = await InventarioColor.bulkCreate(
                tblInventarioColor.map(item => ({
                    idInventario: inventario.dataValues.idInventario,
                    idColor: item.idColor
                })),
                { transaction }
            );
        } else {
            throw new Error('El color es obligatorio!');
        }
        // Confirmar la transacción si todo ha ido bien
        await transaction.commit();
        res.status(200).json({ mensaje: 'Inventario agregado correctamente!' });
    } catch (error) {
        // Si ocurre algún error, hacer rollback de la transacción
        await transaction.rollback();
        res.status(500).json({ error: "Hubo un problema al procesar la solicitud. Comuníquese con el Administrador!", tipo: `${error}` });
    }
};

const obtenerInventarios = async (req, res, next) => {
    try {
        const inventario = await Inventario.findAll({
            include: [
                {
                    model: DetalleInventario,
                    attributes: { exclude: ['idCategoria', 'idMarca'] },
                    include: [
                        {
                            model: Categoria
                        },
                        {
                            model: Marca
                        }
                    ],
                },
                {
                    model: Talla,
                    through: {
                        attributes: [] // Excluir todas las columnas de la tabla intermedia
                    }
                },
                {
                    model: Color,
                    through: {
                        attributes: [] // Excluir todas las columnas de la tabla intermedia
                    }
                }
            ],
            attributes: { exclude: 'idDetalleInventario' },
        });

        if (!inventario.length) {
            res.status(404).json({ mensaje: "No hay inventario disponible aún!" });
        } else {
            res.status(200).json(inventario);
        };

    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al procesar la solicitud. Comuníquese con el Administrador!", tipo: `${error}` });
    }
};

const obtenerInventario = async (req, res, next) => {
    const id = req.params.id;
    const inventarioExiste = await Inventario.findByPk(id);
    if (!inventarioExiste) {
        return res.status(400).json({ mensaje: 'El inventario no existe!' });
    };

    try {
        const inventario = await Inventario.findOne({
            include: [
                {
                    model: DetalleInventario,
                    attributes: { exclude: ['idCategoria', 'idMarca'] },
                    include: [
                        {
                            model: Categoria
                        },
                        {
                            model: Marca
                        }
                    ],
                },
                {
                    model: Talla,
                    through: {
                        attributes: [] // Excluir todas las columnas de la tabla intermedia
                    }
                },
                {
                    model: Color,
                    through: {
                        attributes: [] // Excluir todas las columnas de la tabla intermedia
                    }
                }
            ],
            attributes: { exclude: 'idDetalleInventario' },
            where: {
                idInventario: id
            }
        });

        res.status(200).json(inventario);
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al procesar la solicitud. Comuníquese con el Administrador!", tipo: `${error}` });
    }
};

const editarInventario = async (req, res, next) => {
    const id = req.params.id;
    const { tblInventario, tblDetalleInventario, tblInventarioTalla, tblInventarioColor } = req.body;
    const inventarioExiste = await Inventario.findByPk(id);
    if (!inventarioExiste) {
        return res.status(400).json({ mensaje: 'El inventario no existe!' });
    };

    //verificar si existe el dato agregado o si el estado es false(No disponible) en tblDetalleInventario
    const estadoDisponible = await verificarEstado(tblDetalleInventario);
    if (estadoDisponible.estado) {
        return res.status(400).json({ mensaje: estadoDisponible.mensaje });
    };
    const validacion = await validacionesFormularios(tblInventario);
    if (validacion) {
        return res.status(400).json({ mensaje: validacion.mensaje })
    };

    const transaction = await db.transaction();

    try {
        await DetalleInventario.update(
            tblDetalleInventario, {
            where: { idDetalleInventario: tblDetalleInventario.idDetalleInventario },
            transaction
        });
        //tblInventario
        tblInventario.idUsuario = req.user.id;
        await Inventario.update(
            tblInventario, {
            where: { idInventario: id },
            returning: true,
            transaction
        });

        //InventarioTalla

        if (tblInventarioTalla && tblInventarioTalla.length > 0) {
            for (const item of tblInventarioTalla) {
                const tallaExistente = await InventarioTalla.findOne({
                    where: {
                        idInventario: id,
                        idTalla: item.idTalla
                    }
                });

                if (tallaExistente) {
                    throw new Error('La Talla ya existe para el producto!');
                } else {
                    // Itera sobre cada elemento de tblInventarioTalla y actualiza los registros correspondientes en InventarioTalla
                    for (const item of tblInventarioTalla) {
                        await InventarioTalla.update(
                            { idTalla: item.idTalla },
                            {
                                where: {
                                    idInventarioTalla: item.idInventarioTalla
                                },
                                transaction
                            }
                        );
                    }
                }

            }
        } else {
            throw new Error('La talla es obligatoria!');
        }

        //InventarioColor
        if (tblInventarioColor && tblInventarioColor.length > 0) {
            for (const item of tblInventarioColor) {
                const ColorExistente = await InventarioColor.findOne({
                    where: {
                        idInventario: id,
                        idColor: item.idColor
                    }
                })

                if (ColorExistente) {
                    throw new Error('El color ya existe para el producto!');
                } else {
                    // Itera sobre cada elemento de tblInventarioColor y actualiza los registros correspondientes en InventarioColor
                    for (const item of tblInventarioColor) {
                        await InventarioColor.update(
                            { idColor: item.idColor },
                            {
                                where: {
                                    idInventarioColor: item.idInventarioColor
                                },
                                transaction
                            }
                        );
                    }
                }
            }
        } else {
            throw new Error('El color es obligatorio!');
        }

        // Confirmar la transacción si todo ha ido bien
        await transaction.commit();
        res.status(200).json({ mensaje: 'Inventario actualizado correctamente!' });

    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: "Hubo un problema al procesar la solicitud. Comuníquese con el Administrador!", tipo: `${error}` });
    }
};


const eliminarInventario = async (req, res) => {
    const id = req.params.id;
    const inventarioExiste = await Inventario.findByPk(id);
    if (!inventarioExiste) {
        return res.status(400).json({ mensaje: 'El inventario no existe!' });
    };

    try {
        await Inventario.destroy({ where: { idInventario: id } });
        res.status(200).json({ mensaje: 'El inventario se eliminó correctamente!' })
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al procesar la solicitud. Comuníquese con el Administrador!", tipo: `${error}` });
    }

}
export {
    nuevoInventario,
    obtenerInventarios,
    obtenerInventario,
    editarInventario,
    eliminarInventario
};

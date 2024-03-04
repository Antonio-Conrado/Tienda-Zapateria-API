import db from "../../config/db.js";
import DetalleInventario from "../../models/DetalleInventario.js";
import Inventario from "../../models/Inventario.js";

//tablas relacionadas
import Categoria from "../../models/Catalogos/Categoria.js";
import Marca from "../../models/Catalogos/Marca.js";
import Talla from "../../models/Catalogos/Talla.js";
import Color from "../../models/Catalogos/Color.js";

const nuevoInventario = async (req, res, next) => {
    // estructura para el json con sus datos respectivos
    const { tblDetalleInventario, tblInventario, usuario } = req.body;

    //verificar si existe el dato agregado o si el estado es false(No disponible) en tblDetalleInventario
    const resultadoVerificacion = await verificarEstado(tblDetalleInventario);
    if (resultadoVerificacion.estado) {
        return res.status(400).json({ mensaje: resultadoVerificacion.mensaje });
    };

    if(tblInventario.existencia < 1 || tblInventario.precio < 1 ){
        return res.status(400).json({ mensaje: 'Cantidad no válida!'});
    };

    if(!usuario.id){
        return res.status(400).json({ mensaje: 'No está autorizado para realizar la acción. Inicie sesión, por favor!'});
    };

    const transaction = await db.transaction();

    try {
        const detalleInventario = await DetalleInventario.create(tblDetalleInventario, { transaction });

        // Crear un nuevo registro en Inventario dentro de la transacción
        tblInventario.idDetalleInventario = detalleInventario.idDetalleInventario;
        tblInventario.idUsuario = usuario.id;
        
        const inventario = await Inventario.create(tblInventario, { transaction });

        // Confirmar la transacción si todo ha ido bien
        await transaction.commit();

        res.status(200).json({ mensaje: 'Inventario agregado correctamente!', detalleInventario, inventario });
    } catch (error) {
        // Si ocurre algún error, hacer rollback de la transacción
        await transaction.rollback();
        res.status(500).json({ error: "Hubo un problema al procesar la solicitud. Comuníquese con el Administrador!", tipo: `${error}` });
    }
};

const verificarEstado = async (tblDetalleInventario) => {
    const { idCategoria, idMarca, idColor, idTalla } = tblDetalleInventario;

    const categoria = await Categoria.findByPk(idCategoria);
    const marca = await Marca.findByPk(idMarca);
    const talla = await Talla.findByPk(idTalla);
    const color = await Color.findByPk(idColor);

    if (!categoria || !marca || !talla || !color) {
        return { mensaje: 'Todos los campos son obligatorios en Detalles Inventario!', estado: true };
    };

    if (talla.dataValues.estado === false) {
        return { mensaje: `No disponible talla ${talla.dataValues.talla}!`, estado: true }
    };

    const datos = [categoria, color, marca];
    let mensajeError;
    datos.forEach(dato => {
        if (dato.dataValues.estado === false) {
            mensajeError = { mensaje: `No disponible ${dato.dataValues.nombre}!`, estado: true }
        }

    });
    if (mensajeError) return mensajeError;

    return { estado: false };
};


export { nuevoInventario };

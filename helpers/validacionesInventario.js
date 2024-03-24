import Categoria from "../models/Catalogos/Categoria.js";
import Marca from "../models/Catalogos/Marca.js";

const validacionesFormularios =  async(tblInventario) =>{
    if (tblInventario.nombre === '' || tblInventario.descripcion === '') {
        return { mensaje: 'Nombre y Descripción son obligatorios!' };
    };

    if (tblInventario.existencia < 1 || tblInventario.precio < 1 || tblInventario.descuentoMax < 1 || tblInventario.descuentoMax > 100) {
        return { mensaje: 'Cantidad no válida!' };
    };

    if (tblInventario.descuento === true) {
        tblInventario.descuentoMax = tblInventario.descuentoMax;
    } else {
        tblInventario.descuentoMax = null;
    }
};

const verificarEstado = async (tblDetalleInventario) => {
    const { idCategoria, idMarca } = tblDetalleInventario;

    const categoria = await Categoria.findByPk(idCategoria);
    const marca = await Marca.findByPk(idMarca);

    if (!categoria || !marca) {
        return { mensaje: 'Todos los campos son obligatorios en Detalles Inventario!', estado: true };
    };

    const datos = [categoria, marca];
    let mensajeError;
    datos.forEach(dato => {
        if (dato.dataValues.estado === false) {
            mensajeError = { mensaje: `No disponible ${dato.dataValues.nombre}!`, estado: true }
        }

    });
    if (mensajeError) return mensajeError;

    return { estado: false };
};

export {
    validacionesFormularios,
    verificarEstado
    
};
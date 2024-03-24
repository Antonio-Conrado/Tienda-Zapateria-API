import { Sequelize } from "sequelize";
import db from "../config/db.js";

//models
import DetalleInventario from "./DetalleInventario.js";
import Usuario from "./Usuario/Usuario.js";

const Inventario  = db.define('inventarios',{
    idInventario : {
        type :Sequelize.INTEGER,
        primaryKey  : true,
        autoIncrement : true
    },
    nombre : {
        type : Sequelize.STRING(100),
        validate : {
            notEmpty: {
                msg : 'El nombre no puede ir vacío!'
            }
        },
        allowNull : false

    },
    descripcion : {
        type : Sequelize.STRING(300),
        validate : {
            notEmpty: {
                msg : 'La descripción no puede ir vacía!'
            }
        },
        allowNull : false

    },
    existencia : {
        type :  Sequelize.INTEGER,
        validate : {
            notEmpty: {
                msg : 'Cantidad no válida'
            }
        },
        allowNull : false
    },
    precio : {
        type :  Sequelize.INTEGER,
        validate : {
            notEmpty: {
                msg : 'Cantidad no válida'
            }
        },
        allowNull : false
    },
    descuento : {
        type : Sequelize.BOOLEAN,
        defaultValue : false
    },
    descuentoMax : Sequelize.INTEGER,
    fecha : {
        type:  Sequelize.DATE,
        defaultValue :  () => new Date()
    },
    lote : Sequelize.STRING,
    estado :  {
        type : Sequelize.BOOLEAN,
        defaultValue : true
    }
});

Inventario.belongsTo(DetalleInventario, { foreignKey: 'idDetalleInventario' , allowNull : false});
Inventario.belongsTo(Usuario, { foreignKey: 'idUsuario' , allowNull : false});

export default Inventario;
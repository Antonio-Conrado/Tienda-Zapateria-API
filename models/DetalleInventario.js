import { Sequelize } from "sequelize";
import db from "../config/db.js";

//models
import Categoria from "./Catalogos/Categoria.js";
import Color from "./Catalogos/Color.js";
import Marca from './Catalogos/Marca.js';
import Talla from "./Catalogos/Talla.js";

const DetalleInventario = db.define('detalleInventarios',{
    idDetalleInventario : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    }
});

DetalleInventario.belongsTo(Categoria, { foreignKey: 'idCategoria', allowNull: false});
DetalleInventario.belongsTo(Color, { foreignKey: 'idColor', allowNull: false });
DetalleInventario.belongsTo(Talla, { foreignKey: 'idTalla', allowNull: false });
DetalleInventario.belongsTo(Marca, { foreignKey: 'idMarca', allowNull: false });



export default DetalleInventario;
import { Sequelize } from "sequelize";
import db from "../config/db.js";

//models
import Categoria from "./Catalogos/Categoria.js";
import Marca from './Catalogos/Marca.js';

const DetalleInventario = db.define('detalleInventarios',{
    idDetalleInventario : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    }
});

DetalleInventario.belongsTo(Categoria, { foreignKey: 'idCategoria', allowNull: false});
DetalleInventario.belongsTo(Marca, { foreignKey: 'idMarca', allowNull: false });

export default DetalleInventario;
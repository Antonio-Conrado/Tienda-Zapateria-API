import { Sequelize } from "sequelize";
import db from "../config/db.js";

//models
import Talla from "./Catalogos/Talla.js";
import Inventario from "./Inventario.js";

const InventarioTalla = db.define('inventarioTalla',{
    idInventarioTalla : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    }
});

Inventario.belongsToMany(Talla, { through: InventarioTalla,  foreignKey: 'idInventario', allowNull : false});
Talla.belongsToMany(Inventario, { through: InventarioTalla, foreignKey: 'idTalla', allowNull : false });

export default InventarioTalla;
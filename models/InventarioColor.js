import { Sequelize } from "sequelize";
import db from "../config/db.js";

//models
import Color from "./Catalogos/Color.js";
import Inventario from "./Inventario.js";

const InventarioColor = db.define('inventarioColor',{
    idInventarioColor : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    }
});

Inventario.belongsToMany(Color, { through: InventarioColor,  foreignKey: 'idInventario', allowNull : false});
Color.belongsToMany(Inventario, { through: InventarioColor, foreignKey: 'idColor', allowNull : false });

export default InventarioColor;
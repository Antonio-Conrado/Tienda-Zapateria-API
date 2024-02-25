import { Sequelize } from "sequelize";
import db from '../../config/db.js';

const Talla = db.define('tallas',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    talla : {
        type : Sequelize.INTEGER,
        validate:{
            notEmpty : {
                msg  : 'La talla no puede ir vacía!'
            }
        },
        unique : {
            msg : 'La talla ya existe!'
        }
    },
    estado : {
        type : Sequelize.BOOLEAN,
        allowNull : false
    }

});

export default Talla;
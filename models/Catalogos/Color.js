import { Sequelize } from "sequelize";
import db from '../../config/db.js';

const Color = db.define('colores',{
    id: {
        type : Sequelize.INTEGER,
        primaryKey :true,
        autoIncrement : true
    },
    nombre : {
        type : Sequelize.STRING(20),
        validate:{
            notEmpty : {
                msg  : 'El nombre no puede ir vacío!'
            }
        },
        unique : {
            msg : 'El color ya existe!'
        }
    },
    estado : {
        type : Sequelize.BOOLEAN,
        allowNull : false
    }
    
});

export default Color;
import { Sequelize } from "sequelize";
import db from '../../config/db.js';

const Marca = db.define('marcas',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    nombre : {
        type : Sequelize.STRING(25),
        validate:{
            notEmpty : {
                msg  : 'El nombre no puede ir vacío!'
            }
        },
        unique : {
            msg : 'La marca ya existe!'
        }
    },
    estado : {
        type : Sequelize.BOOLEAN,
        allowNull : false
    }

});

export default Marca;
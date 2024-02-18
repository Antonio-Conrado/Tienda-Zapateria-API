import  Sequelize, { INTEGER }  from "sequelize";
import db from '../../config/db.js';

const Categoria = db.define('categorias',{
    id:{
        type : Sequelize.INTEGER,
        primaryKey :true,
        autoIncrement : true
    },
    nombre:{
        type: Sequelize.STRING(200),
        validate:{
            notEmpty : {
                msg  : 'El nombre no puede ir vacío!'
            }
        }
    },
    estado : {
        type : Sequelize.BOOLEAN,
        allowNull : false
    }

});

export default Categoria;
import { Sequelize } from "sequelize";
import db from "../../config/db.js";
const Rol = db.define('roles',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    nombre : {
        type : Sequelize.STRING(20),
        unique : {
            msg : 'El Rol ya existe!'
        },
        validate : {
            notEmpty : {
                msg : 'El nombre no puede ir vacío!'
            }
        }
    },
    estado : {
        type : Sequelize.BOOLEAN,
        allowNull : false
    }
});

export default Rol;
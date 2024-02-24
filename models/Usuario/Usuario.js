import  {Sequelize} from 'sequelize';
import bcrypt from 'bcrypt';
import Rol from './Rol.js';
import db from '../../config/db.js'; 


const Usuario = db.define('usuarios',{
    id : {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    nombres : {
        type : Sequelize.STRING,
        validate:{
            notEmpty : {
                msg  : 'El nombre no puede ir vacío!'
            }
        }
    },
    apellidos : {
        type : Sequelize.STRING,
        validate:{
            notEmpty : {
                msg  : 'El apellido no puede ir vacío!'
            }
        }
    },
    telefono : Sequelize.STRING,
    email  : {
        type : Sequelize.STRING,
        unique:{
                msg  : 'El email ya existe!'
        },
        validate:{
            isEmail : {
                msg: 'El email no es válido!'
            }
        }
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false,
        validate:{
            notEmpty : {
                msg: 'El password no puede ir vacío!'
            }
        }
    },
    token : {
        type : Sequelize.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    confirmado : {
        type: Sequelize.BOOLEAN,
        defaultValue : false
    },
    estado :  {
        type : Sequelize.BOOLEAN,
        defaultValue : true
    }
    // idRol: { 
    //     type: Sequelize.INTEGER,
    //     references: {
    //         model: 'roles', 
    //         key: 'id' 
    //     }
    // }
},{
    hooks:{
        beforeCreate(usuario){
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10))
        }
    }
});

Usuario.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

Usuario.belongsTo(Rol);//un rol pertenece a un usuario
// Usuario.belongsTo(Rol, { foreignKey: 'idRol' });


export default Usuario;
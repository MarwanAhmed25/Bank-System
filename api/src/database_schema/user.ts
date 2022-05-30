import { DataTypes } from "sequelize";

const users = {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail: true,
            unique:true,
        }
    },
    accepted: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    password: {
        type: DataTypes.STRING,
        validate:{
            min:8,
            isNull: false,
            
        }
        
    },
    name: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING,
        validate:{
            isNumeric: true
        }
    },
    status: {
        type: DataTypes.STRING,
        validate:{
            isIn:[['active', 'deactive', 'suspended']]
        }
    },
    role: {
        type: DataTypes.STRING,
        validate:{
            isIn: [['user', 'admin']]
        }
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            unique: true
        }
    }
}

export default users;
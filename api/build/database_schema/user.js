"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const users = {
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            unique: true,
        }
    },
    accepted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        default: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            min: 8,
            isNull: false,
        }
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            isNumeric: true
        }
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            isIn: [['active', 'deactive', 'suspended']]
        }
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            isIn: [['user', 'admin']]
        }
    },
    slug: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            unique: true
        }
    }
};
exports.default = users;

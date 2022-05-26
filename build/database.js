"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("./database_schema/user"));
const account_1 = __importDefault(require("./database_schema/account"));
const transfare_operations_1 = __importDefault(require("./database_schema/transfare_operations"));
const sequelize = new sequelize_1.Sequelize('postgres://marwan:marwan@localhost:5432/store'); // Example for postgres
const User = sequelize.define('user', user_1.default);
const Account = sequelize.define('account', account_1.default);
const Operation = sequelize.define('operation', transfare_operations_1.default);
const create = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    await sequelize.sync({ force: true });
    console.log('created tables...');
};
exports.default = create;

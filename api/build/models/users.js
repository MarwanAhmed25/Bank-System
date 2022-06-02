"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const database_1 = __importDefault(require("../database"));
//get the user model
const user_model = database_1.default.User;
//class of CRUD operation in user model
class User {
    //show all rows in the user table
    async index() {
        try {
            return await user_model.findAll();
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
    //show one row in the user table
    async show(slug) {
        try {
            return await user_model.findAll({ where: { slug: slug } });
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
    //add new row in the user table
    async create(u) {
        try {
            u.slug = u.email.split('@')[0];
            return await user_model.create(u);
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
    //update exist row in the user table
    async update(u) {
        try {
            const result = await user_model.update(u, { where: { slug: u.slug } });
            console.log(result);
            return 'updated';
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
    //delete one row in the user table
    async delete(slug) {
        try {
            const result = await user_model.destroy({ where: { slug: slug } });
            console.log(result);
            return 'deleted';
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
    //login
    async login(email, password) {
        const result = await user_model.findOne({ where: { email: email } });
        try {
            const exist_password = result === null || result === void 0 ? void 0 : result.getDataValue('password');
            if (result && (exist_password === password))
                return result;
        }
        catch (e) {
            throw new Error('Email or password wrong.');
        }
    }
}
exports.User = User;
;

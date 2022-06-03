import db from '../database';
import bcrypt from 'bcrypt';
import config from '../config/config';

//get the account model
const account_model = db.Account;

export type account = {
    email: string,
    accepted: boolean,
    password: string,
    name: string,
    phone: string,
    status: string,
    role: string,
    slug?: string
}
//class of CRUD operation in account model
export class Account {
    //show all rows in the account table
    async index() {
        try {
            return await account_model.findAll({where: {role:'account'}});
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    //show one row in the account table
    async show(slug: string) {
        try {
            return await account_model.findOne({ where: { slug: slug } });
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    //add new row in the account table
    async create(u: account) {
        try {      
               //hashin password using round and extra from .env file and password from request.body
        const hash = bcrypt.hashSync(u.password + config.extra_password, parseInt(config.password_round as string));
        u.password = hash;      
            return await account_model.create(u);
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    //update exist row in the account table
    async update(email: string, name: string, slug:string, phone:string, old_slug:string) {
        try {
            const result = await account_model.update({email, name, slug, phone}, { where: { slug: old_slug } ,returning: true});
            console.log(result);

            return result;
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    //delete one row in the account table
    async delete(slug: string) {
        try {
            const result = await account_model.destroy({ where: { slug: slug } });
            console.log(result);
            
            return 'deleted';
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    
};


import db from '../database';
//get the user model
const user_model = db.User;

export type user = {
    id?: number,
    email: string,
    accepted: boolean,
    password: string,
    name: string,
    phone: string,
    status: string,
    role: string,
    slug?: string
}
//class of CRUD operation in user model
export class User {
    //show all rows in the user table
    async index() {
        try {
            return await user_model.findAll();
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    //show one row in the user table
    async show(slug: string) {
        try {
            return await user_model.findAll({ where: { slug: slug } });
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    //add new row in the user table
    async create(u: user) {
        try {
            u.slug = u.email.split('@')[0];
            return await user_model.create(u);
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    //update exist row in the user table
    async update(u: user) {
        try {
            const result = await user_model.update(u, { where: { slug: u.slug } });
            return 'updated';
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    //delete one row in the user table
    async delete(slug: string) {
        try {
            const result = await user_model.destroy({ where: { slug: slug } });
            return 'deleted';
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
};


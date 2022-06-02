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
            return await user_model.findAll({where: {role:'user'}});
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    //show one row in the user table
    async show(slug: string) {
        try {
            return await user_model.findOne({ where: { slug: slug } });
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    //add new row in the user table
    async create(u: user) {
        try {            
            return await user_model.create(u);
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    //update exist row in the user table
    async update(email: string, name: string, slug:string, phone:string, old_slug:string) {
        try {
            const result = await user_model.update({email, name, slug, phone}, { where: { slug: old_slug } });
            console.log(result);

            return 'updated';
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    //delete one row in the user table
    async delete(slug: string) {
        try {
            const result = await user_model.destroy({ where: { slug: slug } });
            console.log(result);
            
            return 'deleted';
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    //login
    async login(email:string, password:string) {
        const result = await user_model.findOne({where: {email: email}});
        try{
            const exist_password = result?.getDataValue('password');
            if(result && (exist_password === password))
                return result;
        }catch(e){
            throw new Error('Email or password wrong.');
        }
    }
    //update exist row in the user table
    async update_from_admin(accepted: boolean, status: string, slug:string) {
        try {
            const result = await user_model.update({accepted, status}, { where: { slug: slug } });
            console.log(result);

            return 'updated';
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
};


import { Sequelize } from 'sequelize';
import user from './database_schema/user';
import account from './database_schema/account';
import operation from './database_schema/transfare_operations';

const sequelize = new Sequelize('postgres://marwan:marwan@localhost:5432/store') // Example for postgres


const User = sequelize.define('user', user);
const Account = sequelize.define('account', account);
const Operation = sequelize.define('operation', operation);


const create = async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    
    await sequelize.sync({force:true});
    console.log('created tables...');

}
export default { create, User, Account, Operation };
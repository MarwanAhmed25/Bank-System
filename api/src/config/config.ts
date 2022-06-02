import dotenv from 'dotenv';

dotenv.config();

const config = {
    secret: process.env.secret,
}

export default config;
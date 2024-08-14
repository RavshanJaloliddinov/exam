import { config } from "dotenv";

config()

export const databaseConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    post: process.env.DB_POST,
    database: process.env.DB_DATABASE
}
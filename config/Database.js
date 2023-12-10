import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Initialisasi database baru dengan nama code_blog dan usernya root tanpa ada password
const db = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQLUSER, process.env.MYSQLPASSWORD, {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    dialect: 'mysql'
});


export default db;
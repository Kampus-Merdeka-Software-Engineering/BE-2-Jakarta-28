import { Sequelize } from "sequelize";

// Initialisasi database baru dengan nama code_blog dan usernya root tanpa ada password
const db = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQLUSER, process.env.MYSQLPASSWORD, {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    dialect: 'mysql'
});


// Initialisasi mysql railway
// const db = new Sequelize("railway", "root", "adHhDbEaB3he22gGdh1cHadG5h45-b3E", {
//     host: "monorail.proxy.rlwy.net",
//     dialect: "mysql"
// });

export default db;
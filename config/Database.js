import { Sequelize } from "sequelize";

// Initialisasi database baru dengan nama code_blog dan usernya root tanpa ada password
const db = new Sequelize(`code_blog`, 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;
import { DataTypes } from "sequelize";
import db from "../config/Database.js";

<<<<<<< HEAD
//Membuat design database news
const News = db.define("news", {
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    content: DataTypes.TEXT,
=======
//Membuat design database news 
const News = db.define('news', {
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    image: DataTypes.STRING,
    content: DataTypes.TEXT
>>>>>>> abc189fc725cce53509d469dcb572ba3f21ca4af
});

// Mengexport database news
export default News;

// Ini untuk sinkronisasi agar bisa membuat tabel di db code_blog
(async () => {
    await db.sync();
})();
<<<<<<< HEAD
=======

>>>>>>> abc189fc725cce53509d469dcb572ba3f21ca4af

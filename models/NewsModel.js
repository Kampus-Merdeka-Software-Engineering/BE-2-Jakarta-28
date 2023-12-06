import { DataTypes } from "sequelize";
import db from "../config/Database.js";

//Membuat design database news
const News = db.define("news", {
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    content: DataTypes.TEXT,
});

// Mengexport database news
export default News;

// Ini untuk sinkronisasi agar bisa membuat tabel di db code_blog
(async () => {
    await db.sync();
})();

import { DataTypes } from "sequelize";
import db from "../config/Database.js";

//Membuat design database blogs
const Blogs = db.define("blogs", {
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    author: DataTypes.STRING,
    published_date : DataTypes.DATE,
    content: DataTypes.TEXT
});

// Mengexport database blogs
export default Blogs;

// Ini untuk sinkronisasi agar bisa membuat tabel di db code_blog
(async () => {
    await db.sync();
})();

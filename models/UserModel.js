import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const User = db.define(`users`, {
    uuid: {
        type: DataTypes.STRING,
        // Kemudian disini akan meregenerate id secara otomatis untuk user
        defaultValue: DataTypes.UUIDV4,
        // Kemudian disini kita dapat set agar datanya tidak null
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        // Kemudian disini kita dapat set agar datanya tidak null
        allowNull: false,
        validate: {
            notEmpty: true,
            // Kemudian disini untuk namanya kita dapat set minimum karakter 3 dan maksimum karakter ada 100
            len: [3,100]
        }
    },
    email: {
        type: DataTypes.STRING,
        // Kemudian disini kita dapat set agar datanya tidak null
        allowNull: false,
        validate: {
            notEmpty: true,
            // Jadi disini kita dapat cek apakah data yang dimasukkan benar-benar email
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        // Kemudian disini kita dapat set agar datanya tidak null
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

export default User;
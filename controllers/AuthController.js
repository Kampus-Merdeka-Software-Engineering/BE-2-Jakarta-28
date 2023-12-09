import User from "../models/UserModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

// Login
export const Login = async(req,res) => {
    // Kemudian kita dapat login berdasarkan email
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    // Lalu disini kita dapat return status 404 apaila usernya tidak diketemukan
    if(!user) {
        return res.status(404).json({message: "No User Found"})
    };

    // Apabila usernya ditemukan, maka disini kita dapat menggunakan argon2 untuk verifikasi password yang ada didatabse dengan password yang dimasukkan oleh user
    const match = await argon2.verify(user.password, req.body.password);

    // Apabila password yang dimasukkan tidak cocok dengan yang ada didatabase, maka akan direturn error
    if(!match) {
        return res.status(400).json({message: "Wrong Password, Please Try Again"});
    }
    
    // Lalu disini kita dapat pass data yang diperlukan untuk login
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;

    // Lalu disini kita dapat initialisasi untuk json webtokennya
    const jwtToken = jwt.sign({ uuid }, process.env.ACCESS_TOKEN);

    // Kemudian kita dapat kirimkan datanya dalam bentuk json
    res.status(200).json({uuid, name, email, jwtToken});
};
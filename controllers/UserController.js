import User from "../models/UserModel.js";
import argon2 from "argon2";

// Kemudian disini kita dapat mengambil semua user
export const getUsers = async(req,res) => {
    try {
        const response = await User.findAll({
            // Kemudian disini kita dapat set data apa saja yang mau ditampilkan dari tabel user di kolom
            attributes: [`uuid`, `name`, `email`]
        });
        // Kemudian kita dapat kirim data tersebut
        res.status(200).json(response);
    } catch (error) {
        // kalau ada error, maka kita akan tampilkan error messagenya
        res.status(500).json({message: error.message});
    }
};

// Kemudian disini kita dapat mengambil user byId
export const getUserById = async(req, res) => {
    try {
        const response = await User.findOne({
            // Kemudian disini kita dapat set data apa saja yang mau ditampilkan dari tabel user di kolom
            attributes: [`uuid`, `name`, `email`],
            // Lalu kita dapat cari user sesai idnya
            where: {
                uuid: req.params.id
            }
        });
        // Kemudian disini kita dapat pass datanya
        res.status(200).json(response);
    } catch (error) {
        // kalau ada error, maka kita akan tampilkan error messagenya
        res.status(500).json({message: error.message});
    }
};

// Kemudian disini kita dapat membuat user baru
export const createUser = async(req, res) => {
    const {name, email, password, confirmPassword} = req.body;
    // Kemudian disini kita cek apabila password tidak sama dengan confirm password, maka kita akan mengirimkan error
    if(password != confirmPassword) {
        return res.status(400).json({message: "Password and Confirm Password are not match"});
    }

    // Kemudian kita dapat menghash passwordnya
    const hashPassword = await argon2.hash(password);

    // Kemudian kita dapat membuat user baru dengan passwordnya
    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword,
        });
        res.status(200).json({message: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

// Kemudian disini kita dapat update usernya
export const updateUser = async(req,res) => {
    // Kemudian kita dapat cari dulu usernya
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });

    // Kemudian disini kita dapat return status 404 apabila usernya tidak ketemu
    if(!user) {
        return res.status(404).json({message: "No User Found"});
    };

    // Kemudian disini kita dapat ambil dulu seluruh data usernya
    const {name, email, password, confirmPassword} = req.body;

    // Kemudian kita dapat deklarasikan variabel hash password
    let hashPassword;

    // Kemudian disini kita dapat cek passwordnya null atau tidak
    if(password === "" || password === null) {
        // Kalau null disini, maka ia akan tetap menggunakan password yang lama
        hashPassword = user.password;
    } else {
        // Kalau tidak null, maka akan dibuatkan password baru
        hashPassword = await argon2.hash(password);
    }

    // Kemudian disini kita cek lagi apabila password tidak sama dengan confirm password, maka kita akan mengirimkan error
    if(password != confirmPassword) {
        return res.status(400).json({message: "Password and Confirm Password are not match"});
    }

    // Lalu disini kita dapat update databasenya
    try {
        await User.update({
            name: name,
            email: email,
            password: hashPassword
        } , {
            // Kita dapat update usernya sesuai dengan id
            where: {
                id: user.id
            }
        });
        res.status(200).json({message: "User Updated"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

// Kemudian disini kita dapat deleteUser
export const deleteUser = async(req, res) => {
    // jadi kita dapat cari dulu user by idnya
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });

    // Lalu disini kita dapat return status 404 apaila usernya tidak diketemukan
    if(!user) {
        return res.status(404).json({message: "No User Found"})
    };

    // Lalu disini kita dapat update databsenya 
    try {
        await User.destroy ({
            where: {
                id: user.id
            }
        });
        // Apabila berhasil ke delete, maka kita akan mengirimkan message
        res.status(200).json({message: "User has been deleted"});
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
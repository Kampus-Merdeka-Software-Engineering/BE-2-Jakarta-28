import User from "../models/UserModel.js";

const verifyUser = async(req, res, next) => {
    // jadi disini kita cek kalau gak ada session, maka akan dikirimkan message untuk login dengan akun email user admin
    if(!req.session.userId) {
        return res.status(401).json({message: "Please login using your admin account"});
    };

    // Jika ada session, maka kita dapat cek apakah usernya ada didatabase atau tidak
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });

    // Lalu disini kita dapat return status 404 apabila usernya tidak ketemu
    if(!user) {
        return res.status(404).json({message: "No User found"});
    }

    // Berikut kita dapat cek idnya
    req.userId = user.id;

    // Setelah itu kita dapat masukkan next untuk ke middleware selanjutnya 
    next();
}

export default verifyUser;
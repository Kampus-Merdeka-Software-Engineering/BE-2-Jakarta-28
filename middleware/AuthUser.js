import jwt from 'jsonwebtoken';

const verifyUser = async(req, res, next) => {
    try {
        // jadi disini kita akan verify jwt tokennya
        const accessToken = req.headers["x-access-token"];
    
        // Setelah itu kita dapat masukkan next untuk ke middleware selanjutnya 
        await jwt.verify(accessToken, process.env.ACCESS_TOKEN);
    
        next();
    } catch (error) {
        res.status(401).json({message: "Unauthorized"});
    }
}

export default verifyUser;
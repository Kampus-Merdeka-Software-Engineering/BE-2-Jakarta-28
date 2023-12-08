import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv  from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import FileUpload from "express-fileupload";
import session from "express-session";
import BlogsRoutes from "./routes/BlogRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";

// Initiliaze dotenv
dotenv.config();

// initialize server
const app = express();
const port = 5000;

// Kemudian disini kita dapat set session, jadi apabila sebelumnya kita sudah login, maka kita dapat tetap login lagi
// const sessionStore = SequelizeStore(session.Store);

// const store = new sessionStore({
//     db: db
// });

// untuk sinkronisasi db disini
// (async ()=> {
//     await db.sync();
// }) ();

// Middleware
// ini konfigurasi untuk menggunakan session
// app.use(session({
//     secret: process.env.SESS_SECRET,
//     resave: false,
//     saveUninitialized: true,

//     // Lalu kita dapat set apabila server di restart dan kita sudah login, maka kita akan tetap login 
//     store: store,
//     cookie: {
//         // ini auto agar bisa keganti dari http(localhost) menjadi https(online)
//         secure: "auto"
//     }
// }));


// Cors agar API kita bisa diakses darimana saja
app.use(cors());

// Body parser disini agar bisa menggunakan request.body atau response.body
app.use(bodyParser.urlencoded({extended: false}));

// Kita dapat set agar bodynya dapat menggunakan data json
app.use(bodyParser.json());

// Kita dapat set express.json
app.use(express.json());

// Kita dapat menggunakan middleware file upload agar bisa mengupload image
app.use(FileUpload());

// Kemudian kita bisa set folder public jadi public agar bisa kebaca imagenya melalui url
app.use(express.static("public"));

// Kita dapat use routes untuk Blogsnya
app.use(BlogsRoutes);

// Kita dapat use untuk user routenya
app.use(UserRoutes);

// Kita dapat use untuk auth routenya
app.use(AuthRoutes);

// ini untuk menciptakan tabel session
// store.sync();

// Menjalankan server
app.listen(port, () => {
    console.log(`Server is up and running at port ${port}`);
});
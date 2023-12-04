import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import NewsRoutes from "./routes/NewsRoutes.js";
<<<<<<< HEAD
import FileUpload from "express-fileupload";
=======
>>>>>>> abc189fc725cce53509d469dcb572ba3f21ca4af

// initialize server
const app = express();
const port = 5000;

// Middleware
// 1. Cors agar API kita bisa diakses darimana saja
app.use(cors());

// 2. Body parser disini agar bisa menggunakan request.body atau response.body
app.use(bodyParser.urlencoded({extended: false}));

// 3. Kita dapat set agar bodynya dapat menggunakan data json
app.use(bodyParser.json());

// 4. Kita dapat set express.json
app.use(express.json());

<<<<<<< HEAD
// 5. Kita dapat menggunakan middleware file upload agar bisa mengupload image
app.use(FileUpload());

// 6. Kemudian kita bisa set folder public jadi public agar bisa kebaca imagenya melalui url
app.use(express.static("public"));

// 8. Kita dapat use routes untuk Newsnya
=======
// 5. Kita dapat use routes untuk Newsnya
>>>>>>> abc189fc725cce53509d469dcb572ba3f21ca4af
app.use(NewsRoutes);

// Menjalankan server
app.listen(port, () => {
    console.log(`Server is up and running at port ${port}`);
});
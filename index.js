import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import NewsRoutes from "./routes/NewsRoutes.js";

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

// 5. Kita dapat use routes untuk Newsnya
app.use(NewsRoutes);

// Menjalankan server
app.listen(port, () => {
    console.log(`Server is up and running at port ${port}`);
});



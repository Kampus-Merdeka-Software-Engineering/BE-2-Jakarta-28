import Blogs from "../models/BlogModel.js";
import path from "path";
import fs from "fs";

// Mengambil semua Blogs
export const getBlogs = async (req,res) => {
    try {
        const response = await Blogs.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// Disini kita mau mengambil Blogs by slugnya
export const getBlogBySlug = async(req,res) => {
    try {
        const response = await Blogs.findOne({
            where: {
                slug: req.params.slug
            }
        });
        // Kemudian disini kita dapat balas dengan isi datanya dalam bentuk json
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// Membuat Blogs baru 
export const createBlog = async(req,res) => {
    // Lalu disini kita cek apakah ada file gambar yang di upload?
    // Kalau tidak ada maka kita akan kirimkan respond 400
    if(req.files === null) {
        return res.status(400).json({message: "No File Uploaded"});
    }

    // kita ambil dulu input title, slug dan contentnya dari body
    const {title, slug, author, published_date, content} = req.body;

    // Kalau ada maka kita akan mengambil filenya dan file length
    const file = req.files.file;
    // Lalu kita dapat mengambil ukuran file yang di upload
    const fileSize = file.data.length;
    // Kemudian kita dapat mengambil extension filenya
    const ext = path.extname(file.name);
    // Lalu kita dapat menggabungkan nama file tersebut dengan extensionnya
    // contoh : image.jpg
    const fileName = file.md5 + ext;

    // Kemudian disini kita dapat set url agar bisa mengakses image di localhost kita
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    // Kemudian kita dapat set tipe extension apa saja yang boleh digunakan
    const allowedTypesFile = ['.png', '.jpg', '.jpeg'];

    // Kemudian disini kita dapat cek apakah file yang diupload sesuai dengan extension yang kita perbolehkan
    // jadi disini extensionnya kita bisa lowercasekan semua dulu
    if(!allowedTypesFile.includes(ext.toLowerCase())) {
        // Kemudian disini kita dapat return message
        return res.status(422).json({message: "Invalid image file extension"});
    }

    // Apabila extension filenya sudaH benar, selanjutnya kita cek apakah file yang diupload lebih dari 5 MB
    if(fileSize > 5000000) {
        return res.status(422).json({message: "Image must be less than 5 MB"});
    }

    // Kemudian disini setelah semua persyaratan sudah ok, maka kita dapat memasukkan image tersebut ke folder public > images
    file.mv(`./public/images/${fileName}`, async(error) => {
        // Apabila ada error, maka akan direturn errornya
        if(error){
            return res.status(500).json({message: error.message})
        }

        // Lalu kita akan membuat Blogsnya
        try {
            await Blogs.create({title: title, slug: slug, content: content, image: fileName, url: url, author: author, published_date: published_date});
            // setelah itu kita akan return message kalau Blogs berhasil dibuat
            res.status(201).json({message: "Blogs has been created successfully"});
        } catch (error) {
            // Kalau ada error, maka akan dikirim error message
            console.log(error.message);                
        }
    });
}

// Kemudian disini untuk update Blogs
export const updateBlog = async(req,res) => {
    // Kemudian disini kita dapat ambil dulu datanya berdasarkan slug
    const Blog = await Blogs.findOne({
        where: {
            slug: req.params.slug
        }
    });

    // Apabila datanya tidak diketemukan, maka akan direturn
    if(!Blog) {
        return res.status(404).json({message: "No Blogs Found in database"});
    };

    // Kemudian disini apabila datanya ada, maka kita akan membuat variabel filename dulu yang kosong
    let fileName = "";

    // Kemudian kita dapat cek apakah admin ada upload file baru
    if(req.files === null) {
        // Apabila tidak upload filenya, maka kita dapat set file imagenya sesuai yang ada di database
        fileName = Blog.image;
    } else {
        // Apabila admin mengupload file image baru maka kita dapat masukkan file baru ke folder public kita dengan cara yang sama create tadi
        // Kalau ada maka kita akan mengambil filenya dan file length
        const file = req.files.file;
        // Lalu kita dapat mengambil ukuran file yang di upload
        const fileSize = file.data.length;
        // Kemudian kita dapat mengambil extension filenya
        const ext = path.extname(file.name);
        // Lalu kita dapat menggabungkan nama file tersebut dengan extensionnya
        // contoh : image.jpg
        fileName = file.md5 + ext;

        // Kemudian kita dapat set tipe extension apa saja yang boleh digunakan
        const allowedTypesFile = ['.png', '.jpg', '.jpeg'];

        // Kemudian disini kita dapat cek apakah file yang diupload sesuai dengan extension yang kita perbolehkan
        // jadi disini extensionnya kita bisa lowercasekan semua dulu
        if(!allowedTypesFile.includes(ext.toLowerCase())) {
            // Kemudian disini kita dapat return message
            return res.status(422).json({message: "Invalid image file extension"})
        }

        // Apabila extension filenya sudaH benar, selanjutnya kita cek apakah file yang diupload lebih dari 5 MB
        if(fileSize > 5000000) {
            return res.status(422).json({message: "Image must be less than 5 MB"})
        }

        // Lalu disini kita dapat unlink dan hapus file image yang lama dari folder public kita
        const filepath = `./public/images/${Blog.image}`;
        // Lalu kita dapat unlink
        fs.unlinkSync(filepath);

        // Lalu kita dapat masukkan file image yang baru diupload admin
        file.mv(`./public/images/${fileName}`, async(error) => {
            // Kalau ada error, maka kita akan berikan response errornya
            if(error) {
                return res.status(500).json({message: error.message});
            }
        });
    }

    // Setelah file image sudah dicek, maka kita dapat mengambil data input untuk title, image, content dan url
    const {title, slug, author, published_date, content} = req.body;
    // Lalu kita dapat mengambil url localhost imagenya di folder public
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    // Lalu kita dapat update databasenya
    try {
        // Lalu disini kita dapat pakai metode update
        await Blogs.update({title: title, slug: slug, content: content, image: fileName, url: url, author: author, published_date: published_date }, {
            where: {
                slug: req.params.slug
            }
        });
        res.status(200).json({message: "Blogs updated successfully"})
    } catch (error) {
        // Apabila ada error, maka kita akan log kan errornya
        console.log(error.message);
    }
}

// Kemudian ini untuk delete products
export const deleteBlog = async(req, res) => {
    // Kemudian disini kita dapat cari dulu untuk Blogs yang mau di delete
    const Blog = await Blogs.findOne({
        where: {
            slug: req.params.slug 
        }
    });

    // Kemudian disini kita dapat cek apakah data yang dicari ada di database
    if(!Blog) {
        // Apabila error, maka akan direturn message
        return res.status(404).json({message: "No Blogs Found in database"});
    }

    try {
        // Kemudian disini kita dapat mengambil file image yang ada di folder public
        const filepath = `./public/images/${Blog.image}`;
        // Lalu kita dapat unlink dengan folder public imagenya
        fs.unlinkSync(filepath);

        // Kemudian kita dapat menghancurkan Blogs dengan slug tersebut
        await Blogs.destroy({
            where: {
                slug: req.params.slug
            }
        });

        // Lalu kita dapat kirimkan response kalau data berhasil dihapus
        res.status(200).json({message: "Blogs Deleted Successfully"});
    } catch (error) {
        // Kalau error kita dapat print errornya
        console.log(error.message);
    }
}
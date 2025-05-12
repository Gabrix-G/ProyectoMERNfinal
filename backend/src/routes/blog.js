import express from "express";
import multer from "multer";
import blogController from "../controllers/blogController.js";
import blog from "../models/blog.js";

const router = express.Router();


//Configurar una carpeta local que g uarde las imagenes
const upload = multer ({dest: "public/"})

router.router("/")
.get(blogController.getAllPost)
.post(upload.single("images"), blogController.createPost);

export default router;
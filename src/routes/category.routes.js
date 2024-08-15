import {addCategory,deleteCategory,getCategories, getCategory, updateCategory, searchProducts} from "../controllers/category.controller.js";
import { Router } from "express";

const categoryRoutes = Router();


// category CRUD routes
categoryRoutes
    .post("/", addCategory) 
    .get("/", getCategories)      
    .get("/:id", getCategory)
    .delete("/:id", deleteCategory)
    .patch("/:id", updateCategory)
    .get("/search", searchProducts) 

export default categoryRoutes;
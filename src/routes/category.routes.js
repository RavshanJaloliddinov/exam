import {addCategory,deleteCategory,getCategories, getCategory, updateCategory} from "../controllers/category.controller.js";
import { Router } from "express";

const categoryRoutes = Router();


// category CRUD routes
categoryRoutes
    .post("/", addCategory) 
    .get("/", getCategories)      
    .get("/:id", getCategory)
    .delete("/:id", deleteCategory)
    .patch("/:id", updateCategory)
    .get("/:id", searchProducts) 

export default categoryRoutes;
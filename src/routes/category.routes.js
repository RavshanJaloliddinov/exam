import {addCategory,deleteCategory,getCategories, getCategory, updateCategory} from "../controllers/category.controller.js";
import { Router } from "express";

const categoryRoutes = Router();

categoryRoutes
    .post("/", addCategory) // add  category
    .get("/", getCategories)      // get categories
    .get("/:id", getCategory)
    .delete("/:id", deleteCategory)
    .patch("/:id", updateCategory)

export default categoryRoutes;
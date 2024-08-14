import { Router } from "express";
import { getProduct, getProducts, addProduct, deleteProduct, updateProduct } from "../controllers/product.conrtoller.js";


const productRoutes= Router()   

// payment CRUD routes
productRoutes
    .post('/', addProduct)
    .get('/', getProducts)
    .get('/:id', getProduct)
    .delete('/:id', deleteProduct)
    .put('/:id', updateProduct)

export default  productRoutes
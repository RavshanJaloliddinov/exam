import { Router } from "express";
import { deleteOrder, addOrder, getAllOrders, getOrder, updateOrder } from "../controllers/order.controller.js";

const orderRoutes = Router()


orderRoutes
    .post('/', addOrder)
    .get("/", getAllOrders)
    .delete("/:id", deleteOrder)
    .get("/:id", getOrder)
    .put('/:id', updateOrder)
    


export default orderRoutes
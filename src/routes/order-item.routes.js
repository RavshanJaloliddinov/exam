import { Router } from "express";
import { updateOrder, addOrder, getOrder, deleteOrder, getAllOrders } from "../controllers/order.controller.js";


const orderItemRoutes = Router();

orderItemRoutes
    .post('/', addOrder)
    .get('/', getAllOrders)
    .get('/:id', getOrder)
    .delete('/:id', deleteOrder)
    .put('/:id', updateOrder)

export default orderItemRoutes;
import { Router } from "express";
import { addPayment, getPayment, deletePayment, getAllPayments, updatePayment } from "../controllers/payment.controller.js";
const paymentRoutes = Router()

paymentRoutes
    .post('/', addPayment)
    .get('/', getAllPayments)
    .delete('/:id', deletePayment)
    .get('/:id', getPayment)
    .put('/:id', updatePayment)

export default paymentRoutes;

import { addCustomer, getCustomers, getCustomer,deleteCustomer,updateCustomer } from "../controllers/customer.controller.js";
import { Router } from "express";

const customerRoutes = Router();

customerRoutes
    .post("/", addCustomer)
    .get("/", getCustomers)
    .get("/:id", getCustomer)
    .delete("/:id", deleteCustomer)
    .patch("/:id", updateCustomer)


export default customerRoutes;


import { Router } from "express";
import { createContract, getContract, getContracts, deleteContract, updateContract } from "../controllers/contract.controller.js";
const contractRoutes = Router();

contractRoutes
    .post("/", createContract)
    .get("/", getContracts)
    .get("/:id", getContract)
    .delete("/:id", deleteContract)
    .patch("/:id", updateContract)


export default contractRoutes;
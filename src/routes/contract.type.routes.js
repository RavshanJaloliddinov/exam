import { createContractType, deleteContractType, getContractsType, getContractType, updateContractType } from "../controllers/contract.type.controller.js";
import { Router } from "express";

const contractTypeRoutes = Router();

contractTypeRoutes
    .post("/", createContractType)
    .get("/", getContractsType)
    .get("/:id", getContractType)
    .delete("/:id", deleteContractType)
    .patch("/:id", updateContractType)

export default contractTypeRoutes;
import { fetchData } from "../database/postgres.js";

export async function createContract(req, res) {
    try{
        const {order_id, customer_id, contract_type_id, monthly_payment, contract_status, starting_payment_percent, total_payment} = req.body;
    const payment_month = [5,10,15]
    const contract_status_demo = ["finished","notFinished"]
    if(!payment_month.includes(monthly_payment)){
        return res.status(400).send("Error inputed Month")
    }
    if(!contract_status_demo.includes(contract_status)){
        return res.status(400).send("Error inputed contract status")
    }

    await fetchData(
        "INSERT INTO contracts(order_id, customer_id, contract_type_id, monthly_payment, contract_status, starting_payment_percent, total_payment) VALUES($1, $2, $3, $4, $5, $6, $7)",
        order_id, customer_id, contract_type_id, monthly_payment, contract_status, starting_payment_percent, total_payment
    );
    res.status(201).send({message: "Contract created successfully"});
    }catch(err){
        console.error(err);
        res.status(500).send("error creating contract");
    }
}

export async function getContracts(req, res) {
    try{
        const response = await fetchData("SELECT * FROM contracts");
        res.status(200).send({message: response});
    }catch(err){
        console.error(err);
        res.status(500).send("error fetching contracts");
    }
}

export async function getContract(req, res) {
    try{
        const currentContractId = req.params.contractId;
        const response = await fetchData("SELECT * FROM contracts WHERE id = $1", currentContractId);

        res.status(200).send({message: response});
    }catch(err){
        console.error(err);
        res.status(500).send("error fetching contract");
    }
}

export async function deleteContract(req, res) {
    try{
        const currentContractId = req.params.contractId;
        const response = await fetchData("DELETE FROM contracts WHERE id = $1 RETURNING *", currentContractId);

        res.status(200).send({message: "Contract deleted successfully"});
    }catch(err) {
        console.error(err);
        res.status(500).send("error deleting contract");
    }
}

export async function updateContract(req, res) {
    try{
    const {order_id, customer_id, contract_type_id, monthly_payment, contract_status, starting_payment_percent, total_payment} = req.body;
    const currentContractId = req.params.contractId;

    const currentContract = await fetchData("SELECT * FROM contracts WHERE id = $1", currentContractId);

    const updatedOrderId = order_id || currentContract[0].order_id;
    const updatedCustomerId = customer_id || currentContract[0].customer_id;
    const updatedContractTypeId = contract_type_id || currentContract[0].contract_type_id;
    const updatedMonthlyPayment = monthly_payment || currentContract[0].monthly_payment;
    const updatedContractStatus = contract_status || currentContract[0].contract_status;
    const updatedStartingPaymentPercent = starting_payment_percent || currentContract[0].starting_payment_percent;
    const updatedTotalPayment = total_payment || currentContract[0].total_payment;

    await fetchData(
        "UPDATE contracts SET order_id = $1, customer_id = $2, contract_type_id = $3, monthly_payment = $4, contract_status = $5, starting_payment_percent = $6, total_payment = $7 WHERE id = $8",
        updatedOrderId, updatedCustomerId, updatedContractTypeId, updatedMonthlyPayment, updatedContractStatus, updatedStartingPaymentPercent, updatedTotalPayment, currentContractId
    );
    res.status(200).send({message: "updated successfully"});
    }catch(err){
        console.error(err);
        res.status(500).send("error updating contract");
    }
}
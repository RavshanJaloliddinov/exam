import formidable from "formidable";
import { fetchData } from "../database/postgres.js";

// Create payment
export async function addPayment(req, res) {
    const [fields] = await form.parse(req);
    const newPayment = await fetchData(
        'INSERT INTO payments(created_at, customer_id, total_price, contract_id) VALUES ($1, $2, $3, $4);',
        fields.created_at[0],
        fields.customer_id[0],
        fields.total_price[0],
        fields.contract_id[0]
    );
    res.status(201).send({
        message: 'Payment created',
        data: newPayment
    });
}

// get payment
export async function getPayment(req, res) {

    const { id } = req.params;

    if(!Number(id) && id > 0){
        return res.status(400).send({
            message: `Invalid order id: ${id}`
        });
    }

    const payment = await fetchData('SELECT * FROM payments WHERE id = $1;', id);
    res.send({
        message: 'Payment fetched',
        data: payment
    });
}

// get all payments
export async function getAllPayments(req, res) {
    const payments = await fetchData('SELECT * FROM payments;');
    res.send({
        message: 'Payments fetched',
        data: payments
    });
}

// Update payment
export async function updatePayment(req, res) {

    const { id } = req.params;

    if(!Number(id) && id > 0){
        return res.status(400).send({
            message: `Invalid order id: ${id}`
        });
    }

    const [fields] = await form.parse(req);
    const updatedPayment = await fetchData(
        'UPDATE payments SET created_at = $1, customer_id = $2, total_price = $3, contract_id = $4 WHERE id = $5;',
        fields.created_at[0],
        fields.customer_id[0],
        fields.total_price[0],
        fields.contract_id[0],
        id
    );
    res.send({
        message: 'Payment updated',
        data: updatedPayment
    });
}

// Delete payment
export async function deletePayment(req, res) {

    const { id } = req.params;

    if(!Number(id) && id > 0){
        return res.status(400).send({
            message: `Invalid order id: ${id}`
        });
    }

    await fetchData('DELETE FROM payments WHERE id = $1;', id);
    res.send({
        message: 'Payment deleted'
    });
}

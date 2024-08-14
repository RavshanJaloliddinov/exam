import formidable from "formidable";
import { fetchData } from "../database/postgres.js";

// Create
export async function addOrder(req, res) {
    const [fields] = await form.parse(req);
    const newOrder = await fetchData(
        'INSERT INTO orders(created_at, customer_id, address, order_status) VALUES ($1, $2, $3, $4);',
        fields.created_at[0],
        fields.customer_id[0],
        fields.address[0],
        fields.order_status[0]
    );
    res.status(201).send({
        message: 'Order created',
        data: newOrder
    });
}

// Read
export async function getOrder(req, res) {
    const { id } = req.params;

    if(!Number(id) && id > 0){
        return res.status(400).send({
            message: `Invalid order id: ${id}`
        });
    }

    const order = await fetchData('SELECT * FROM orders WHERE id = $1;', id);
    res.send({
        message: 'Order fetched',
        data: order
    });
}

// Read All
export async function getAllOrders(req, res) {
    const orders = await fetchData('SELECT * FROM orders;');
    res.send({
        message: 'Orders fetched',
        data: orders
    });
}

// Update
export async function updateOrder(req, res) {
    const { id } = req.params;

    if(!Number(id) && id > 0){
        return res.status(400).send({
            message: `Invalid order id: ${id}`
        });
    }

    const [fields] = await form.parse(req);
    const updatedOrder = await fetchData(
        'UPDATE orders SET created_at = $1, customer_id = $2, address = $3, order_status = $4 WHERE id = $5;',
        fields.created_at[0],
        fields.customer_id[0],
        fields.address[0],
        fields.order_status[0],
        id
    );
    res.send({
        message: 'Order updated',
        data: updatedOrder
    });
}

// Delete
export async function deleteOrder(req, res) {
    const { id } = req.params;

    if(!Number(id) && id > 0){
        return res.status(400).send({
            message: `Invalid order id: ${id}`
        });
    }

    await fetchData('DELETE FROM orders WHERE id = $1;', id);
    res.send({
        message: 'Order deleted'
    });
}

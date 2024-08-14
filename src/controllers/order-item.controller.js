import formidable from "formidable";
import { fetchData } from "../database/postgres.js";

// Create
export async function addOrderItem(req, res) {
    const [fields] = await form.parse(req);
    const newOrderItem = await fetchData(
        'INSERT INTO order_items(order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4);',
        fields.order_id[0],
        fields.product_id[0],
        fields.quantity[0],
        fields.price[0]
    );
    res.status(201).send({
        message: 'Order item created',
        data: newOrderItem
    });
}

// Read
export async function getOrderItem(req, res) {
    const { id } = req.params;

    if(!Number(id) && id > 0){
        return res.status(400).send({
            message: `Invalid order id: ${id}`
        });
    }

    const orderItem = await fetchData('SELECT * FROM order_items WHERE id = $1;', id);
    res.send({
        message: 'Order item fetched',
        data: orderItem
    });
}

// Read All
export async function getAllOrderItems(req, res) {
    const orderItems = await fetchData('SELECT * FROM order_items;');
    res.send({
        message: 'Order items fetched',
        data: orderItems
    });
}

// Update
export async function updateOrderItem(req, res) {
    const { id } = req.params;

    if(!Number(id) && id > 0){
        return res.status(400).send({
            message: `Invalid order id: ${id}`
        });
    }

    const [fields] = await form.parse(req);
    const updatedOrderItem = await fetchData(
        'UPDATE order_items SET order_id = $1, product_id = $2, quantity = $3, price = $4 WHERE id = $5;',
        fields.order_id[0],
        fields.product_id[0],
        fields.quantity[0],
        fields.price[0],
        id
    );
    res.send({
        message: 'Order item updated',
        data: updatedOrderItem
    });
}

// Delete
export async function deleteOrderItem(req, res) {
    const { id } = req.params;

    if(!Number(id) && id > 0){
        return res.status(400).send({
            message: `Invalid order id: ${id}`
        });
    }

    await fetchData('DELETE FROM order_items WHERE id = $1;', id);
    res.send({
        message: 'Order item deleted'
    });
}

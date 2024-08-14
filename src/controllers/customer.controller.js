import formidable from "formidable";
import { unlink } from 'fs/promises';
import { fetchData } from "../database/postgres.js";

const form = formidable({
    keepExtensions: true,
    uploadDir: "uploads"
});

export async function addCustomer(req, res) {
    try {
            const [fields,files] = await form.parse(req)

            const newUser = await fetchData(
                "INSERT INTO customer(full_name, email, password, phone_number, address) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                fields.full_name[0],
                fields.email[0],
                fields.password[0],
                fields.phone_number[0],
                fields.address[0]
            );

            res.status(201).send({
                message: 'Created',
                data: newUser   
         
        });
    } catch (error) {
        res.status(500).send({
            message: 'user creation error',
            error: error.message
        });
    }
}

export async function getCustomers(req, res) {
    try {
         

            const newUser = await fetchData("SELECT * FROM customer");

            res.status(200).send({
                message: 'ok',
                data: newUser    
         
        });
    } catch (error) {
        res.status(500).send({
            message: 'Users not found',
            error: error.message
        });
    }
}

export async function getCustomer(req, res) {
    try {
         
            const currentCustomerId = req.params?.customerId
            const newUser = await fetchData("SELECT * FROM customer WHERE id = $1",currentCustomerId);

            res.status(200).send({
                message: 'ok',
                data: newUser    
         
        });
    } catch (error) {
        res.status(500).send({
            message: 'User not found',
            error: error.message
        });
    }
}


export async function deleteCustomer(req, res) {
    try {
         
            const currentCustomerId = req.params?.customerId
            const newUser = await fetchData("DELETE FROM customer WHERE id = $1",currentCustomerId);

            res.status(200).send({
                message: 'customer deleted successfully',
                data: newUser    
         
        });
    } catch (error) {
        res.status(500).send({
            message: 'error deleting customer',
            error: error.message
        });
    }
}


export async function updateCustomer(req, res) {
    try {
        const id = req.params?.customerId;

        if (!id) {
            return res.status(404).send({ message: "User not found" });
        }

        const [fields, files] = await form.parse(req);

        const result = await fetchData("SELECT * FROM customer WHERE id = $1", id);

        await fetchData(
            'UPDATE customer SET full_name = $1, email = $2, password = $3, phone_number = $4, address = $5 WHERE id = $6',
            fields.name ? fields.name[0] :foundedUser.name,
            fields.email ? fields.email[0] :foundedUser.email,
            fields.password ? fields.password[0] :foundedUser.password,
            fields.phone ? fields.phone[0] :foundedUser.phone,
            fields.address ? fields.address[0] :foundedUser.address,
            id
        );

        res.status(200).send({ message: "customer update" });
    } catch (error) {
        res.status(500).send({
            message: 'User updating error',
            data: error.message
        });
    }
}
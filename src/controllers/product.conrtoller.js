import { fetchData } from "../database/postgres.js";
import formidable from "formidable";
import path from "path";
import { unlink } from "fs";

const form = formidable({
    keepExtensions: true,
    uploadDir: "uploads"
});

export async function addProduct(req, res) {
    try {
            const [fields,files] = await form.parse(req)

            const newProduct = await fetchData(
                "INSERT INTO product(title,price,count,category_id, rating, description, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
                fields.title[0],
                fields.price[0],
                fields.count[0],
                fields.category_id[0],
                fields.rating[0],
                fields.description[0],
                files.image_url[0].newFilename,
            );

            res.status(201).send({
                message: 'Product added successfully',
                data: newProduct   
         
        });
    } catch (err) {
        res.status(500).send({
            message: 'Product added failed',
            error: err.message
        });
    }
}

export async function getProducts(req, res) {
    try {
         

           const allProducts =  await fetchData("SELECT * FROM product");

            res.status(200).send({
                message: 'ok',
                data: allProducts
         
        });
    } catch (err) {
        res.status(404).send({
            message: 'Products fetching error ',
            error: err.message
        });
    }
}

export async function getProduct(req, res) {
    try {
            const currentProductId = req.params?.productId
            const currentProduct = await fetchData("SELECT * FROM product WHERE id = $1",currentProductId);
            res.status(200).send({
                message: 'ok',
                data: currentProduct    
        });
    } catch (err) {
        res.status(500).send({
            message: 'Product fetching error',
            error: err.message
        });
    }
}


export async function deleteProduct(req, res) {
    try {
            const currentProductId = req.params?.productId
            const currentProduct = await fetchData("SELECT * FROM product WHERE id = $1",currentProductId)
            const productImage = currentProduct[0].image_url;
   
            unlink(path.join(process.cwd(),"uploads",productImage),(err)=>{console.log(err)})
            await fetchData("DELETE FROM product WHERE id = $1",currentProductId);

            res.status(200).send({
                message: 'Product succes deleted',
        });
    } catch (err) {
        res.status(404).send({
            message: 'Product delete error',
            err: err.message
        });
    }
}


export async function updateProduct(req, res) {
    try {
        const currentProductId = req.params?.productId

        if (!currentProductId) {
            return res.status(404).send({ message: "Product not found" });
        }

        const [fields, files] = await form.parse(req);
        const currentProduct = await fetchData("SELECT * FROM product WHERE id = $1",currentProductId)
        let productImage = currentProduct[0].image_url;
        if(files.image_url){
            unlink(path.join(process.cwd(),"uploads",productImage),(err)=>{console.log(err)})
            productImage = files.image_url[0].newFilename;
        }
   
        await fetchData(
            'UPDATE product SET title=$1 ,price=$2, count=$3, category_id=$4, image_url=$5, rating = $6, description = $7 WHERE id=$8',
            fields.title ? fields.title[0] : currentProduct[0].title,
            fields.price ? fields.price[0] : currentProduct[0].price,
            fields.count ? fields.count[0] : currentProduct[0].count,
            fields.category_id ? fields.category_id[0] : currentProduct[0].category_id,
            productImage ? productImage : "image_404_",
            fields.rating ? fields.rating[0] : currentProduct[0].rating,
            fields.description ? fields.description[0] : currentProduct[0].description,
            currentProductId
        );

        res.status(200).send({ message: "product updated successfully" });
    } catch (err) {
        res.status(500).send({
            message: 'product updating error',
            data: err.message
        });
    }
} 
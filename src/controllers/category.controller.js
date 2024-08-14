import formidable from "formidable";
import { unlink } from "fs";
import { fetchData } from "../database/postgres.js";
import path from "path";
const form = formidable({
    keepExtensions: true,
    uploadDir: "uploads"
});
// create a new category
export async function addCategory(req, res) {
    try {
            const [fields,files] = await form.parse(req)
            const categoryName = await fetchData(
                "INSERT INTO category(name, image_url) VALUES ($1, $2) RETURNING *",
                fields.name[0],
                files.image_url[0].newFilename,
            );
            res.status(201).send({
                message: 'Category added successfully',
                data: categoryName   
        });
    } catch (error) { 
        res.status(500).send({
            message: 'error adding category',
            error: error.message
        });
    }
}
// get all categories
export async function getCategories(req, res) {
    try {
            const categoryNAme = await fetchData("SELECT * FROM category");
            res.status(200).send({
                message: 'success',
                data: categoryNAme    
        });
    } catch (error) {
        res.status(500).send({
            message: 'error fetching categories',
            error: error.message
        });
    }
}
// get sin
export async function getCategory(req, res) {
    try {
            const {id} = req.params
            const categoryName = await fetchData("SELECT * FROM category WHERE id = $1",id);
            res.status(200).send({
                message: 'ok',
                data: categoryName    
        });
    } catch (error) {
        res.status(500).send({
            message: 'error fetching category',
            error: error.message
        });
    }
}

// delete category
export async function deleteCategory(req, res) {
    try {
            const { id } = req.params
            const currentCategory = await fetchData("SELECT * FROM category WHERE id = $1",id)
            const categoryImage = currentCategory[0].image_url;
   
            unlink(path.join(process.cwd(),"uploads",categoryImage),(err)=>{console.log(err)})
            await fetchData("DELETE FROM category WHERE id = $1",id);
            res.status(200).send({
                message: 'Category succes deleted',
        });
    } catch (error) {
        res.status(404).send({
            message: 'Category delete error',
            error: error.message
        });
    }
}

//update category
export async function updateCategory(req, res) {
    try {
        const {id} = req.paramsparams.category

        if (!id) {
            return res.status(404).send({ message: "404 Not Found" });
        }
        const [fields, files] = await form.parse(req);
        const currentCategory = await fetchData("SELECT * FROM category WHERE id = $1",id)
        let categoryImage = currentCategory[0].image_url;
        if(files.image_url){
            unlink(path.join(process.cwd(),"uploads",categoryImage))
            categoryImage = files.image_url[0].newFilename;
        }
        await fetchData(
            'UPDATE category SET name = $1, image_url = $2 WHERE id = $3',
            fields.name ? fields.name[0] : currentCategory[0].name,
            categoryImage ? categoryImage : 'image_404',
            id
        );
        res.status(200).send({ message: "category updated" });
    } catch (error) {
        res.status(500).send({
            message: 'error updating category',
            data: error.message
        });
    }
}


export async function searchProducts(req, res) {
    try {
        const searchItem = req.query["search"];
        if (!searchItem) {
            return res.status(404).send({ message: "search query not provided" });
        }
        let query = `
            SELECT 
                product.id, product.name, product.price, product.quantity, product.category_id, product.image_url, category.name AS category_name
            FROM 
                product
            LEFT JOIN 
                category ON product.category_id = category.id
            WHERE 
                product.name ILIKE '%${searchItem}%'
        `;

        

        const products = await fetchData(query);
        res.status(200).send({foundedProducts: products});
    } catch (error) {
        res.status(404).send({ error: "product not found" });
    }
}
import { fetchData } from "../database/postgres.js";





export async function createContractType(req,res) {
       try{
            const {duration,percentage} = req.body;
            await fetchData("INSERT INTO contract_type(duration,percentage) VALUES($1,$2)",duration,percentage);
            res.status(201).send({message: "created succes"})
       }catch(err){
            res.status(500).send({message: "Error creating contract type"})
       }
}

export async function getContractsType(req,res) {
    try{
        const response = await fetchData(`SELECT * FROM contract_type`)
        res.status(200).send({message: response})
    }catch(err){
        res.status(500).send({message: "Error getting contract types"})
    }
}


export async function getContractType(req,res) {
    try{
        const {id} = req.params;

        const contractType = await fetchData(`SELECT * FROM contract_type WHERE  id= $1`,id)
        res.status(200).send({message: contractType})
    }catch(err){
        res.status(500).send({message: "Error getting contract type"})
    }
}

export async function deleteContractType(req,res) {
    try{
        const {id} = req.params;
        await fetchData(`DELETE FROM contract_type WHERE  id= $1`,id)
        res.status(200).send({message: "order deleted"})
    }catch(err){
        res.status(500).send({message: "Error deleting contract type"})
    }
}
export async function updateContractType(req, res) {
        try{
            const { duration, percentage } = req.body;

            const {id} = req.params;

            const currentOrder = await fetchData("SELECT * FROM contract_type WHERE id = $1", id);
            if (!currentOrder || currentOrder.length === 0) {
                return res.status(404).send({ message: "error not found contract type" });
            }


            const updateDuration = duration || currentOrder[0].duration;
            const updatedPerenage = percentage || currentOrder[0].percentage;

  
            await fetchData(
                `UPDATE contract_type SET duration = $1, percentage = $2 WHERE id = $3`,
                updateDuration, updatedPerenage, id
            );
            res.status(200).send({ message: "updated successfully" });
        }catch(err){
            res.status(500).send({message: "Error updating contract type"})
        }

        
   
}
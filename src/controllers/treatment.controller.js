import { Treatment } from "../models/treatment.model.js";

export const createTreatment = async (req, res) => {
    try{
        //validate request
        if(!req.body.treatmentType && !req.body.price){
            res.status(400).json({
                message: "The content cannot be empty"
            });
        return;      
        }

        //create treatment
        const treatment = {
            treatmentType: req.body.treatmentType,
            price: req.body.price,
            description: req.body.description
        };

        await Treatment.create(treatment)
        
        res.status(200).json({
            message: "Treatment created successfully."
        })
    
    } catch (error) {
        res.status(500).json({
            message: 
                "Error ocurred while creating a treatment"
        })
    }
}

export const findAllTreatments = async (req, res) => {
    const treatmentType = req.query.treatmentType;
    var condition = treatmentType ? { treatmentType: { [Op.like]: `%${treatmentType}%` } } : null;

    await Treatment.findAll({ where: condition })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "An error occurred while retrieving the treatments."
                });
            });
}

export const findOneTreatmentById = async (req, res) => {
    try{
        const idTreatment = req.params.idTreatment;
        await Treatment.findByPk(idTreatment)
        
    }catch (error){

    }
    
    

    await Treatment.findByPk(idTreatment)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Error retrieving treatment with id" + idTreatment
            })
        })
}

export const updateTreatment = async (req, res) => {
    try {
    
            const { idTreatment } = req.params;
            const { treatmentType, price, description } = req.body;
    
            const treatment = await Treatment.findByPk(idTreatment);
    
            if (!treatment) {
    
                return res.status(404).json({ 
                    message: "Treatment not found" 
                });
    
            } else {
    
                treatment.treatmentType = treatmentType
                treatment.price = price
                treatment.description = description
    
                await treatment.save()
            }
    
            res.status(200).json(treatment);
    
        } catch (error) {            
            res.status(500).json({ 
                message: "Error finding the desired treatment" 
            });
        }
}

export const deleteTreatment = async (req, res) => {
    try {
        const { idTreatment } = req.params;
        await Treatment.destroy({
            where: {
                idTreatment: idTreatment
            }
        })
        res.status(204).json({
            message: "Treatment deleted successfully."
        })
    } catch (error) {
        res.status(500).json({
            message: "Error while deleting the treatment."
        })
    }
}
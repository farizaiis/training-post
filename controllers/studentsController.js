const { students } = require('../models')
const Joi = require('joi')

module.exports = {
    postStudents : async (req, res) => {
        const body = req.body
        try {
            const schema = Joi.object({
                id: Joi.number().min(100).max(999),
                name : Joi.string().required(),
                dateOfBirth : Joi.string().required(),
                address : Joi.string().required()
            })

            const { error } = schema.validate(
                {
                    name : body.name,
                    dateOfBirth : body.dateOfBirth,
                    address : body.address  
                },
                { abortEarly : false }
            )

            if (error) {
                return res.status(400).json({
                    status : "failed",
                    message : "Bad Request",
                    errors : error["details"].map(({ message }) => message )
                })
            }


            const studentData = await students.create({
                ...body
            }); 

            if(!studentData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Unable to input data"
                });
            }
            return res.status(200).json({
                status : "success",
                message : "Succesfully input data to database",
                data: studentData
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    getOneStudents : async (req, res) => {
        const id = req.params.id
        try {
            const studentData = await students.findOne({ where : { id } }); 
            if(!studentData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }
            return res.status(200).json({
                status : "success",
                message : "Succesfully retrieved data Student",
                data: studentData
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    getAllStudents : async (req, res) => {
        try {
            const studentData = await students.findAll(); 
            if(!studentData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }
            return res.status(200).json({
                status : "success",
                message : "Succesfully retrieved data Student",
                data: studentData
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    updateStudents : async (req, res) => {
        const body = req.body
        const id = req.params.id
        try {
            const schema = Joi.object({
                name : Joi.string(),
                dateOfBirth : Joi.string(),
                address : Joi.string()
            })

            const { error } = schema.validate(
                {
                    name : body.name,
                    dateOfBirth : body.dateOfBirth,
                    address : body.address  
                },
                { abortEarly : false }
            )

            if (error) {
                return res.status(400).json({
                    status : "failed",
                    message : "Bad Request",
                    errors : error["details"].map(({ message }) => message )
                })
            }


            const studentData = await students.update(
                { ...body },
                { where : { id } }
            ); 

            if(!studentData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Unable to input data"
                });
            }

            const data = await students.findOne({
                where : { id : req.params.id }
            })

            return res.status(200).json({
                status : "success",
                message : "Succesfully update the data",
                data : data
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    deleteOneStudents : async (req, res) => {
        const id = req.params.id
        try {
            const studentData = await students.destroy({ where : { id } }); 
            if(!studentData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }
            return res.status(200).json({
                status : "success",
                message : "Deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },
}
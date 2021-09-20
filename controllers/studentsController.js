const { students, scores } = require('../models')
const Joi = require('joi').extend(require('@joi/date'))

module.exports = {
    postStudents : async (req, res) => {
        const body = req.body
        try {
            const schema = Joi.object({
                name : Joi.string().required(),
                dateOfBirth : Joi.date().format("YYYY-M-D").required(),
                address : Joi.string().required()
            })

            const { error } = schema.validate({ ...body }, { abortEarly : false })

            if (error) {
                return res.status(400).json({
                    status : "failed",
                    message : "Bad Request",
                    errors : error["details"].map(({ message }) => message )
                })
            }

            const studentData = await students.create({ ...body })

            const scoreData = await scores.create({ idStudents : studentData.id })

            if(!studentData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Unable to input data"
                });
            }

            return res.status(200).json({
                status : "success",
                message : "Succesfully input data the Student",
                student: studentData,
                score : scoreData,
                additional : "this Student's Score has been Created, but still 0 every score"
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
            const studentData = await students.findOne({
                where : { id },
                attributes : { exclude : ["id", "updatedAt", "createdAt"] },
                include : [{ as : "Scores", model : scores, attributes : { exclude : ["id", "idStudents", "updatedAt", "createdAt"]} }]
            }); 

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
            const studentData = await students.findAll({
                attributes : { exclude : ["updatedAt", "createdAt"] },
                include : [{ as : "Scores", model : scores, attributes : { exclude : ["id", "idStudents", "updatedAt", "createdAt"]} }]
            }); 

            if(!studentData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found",
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
                dateOfBirth : Joi.date().format("YYYY-M-D"),
                address : Joi.string()
            })

            const { error } = schema.validate({ ...body }, { abortEarly : false })

            if (error) {
                return res.status(400).json({
                    status : "failed",
                    message : "Bad Request",
                    errors : error["details"].map(({ message }) => message )
                })
            }

            const studentData = await students.update({ ...body }, { where : { id } }); 

            if(!studentData[0]) {
                return res.status(400).json({
                    status : "failed",
                    message : "Unable to update data"
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
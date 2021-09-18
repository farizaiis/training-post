const { scores } = require('../models')
const Joi = require('joi')

module.exports = {
    postScores : async (req, res) => {
        const body = req.body
        try {
            const schema = Joi.object({
                idStudents : Joi.number().required(),
                math : Joi.number(),
                physics : Joi.number(),
                algorithm : Joi.number(),
                programming : Joi.number()
            });

            const { error } = schema.validate(
                {
                    idStudents : body.idStudents,
                    math : body.math,
                    physics : body.physics,
                    algorithm : body.algorithm,
                    programming : body.programming
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


            const scoresData = await scores.create({
                idStudents : body.idStudents,
                math : body.math,
                physics : body.physics,
                algorithm : body.algorithm,
                programming : body.programming
            }); 

            if(!scoresData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Unable to input data"
                });
            }
            return res.status(200).json({
                status : "success",
                message : "Succesfully input data to database",
                data: scoresData
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    getOneScores : async (req, res) => {
        const id = req.params.id
        try {
            const scoresData = await scores.findOne({ 
                where : { id }, 
            }); 
            if(!scoresData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }
            return res.status(200).json({
                status : "success",
                message : "Succesfully retrieved data Scores",
                data: scoresData
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    getAllScores : async (req, res) => {
        try {
            const scoresData = await scores.findAll(); 
            if(!scoresData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }
            return res.status(200).json({
                status : "success",
                message : "Succesfully retrieved data Scores",
                data: scoresData
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    updateScores : async (req, res) => {
        const body = req.body
        const id = req.params.id
        try {
            const schema = Joi.object({
                idStudents : Joi.number().required(),
                math : Joi.number(),
                physics : Joi.number(),
                algorithm : Joi.number(),
                programming : Joi.number()
            })

            const { error } = schema.validate(
                {
                    idStudents : body.idStudents,
                    math : body.math,
                    physics : body.physics,
                    algorithm : body.algorithm,
                    programming : body.programming  
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


            const scoresData = await scores.update(
                { ...body },
                { where : { id } }
            ); 

            if(!scoresData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Unable to input data"
                });
            }

            const data = await scores.findOne({
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

    deleteOneScores : async (req, res) => {
        const id = req.params.id
        try {
            const scoresData = await scores.destroy({ where : { id } }); 
            if(!scoresData) {
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
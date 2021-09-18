const { admins } = require('../models')
const Joi = require('joi')

module.exports = {

    getOneAdmins : async (req, res) => {
        const id = req.params.id
        try {
            const adminsData = await admins.findOne({ where : { id } }); 
            if(!adminsData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }
            return res.status(200).json({
                status : "success",
                message : "Succesfully retrieved data Admins",
                data: adminsData
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    getAllAdmins : async (req, res) => {
        try {
            const adminsData = await admins.findAll(); 
            if(!adminsData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }
            return res.status(200).json({
                status : "success",
                message : "Succesfully retrieved data Admins",
                data: adminsData
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    updateAdmins : async (req, res) => {
        const body = req.body
        const id = req.params.id
        try {
            const schema = Joi.object({
                username : Joi.string(),
                password : Joi.string()
            })

            const { error } = schema.validate(
                {
                    username : body.username,
                    password : body.password
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


            const adminsData = await admins.update(
                { ...body },
                { where : { id } }
            ); 

            if(!adminsData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Unable to input data"
                });
            }

            const data = await admins.findOne({
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

    deleteOneAdmins : async (req, res) => {
        const id = req.params.id
        try {
            const adminsData = await admins.destroy({ where : { id } }); 
            if(!adminsData) {
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
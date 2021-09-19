const { admins } = require('../models')
const Joi = require('joi')
const bcrypt = require('bcrypt')

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

    updatePassAdmins : async (req, res) => {
        const body = req.body
        const id = req.params.id
        try {
            const schema = Joi.object({
                password : Joi.string()
            })

            const { error } = schema.validate(
                {
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

            const hashedPassword = await bcrypt.hash(body.password, 10);

            const adminsUpdatePass = await admins.update(
                {
                    password : hashedPassword
                },
                { where : { id } }
            ); 

            if(!adminsUpdatePass[0]) {
                return res.status(400).json({
                    status : "failed",
                    message : "Unable to input data"
                });
            }

            const data = await admins.findOne({
                where : { id }
            })
            
            return res.status(200).json({
                status : "success",
                message : "Succesfully update the password",
                data : data
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    updateUsernameAdmins : async (req, res) => {
        const body = req.body
        const id = req.params.id
        try {
            const schema = Joi.object({
                username : Joi.string()
            })

            const { error } = schema.validate(
                {
                    username : body.username,
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

            const adminsUpdateUser = await admins.update(
                {
                    username : body.username
                },
                { where : { id } }
            ); 

            if(!adminsUpdateUser) {
                return res.status(400).json({
                    status : "failed",
                    message : "Unable to input data"
                });
            }

            const data = await admins.findOne({
                where : { id }
            })
            
            return res.status(200).json({
                status : "success",
                message : "Succesfully update the username",
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
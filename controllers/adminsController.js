const { admins } = require('../models')
const Joi = require('joi')
const bcrypt = require('bcrypt')

module.exports = {
    //Retriere data admin by id
    getOneAdmins : async (req, res) => {
        const id = req.params.id
        try {
            const adminsData = await admins.findOne({ where : { id } }); 
            
            //check jika data admin yang dicari sesuai Id ada nilai nya atau tidak
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

    //retrieve data admin keseluruhan
    getAllAdmins : async (req, res) => {
        try {
            const adminsData = await admins.findAll(); 
            
            //check jika data admin sudah ada nilai/isi nya di table
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

    //update Password Admin by Id
    updatePassAdmins : async (req, res) => {
        const body = req.body
        const id = req.params.id
        try {
            const schema = Joi.object({         //<-----Validasi inputan di body
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

            //enkripsi password yang akan di update
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

            //ngambil data yang telah di update supaya muncul datanya di postman
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

    //update username Admin by id
    updateUsernameAdmins : async (req, res) => {
        const body = req.body
        const id = req.params.id
        try {
            const schema = Joi.object({             //<---- validasi username id inputannya sesuai/tidak
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

            //ngambil data yang telah di update
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

    //delete daya admins by id
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
const Joi = require('joi')
const { admins } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
    register : async (req, res) => {
        const body = req.body
        try {
            const schema = Joi.object({
                username : Joi.string().min(4).required(),
                password : Joi.string().min(3).required()
            })

            const check = schema.validate({ ...body }, { abortEarly : false });

            if (check.error) {
                return res.status(400).json({
                    status : "failed",
                    message : "Bad Request",
                    errors : check.error["details"].map(({ message }) => message )
                })
            }

            const checkUsername = await admins.findOne({
                where: {
                    username: body.username
                }
            })

            if(checkUsername) {
                return res.status(400).json({
                    status: "fail",
                    message: "Username already used, please use another username, or login",
                });
            }

            const hashedPassword = await bcrypt.hash(body.password, 10);

            const admin = await admins.create({
                username : body.username,
                password : hashedPassword
            });

            const payload = {
                username : admin.dataValues.username,
                id : admin.dataValues.id
            }

            jwt.sign(payload, "PasswordTestHehe", { expiresIn : 7200 }, (err, token) => {
                return res.status(200).json({
                    status: "success",
                    message: "Registered successfully",
                    token: token,
                    data: admin
                });
            });
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
            status: "failed",
            message: "Internal Server Error",
            });
        }
    },

    login : async (req, res) => {
        const body = req.body
        try {
            const schema = Joi.object({
                username : Joi.string().min(4).required(),
                password : Joi.string().min(3).required()
            })

            const check = schema.validate({ ...body }, { abortEarly : false });

            if (check.error) {
                return res.status(400).json({
                    status : "failed",
                    message : "Bad Request",
                    errors : check.error["details"].map(({ message }) => message )
                })
            }

            const checkUsername = await admins.findOne({
                where: {
                    username: body.username
                }
            })

            if(!checkUsername) {
                return res.status(400).json({
                    status: "failed",
                    message: "Invalid Username",
                });
            }

            const checkPassword = await bcrypt.compare(body.password, checkUsername.dataValues.password);

            if (!checkPassword) {
                return res.status(401).json({
                    status: "failed",
                    message: "Invalid Password"
                })
            }

            const payload = {
                username : checkUsername.dataValues.username,
                id : checkUsername.dataValues.id
            }

            jwt.sign(payload, "PasswordTestHehe", { expiresIn : 7200 }, (err, token) => {
                return res.status(200).json({
                    status: "success",
                    message: "Login successfully",
                    token: token,
                });
            });
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
            status: "failed",
            message: "Internal Server Error",
            });
        }
    }
}
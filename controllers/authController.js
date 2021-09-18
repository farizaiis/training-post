//belom selesai


const Joi = require('joi')
const { admins } = require('../models')

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
                    errors : error["details"].map(({ message }) => message )
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
        } catch (error) {
            
        }
    }
}
const { verify } = require('../helpers/jwt');
const { User } = require('../models');
const { Op } = require("sequelize");

async function authentication(req, res, next) {
    const token = req.headers.access_token;

    try {
        const payload = verify(token);
        const foundUser = await User.findOne({
            where: {
                [Op.or]: [
                    {
                        email: {
                            [Op.eq]: payload.emailOrUsername
                        }
                    },
                    {
                        username: {
                            [Op.eq]: payload.emailOrUsername
                        }
                    }
                ]
            }
        })

        if (!foundUser) {
            throw {
                name: "authentication",
                message: "User Not Found"
            }
        }

        req.user = {
            id: foundUser.id,
            email: foundUser.email
        }
        next();
    } catch (err) {
        if (err.message === "User Not Found") {
            next(err);
        } else {
            next({
                name: "authentication",
                message: "Error Authentication"
            });
        }
    }
}

module.exports = authentication;
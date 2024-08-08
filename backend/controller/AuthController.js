import Users from "../models/UserModel.js"
import Roles from "../models/RoleModel.js"
import argon2 from "argon2"

export const login = async(req, res) => {
    const user = await Users.findOne({
        where: {
            email: req.body.email
        },
        include : [{
            model: Roles,
            attributes: ['name']
        }]
    })
    if (!user) return res.status(404).json({msg: "User Not Found"})
    const match = await argon2.verify(user.password, req.body.password)
    if (!match) return res.status(400).json({msg: "Password is Incorrect"})
    req.session.userId = user.uuid
    const uuid = user.uuid
    const name = user.name
    const email = user.email
    const roleId = user.roleId
}
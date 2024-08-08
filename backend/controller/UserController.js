import Users from "../models/UserModel.js"
import Roles from "../models/RoleModel.js"
import argon2 from "argon2"

export const getUsers = async(req, res) => {
    try {
        const response = await Users.findAll({
            include : [{
                model: Roles,
                attributes: ['name', 'slug']
            }]
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getUserById = async(req, res) => {
    try {
        const response = await Users.findOne({
            where: {
                uuid: req.params.id
            },
            include : [{
                model: Roles,
                attributes: ['name', 'slug']
            }]
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const createUser = async(req, res) => {
    const {name, email, password, conf_password, role} = req.body
    if (password != conf_password) return res.status(400).json({msg: "Password and confirm password does not match!"})
    const hashPassword = await argon2.hash(password)
    const roles = await Roles.findOne({
        where: {
            slug: role
        }
    })
    if (!roles) return res.status(404).json({msg: "Roles not found"})
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            roleId: roles.id
        })
        res.status(201).json({msg: "User Registered Successfully"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const updateUser = async(req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    })
    if (!user) return res.status(404).json({msg: "User Not Found"})
    const {name, email, password, conf_password, role} = req.body
    const roles = await Roles.findOne({
        where: {
            slug: role
        }
    })
    if (!roles) return res.status(404).json({msg: "Roles not found"})
    let hashPassword
    if (password === "" || password === null) {
        hashPassword = user.password
    } else {
        hashPassword = await argon2.hash(password)   
    }
    if (password != conf_password) return res.status(400).json({msg: "Password and confirm password does not match!"})
    try {
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            roleId: roles.id
        }, {
            where: {
                id: user.id
            }
        })
        res.status(200).json({msg: "User Updated"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const deleteUser = async(req, res) => {
        const user = await Users.findOne({
            where: {
                uuid: req.params.id
            }
        })
        if (!user) return res.status(404).json({msg: "User Not Found"})
        try {
            await Users.destroy({
                where: {
                    id: user.id
                }
            })
            res.status(200).json({msg: "User Deleted"})
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
}
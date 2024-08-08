import slugify from "slugify";
import Roles from "../models/RoleModel.js"

export const getRoles = async(req, res) => {
    try {
        const response = await Roles.findAll();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getRoleById = async(req, res) => {
    try {
        const response = await Roles.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const createRole = async(req, res) => {
    const {name, bos} = req.body
    const boss = await Roles.findOne({
        where: {
            slug: bos
        }
    })
    const bossId = (boss != null) ? boss.id : null
    const slug = slugify(name, {
        lower: true,
        strict: true
    })
    try {
        await Roles.create({
            name: name,
            slug: slug,
            bossId: bossId
        })
        res.status(201).json({msg: "Role Added Successfully"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const updateRole = async(req, res) => {
    const role = await Roles.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!role) return res.status(404).json({msg: "Role Not Found"})
    const {name, bos} = req.body
    const slug = (name === role.name) ? role.slug : slugify(name, { lower: true, strict: true })
    const boss = await Roles.findOne({
        where: {
            slug: bos
        }
    })
    const bossId = (boss != null) ? boss.id : null
    try {
        await Roles.update({
            name: name,
            slug: slug,
            bossId: bossId
        }, {
            where: {
                id: role.id
            }
        })
        res.status(200).json({msg: "Role Updated"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const deleteRole = async(req, res) => {
    const role = await Roles.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!role) return res.status(404).json({msg: "Role Not Found"})
    try {
        await Roles.destroy({
            where: {
                id: role.id
            }
        })
        res.status(200).json({msg: "Role Deleted"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Roles = db.define('roles', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    bossId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    freezeTableName: true
})

Roles.hasMany(Users)
Users.belongsTo(Roles, {foreignKey: 'roleId'})

Roles.hasMany(Roles, { as: 'children', foreignKey: 'bossId' });
Roles.belongsTo(Roles, { as: 'parent', foreignKey: 'bossId' });

export default Roles
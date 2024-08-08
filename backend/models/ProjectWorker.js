import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Projects from "./ProjectModel.js";

const {DataTypes} = Sequelize;

const ProjectWorker = db.define('projectworker', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
})

Users.belongsToMany(Projects, {through: ProjectWorker})
Projects.belongsToMany(Users, {through: ProjectWorker})

export default ProjectWorker
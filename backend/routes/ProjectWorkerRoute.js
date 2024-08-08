import express from "express"
import {
    getProjectWorkers,
    getProjectWorkerById,
    createProjectWorker,
    updateProjectWorker,
    deleteProjectWorker
} from "../controller/ProjectWorkerController.js"

const router = express.Router()

router.get('/projectworkers', getProjectWorkers)
router.get('/projectworkers/:id', getProjectWorkerById)
router.post('/projectworkers', createProjectWorker)
router.patch('/projectworkers/:id', updateProjectWorker)
router.delete('/projectworkers/:id', deleteProjectWorker)

export default router
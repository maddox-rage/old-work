import express from 'express'
import { DeleteStatement, StatementCreate, UpdateStatement, getAllStatements, getUsersStatements, getStatementById } from './statement.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.route('/user')
    .get(protect, getUsersStatements)
router.route('/')
     .post(protect, StatementCreate)
     .get(protect, getAllStatements)
router.route('/:id')
     .get(protect, getStatementById)
     .put(protect, UpdateStatement)
     .delete(protect, DeleteStatement)

// getAllStatements
export default router

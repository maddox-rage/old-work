import express from 'express'

import { protect } from '../middleware/auth.middleware.js'

import { getAllUserrs, getUserProfile } from './user.controller.js'

const router = express.Router()

router.route('/profile').get(protect, getUserProfile)

router.route('/allusers').get(protect, getAllUserrs)

export default router

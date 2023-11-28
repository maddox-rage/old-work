import asyncHandler from 'express-async-handler'
import jwt from "jsonwebtoken"
import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.utils.js'

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id
		},
		select: UserFields
	})

	res.json(user)
})

// @desc    Get all users
// @route   GET /api/users/allusers
// @access  Private
export const getAllUserrs = asyncHandler(async (req, res) => {
	const token = req.headers.authorization.split(' ')[1]
	const decoded = jwt.verify(token, process.env.JWT_SECRET)
	const userFound = await prisma.user.findUnique({
		where: {
			id: decoded.userId
		},
		select: UserFields
	})
	if(!userFound.isAdmin){
		return res.status(403).json({Message:"not a admin"})
	}
	const user = await prisma.user.findMany({
		include:{
			statements:true
		}
	})

	res.json(user)
})
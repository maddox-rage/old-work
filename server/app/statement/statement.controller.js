import expressAsyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { StatementFields } from '../utils/statement.until.js'
import jwt from "jsonwebtoken"
import { UserFields } from '../utils/user.utils.js'

// @desc    Get users statements
// @route   GET /api/statement/user
// @access  private
export const getUsersStatements =async (req, res) => {
	const token = req.headers.authorization.split(' ')[1]
	const decoded = jwt.verify(token, process.env.JWT_SECRET)
	const userFound = await prisma.user.findUnique({
		where: {
			id: decoded.userId
		},
		select: UserFields
	})

	try{
		const statements = await prisma.statement.findMany({
			where:{
				userId: userFound.id
			},
			include:{
				user: true
			}
		})
		res.json({statements})
	}
	catch(err){
		res.json({err})
	}
}

// @desc    Get statement by id
// @route   GET /api/statement/:id
// @access  private
export const getStatementById =async (req, res) => {
	const token = req.headers.authorization.split(' ')[1]
	const decoded = jwt.verify(token, process.env.JWT_SECRET)
	const userFound = await prisma.user.findUnique({
		where: {
			id: decoded.userId
		},
		select: UserFields
	})
	if(!userFound.isAdmin){
		return res.status(403).json({Message:"Forbidden"})
	}

	try{
		const statement = await prisma.statement.findUnique({
			where: {
				id: +req.params.id
			},
			select: StatementFields
		})
		if(!statement){
			res.status(404)
			res.json({message:"Not found"})
		}else{
			res.json({statement})
		}
	}
	catch(err){
		res.json({err})
	}
}

// @desc    Get all statements
// @route   GET /api/statement/
// @access  private
export const getAllStatements =async (req, res) => {
	const token = req.headers.authorization.split(' ')[1]
	const decoded = jwt.verify(token, process.env.JWT_SECRET)
	const userFound = await prisma.user.findUnique({
		where: {
			id: decoded.userId
		},

		select: UserFields
	})
	if(!userFound.isAdmin){
		return res.status(403).json({Message:"Forbidden"})
	}
	try{
		const statements = await prisma.statement.findMany({
			orderBy:{
				id: 'desc'
			},
			include:{
				user: true
			}
		})
		res.json({statements})
	}
	catch(err){
		res.json({err})
	}
}

// @desc    Create statement
// @route   POST /api/statement/
// @access  private
export const StatementCreate = async (req, res) => {
	const { description, autoNumber } = req.body
	try{
	const statement = await prisma.statement.create({
		data: {
			description,
			autoNumber,
			status: "new",
			user:{
				connect:{
					id: req.user.id
				}
			}
		},
		select: StatementFields
	})
	res.json({statement})
	}
	catch(err){
		res.json({err})
	}
}


// @desc    update status of the statement
// @route   PUT /api/statement/:id
// @access  private
export const UpdateStatement = async (req, res) => {
	const token = req.headers.authorization.split(' ')[1]
	const decoded = jwt.verify(token, process.env.JWT_SECRET)
	const userFound = await prisma.user.findUnique({
		where: {
			id: decoded.userId
		},
		select: UserFields
	})
	if(!userFound.isAdmin){
		return res.status(403).json({Message:"Forbidden"})
	}
	try{
		const { status } = req.body
		const statement = await prisma.statement.update({
		where: { id: Number(req.params.id) },
   		data: { status },
	})
	res.json("The statement updated")
	// res.json({statement})
}
catch(err){
	res.json(err.meta.cause)
}
}

// @desc    delete the statement
// @route   DELETE /api/statement/:id
// @access  private
export const DeleteStatement =async (req, res) => {
	const token = req.headers.authorization.split(' ')[1]
	const decoded = jwt.verify(token, process.env.JWT_SECRET)
	const userFound = await prisma.user.findUnique({
		where: {
			id: decoded.userId
		},
		select: UserFields
	})
	if(!userFound.isAdmin){
		return res.status(403).json({Message:"Forbidden"})
	}
	try{
		const statement = await prisma.statement.delete({
			where: { id: +req.params.id },
	})
	res.json({message: "The statement is deleted"})}
	catch(err){
		// res.json({err})
		res.json(err.meta.cause)
	}
}
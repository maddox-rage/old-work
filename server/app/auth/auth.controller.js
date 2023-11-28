import { faker } from '@faker-js/faker'
import { hash, verify } from 'argon2'
import asyncHandler from 'express-async-handler'

import validator from 'validator'
import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.utils.js'

import { generateToken } from './generate-token.js'

// @desc    Auth user
// @route   POST /api/auth/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
	const { login, password} = req.body

	const user = await prisma.user.findUnique({
		where: {
			login
		}
	})

	const isValidPassword = await verify(user.password, password)

	if (user && isValidPassword) {
		const token = generateToken(user.id)
		res.json({user ,token })
	} else {
		res.status(401)
		throw new Error('Email or password is not correct')
	}
})

// @desc    Auth user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
	const { email, password, login, numberPhone, fullName} = req.body
	const [lastName, firstName, otchestvo] = fullName.split(' ')
	function validateEmail(email) {
		return validator.isEmail(email);
	}

	if (!validateEmail(email)) {
		  res.status(400)
		  throw new Error('Email is not correct');
	}

	function validatePass(password) {
			return validator.isStrongPassword(password);
	}

	if (!validatePass(password)) {
			  res.status(400)
			  throw new Error('password not strong');
	}

	function validateMobilePhone(numberPhone,) {
			return validator.isMobilePhone(numberPhone, 'ru-RU');
	}

	if (!validateMobilePhone(numberPhone)) {
			  res.status(400)
			  throw new Error('incorrect number phone');
	}
	

	const isHaveUserWithThisEmail= await prisma.user.findUnique({
		where: {
			email
		}
	})

	if (isHaveUserWithThisEmail) {
		res.status(400)
		throw new Error('User with this email already exists')
	}
	
	const isHaveUserWithThisLogin= await prisma.user.findUnique({
		where: {
			login
		}
	})

	if (isHaveUserWithThisLogin) {
		res.status(400)
		throw new Error('User with this login already exists')
	}

	const user = await prisma.user.create({
		data: {
			email,
			password: await hash(password),
			firstName,
			lastName,
			otchestvo,
			numberPhone, 
			isAdmin: false,
			login
		},
		select: UserFields
	})

	const token = generateToken(user.id)

	res.json({ user, token })
})

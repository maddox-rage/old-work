import Cookies from 'js-cookie'
import { TOKEN, TOKENADMIN } from '../app.constants'
import { $axios } from '../api'

class AuthService {
	async login(login, password) {
		try {
			const { data } = await $axios.post("/auth/login", {
				login,
				password
			})
			if (data.user) Cookies.set(TOKENADMIN, data.user.isAdmin)
			if (data.token) Cookies.set(TOKEN, data.token)
			return data
		} catch (error) {
			throw new Error(error)
		}
	}
	async register(login, password, email, fullName, numberPhone) {
		try {
			const { data } = await $axios.post("/auth/register", {
				login,
				password, email,fullName,numberPhone
			})
			Cookies.set(TOKENADMIN, data.user.isAdmin)
			if (data.token) Cookies.set(TOKEN, data.token)
			
			return data
		} catch (error) {
			throw new Error(error)
		}
	}
}

export default new AuthService

import { $axios } from '../api'
const path = "/statement/user"
class StatementService {

    async getUsersStatements() {
       return  $axios.get(`${path}`)
    }

    async getAllStatements() {
        return  $axios.get("/statement")
     }

	 async getStatementById(id) {
        return  $axios.get(`/statement/${id}`)
     }

    async StatementCreate(description, autoNumber) {
		try {
			const { data } = await $axios.post("/statement", {
				description, autoNumber
			})

			return data
		} catch (error) {
			throw new Error(error)
		}
	}
	async UpdateStatement(id, status) {
		return $axios.put(`statement/${id}`, {status})
	}

	async DeleteStatement(id) {
		return $axios.delete(`statement/${id}`)
	}
}


export default new StatementService()

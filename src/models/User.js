const {db} = require('../database/connection')

class User {
    constructor({username, password, email, name}) {
        this.username = username
        this.password = password
        this.email = email
        this.name = name
    }
    //createUser es el metodo
    async createUser() {
        try {
            const doc = this
            const result = await db().collection('User').insertOne(doc)
            return result
        } catch (error) {
            console.error('Err -- model User -- method createUser.')
            throw error

        }
    }
    static async checkEmail({ email }) {
        try {
            const query = { email }
            const options = {
                projection: { email: 1 },
            }
            const result = await db().collection('usuarios').findOne(query, options)
            return result
        } catch (error) {
            console.error("ERR -- model User -- method checkEmail")
            throw error
        }
    }
    static async login({ username }) {
        try {
            const query = { username }
            const options = {
                projection: { password: 1 },
            }
            const result = await db().collection('usuarios').findOne(query, options)
            return result
        } catch (error) {
            console.error("ERR -- model User -- method login")
            throw error
        }
    }
}

module.exports = User
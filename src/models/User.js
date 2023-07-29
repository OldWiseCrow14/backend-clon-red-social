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
            console.log(error)
            throw error

        }
    }
}

module.exports = User
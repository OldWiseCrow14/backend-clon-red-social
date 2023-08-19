const { ObjectId } = require('mongodb')
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
            const result = await db().collection('User').findOne(query, options)
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
            const result = await db().collection('User').findOne(query, options)
            return result
        } catch (error) {
            console.error("ERR -- model User -- method login")
            throw error
        }
    }
    static async readUser({ _id }) {
        try {
            const result = await db().collection('User').aggregate([
                {
                    $match: { _id: new ObjectId(_id) }
                },
                {
                    $project: {
                      username: 1,
                      nombre: 1,
                      descripcion: 1,
                      followersCount: { $size: '$followers' },
                      followingCount: { $size: '$following' },
                      descripción: 1
                    }
                }
            ]).toArray()
            return result
        } catch (error) {
            console.error("ERR -- model User -- method readUser")
            throw error
        }
    }
    static async readSuggestions() {
        try {
            const result = await db().collection('User').aggregate([
                { $sample: { size: 10 } },
                {
                    $project: {
                        username: 1,
                        photo: 1
                    }
                }
            ]).toArray()
            return result
        } catch (error) {
            console.error("ERR -- model User -- method readSuggestions")
            throw error
        }
    }
}

module.exports = User
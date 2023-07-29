const {MongoClient}=require('mongodb')

const dbhost=process.env.DB_HOST
const dbusername=process.env.DB_USERNAME
const dbpassword=process.env.DB_PASSWORD
const dbdatabase=process.env.DB_DATABASE

const url=`mongodb+srv://${dbusername}:${dbpassword}@${dbhost}/${dbdatabase}?retryWrites=true&w=majority`

let conectioncloninstadb

const client=new MongoClient(url);

const mongodbconnect=async(param)=>{
    try {
        await client.connect()
        conectioncloninstadb=client
        await param()
        console.log('You have been connected succesfully!!')
    } catch (error) {
        console.error(error.stack)
        throw error
    }
}
const db=()=>{
    if(conectioncloninstadb) return conectioncloninstadb.db(dbdatabase)
    throw 'Database offline!!'
}

module.exports={
    mongodbconnect,
    db
}


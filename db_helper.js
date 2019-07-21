const lowDB = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')

const adapter = new fileSync('db.json')
const db = lowDB(adapter)

db.defaults({cards: []}).write()

let fetch = (schema)=>{
    return db.get(schema).value()
}

// let fetchByCharacterName = (schema, name)=>{
//     return db.get(schema).find({name: name}).value()
// }

let fetchByCardName = (schema, name)=>{
    return db.get(schema).find({name: name}).value()
}

let save = (schema, value)=>{
    return db.get(schema).push(value).write()
}

module.exports = {fetch, fetchByCardName, save}



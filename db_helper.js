const lowDB = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')

const adapter = new fileSync('db.json')
const db = lowDB(adapter)

db.defaults({magic: []}).write()

let fetch = (schema)=>{
    return db.get(schema).value()
}

let fetchByCardName = (schema, name)=>{
    var cards = db.get('magic').value()[0].cards
    var nomeCarta; 
    var carta;

    cards.forEach(card => {
        if(name == card.name){
            carta = card;
        }
    });
    
    return  carta;
    
}

let save = (schema, value)=>{
    return db.get(schema).push(value).write()
}

let fetchByCharacterName = (schema, name)=>{
    return db.get(schema).find({name: name}).value()
}


module.exports = {fetch, fetchByCardName, save}



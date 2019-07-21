const lowDB = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')

const adapter = new fileSync('db.json')
const db = lowDB(adapter)

db.defaults({magic: []}).write()

let fetch = (schema)=>{
    return db.get(schema).value()
}
function getCartas(){
    return db.get('magic').value()[0].cards;
}

let fetchByCardName = (schema, name)=>{
    var cards = getCartas();

    var i;
    for (i = 0; i < cards.length; i++) { 
        if(cards[i].name.match(name))
            return cards[i];
    }
        
    return "erro";
    
}

let save = (schema, value)=>{
    return db.get(schema).push(value).write()
}

let fetchByCharacterName = (schema, name)=>{
    return db.get(schema).find({name: name}).value()
}


module.exports = {fetch, fetchByCardName, save}



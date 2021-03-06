const lowDB = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')

const adapter = new fileSync('db.json')
const db = lowDB(adapter)


db.defaults({ magic: [], magicDump: [] }).write()

let fetch = (schema) => {
    return db.get(schema).value()
}
function getCards() {
    return db.get('magic').value()[0].cards;
}

let fetchAllCards = (schema, name) => {
    var cards = getCards();

    return cards;

}

let fetchByCardName = (schema, name) => {
    var cards = getCards();

    var i;
    for (i = 0; i < cards.length; i++) {
        if (cards[i].name.match(name))
            return cards[i];
    }
    return "erro";
}

let fetchByCardId = (schema, id) => {
    var cards = getCards();

    var i;
    for (i = 0; i < cards.length; i++) {
      //  if (cards[i].multiverseid.match(id.toString()))
        if (cards[i].multiverseid.toString().includes(id.toString()))
            return cards[i];
    }
    return "erro";
}


let fetchByCardText = (schema, text) => {
    var cards = getCards();

    var arrayCards = [];
    var i;
    for (i = 0; i < cards.length; i++) {
        if (cards[i].text && cards[i].text.toString().includes(text))
            arrayCards.push(cards[i]);

    }
    return arrayCards;
}

let save = (schema, value) => {
    return db.get(schema).push(value).write()
}

let fetchByCharacterName = (schema, name) => {
    return db.get(schema).find({ name: name }).value()
}


module.exports = { fetch, fetchByCardName, fetchByCardText, fetchAllCards, fetchByCardId, save }



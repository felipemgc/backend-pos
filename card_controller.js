const controller = require('express').Router()
const db = require('./db_helper')
const request = require('request')
const mtg = require('mtgsdk')

//get all the cards in the game. Is the first command to execute to populate the bank
controller.get('/cards', (req, res) => {
    request.get({
        url: 'https://api.magicthegathering.io/v1/cards'
    }, (error, response, data) => {
        if (error)
            res.statusCode(response.statusCode).send(error)
        res.send(data)
        db.save('magic', JSON.parse(data))
    })
})

//returns all cards that have been saved in the database
controller.get('/all-cards', (req, res) => {
    var data = db.fetchAllCards('magic');
    res.send(data);
})

//fetch card by name (title of the card)  
controller.get('/card-name/:name', (req, res) => {
    var data = db.fetchByCardName('magic', req.params.name);
    res.send(data);
})


//fetch card by text (text in the description of the card) 
controller.get('/card-text/:name', (req, res) => {
    var data = db.fetchByCardText('magic', req.params.name);
    res.send(data);
})


//fetch card by name and language  
//Ex: https://backend-magic.herokuapp.com/api/get-card-name/Arc%C3%A1ngel%20Avacyn/language/spanish
controller.get('/get-card-name/:name/language/:language', (req, res) => {
    var aux;
    mtg.card.where({ name: req.params.name, language: req.params.language })
        .then(results => {
            console.log(results)
            res.send((results));
        })
})


//get the cards to set up a listview by passing the pagination (int value) 
controller.get('/listview/:page', (req, res) => {
    mtg.card.where({ page: req.params.page, pageSize: 50 })
        .then(cards => {
            console.log(cards)
            res.send(cards);
        })
})


//search card by id (multiverseid)
//Ex:  https://backend-magic.herokuapp.com/api/search-id/130483
controller.get('/search-id/:id', (req, res) => {

    var data = db.fetchByCardId('magic', req.params.id);
    res.send(data);

})

//This function is used to load the local database with the information from the API cards.
controller.get('/dumpCards', (req, res) => {

    request.get({
        url: 'https://api.magicthegathering.io/v1/cards'
    }, (error, response, data) => {
        if (error)
            res.statusCode(response.statusCode).send(error)

        res.send(data)

        db.save('magicDump', JSON.parse(data))
    })
})

module.exports = controller
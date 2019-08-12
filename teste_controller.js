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
controller.get('/allCards', (req, res) => {
    var data = db.fetchAllCards('magic');
    res.send(data);
})

//fetch card by name (title of the card)
controller.get('/card/:name', (req, res) => {
    var data = db.fetchByCardName('magic',req.params.name);
    res.send(data);
})


//fetch card by text (text in the description of the card)
controller.get('/cardText/:name', (req, res) => {
    var data = db.fetchByCardText('magic',req.params.name);
    res.send(data);
})


//fetch card by name and language
controller.get('/get-card-name-language', (req, res) => {
    //   controller.get('/NomeIndiomaMtg', (req, res) => {
           var aux;
           mtg.card.where({name: 'Arcángel Avacyn', language: 'spanish'})
           .then(results => {        
               console.log(results)
               res.send((results));
           })   
       })
   

//fetch card by name and language
controller.get('/getByCardNameAndLanguage', (req, res) => {
 //   controller.get('/NomeIndiomaMtg', (req, res) => {
        var aux;
        mtg.card.where({name: 'Arcángel Avacyn', language: 'spanish'})
        .then(results => {        
            console.log(results)
            res.send((results));
        })   
    })

    //get the cards to set up a listview by passing the pagination.
controller.get('/listview/:page', (req, res) => {
    mtg.card.where({ page: req.params.page, pageSize: 50})
    .then(cards => {
        console.log(cards)
        res.send(cards);
    })
})


//search card by id
controller.get('/buscaPeloID', (req, res) => {
    mtg.card.find(386616)
    .then(result => {
        console.log(result.card)
    })
    return
})

controller.get('/testeBuscaMtg', (req, res) => {
    // varios filtros utilizando a api externa
    var cartas = []
        mtg.card.all({ supertypes: 'legendary', types: 'creature', colors: 'red,white' })
        .on('data', function (card) {
            console.log(card.name)
            
        });

    })


    //This function is used to load the local bank with the information from the API cards.
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


// controller.get('/mtgAllCards', (req, res) => {
//     console.log("entrou");
//     mtg.card.all()
//     .on('data', function (card) {
//         console.log(JSON.parse(data));
//         res.send(data)
//         //db.save('magic', JSON.parse(data))
//     });
//     console.log("saiu");
// })

module.exports = controller
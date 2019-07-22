const controller = require('express').Router()
const db = require('./db_helper')
const request = require('request')
const mtg = require('mtgsdk')


// url base:
//http://localhost:5000/api

//pega cartas as cartas do jogo via api. o primeiro comando a ser executado para popular o banco
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


controller.get('/allCards', (req, res) => {
    //retorna todas as cartas que foram salvas no banco de dados
    var data = db.fetchAllCards('magic');
    
    res.send(data);
})

controller.get('/card/:name', (req, res) => {
    //busca a carta pelo nome
    var data = db.fetchByCardName('magic',req.params.name);
    
    res.send(data);
})



controller.get('/cardText/:name', (req, res) => {
    //essa funcao busca a cartas que contam no texto a busca passada
    var data = db.fetchByCardText('magic',req.params.name);
    
    res.send(data);
})



controller.get('/NomeIndiomaMtg', (req, res) => {
        //busca carta pelo nome e idioma
        var aux;
        mtg.card.where({name: 'Arcángel Avacyn', language: 'spanish'})
        .then(results => {
            
            console.log(results)
            res.send((results));
        })
        
    })

controller.get('/listview/:page', (req, res) => {
    //pegar as cartas para montar um list view passando o paginate
    mtg.card.where({ page: req.params.page, pageSize: 50})
    .then(cards => {
        console.log(cards)
        res.send(cards);
    })

})

controller.get('/buscaPeloID', (req, res) => {
    //busca carta pelo id
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

controller.get('/dumpCards', (req, res) => {
    // essa funcao é utilizada para carregar o banco local 
    // com as informacoes das cartas da API

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
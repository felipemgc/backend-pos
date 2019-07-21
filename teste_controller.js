const controller = require('express').Router()
const db = require('./db_helper')
const request = require('request')


controller.get('/allCards', (req, res) => {
    var data = db.fetchAllCards('magic');
    
    res.send(data);
})

controller.get('/card/:name', (req, res) => {
    var data = db.fetchByCardName('magic',req.params.name);
    
    res.send(data);
})

controller.get('/cardText/:name', (req, res) => {
    var data = db.fetchByCardText('magic',req.params.name);
    
    
    res.send(data);
})

//http://localhost:5000/api/cards
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

// controller.post('/teste/:id', (req, res) => {
//     request.get({
//         url: `https://jsonplaceholder.typicode.com/todos/${req.params.id}`
//     }, (error, response, data) => {
//         if (error)
//             res.statusCode(response.statusCode).send(error)

//         res.send(data)
//     })
// })

// controller.post('/teste', (req, res) => {
//     request.get({
//         url: `https://jsonplaceholder.typicode.com/todos/${req.body.id}`
//     }, (error, response, data) => {
//         if (error)
//             res.statusCode(response.statusCode).send(error)

//         res.send(data)
//     })
// })

module.exports = controller
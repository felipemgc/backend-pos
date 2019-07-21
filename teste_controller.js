const controller = require('express').Router()
const db = require('./db_helper')
const request = require('request')
const mtg = require('mtgsdk')

// mtg.card.where({name: 'Archangel Avacyn'})
    //         .then(results => {
    //             console.log(results)
    //         });

controller.get('/card/:name', (req, res) => {
    var data = db.fetchByCardName('magic',req.params.name);
    
    res.send(data);
})

controller.post('/characters', (req, res) => {
    res.send(db.save('characters', req.body))
})

controller.put('/characters', (req, res) => {

})

controller.delete('/characters', (req, res) => {

})
//http://localhost:5000/api/cards
//pega todas as cartas do jogo
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
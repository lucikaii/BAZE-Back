const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const categoriasController = require('./controller/categorias_controller.js')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    
    next()
})

const jsonBodyParser = bodyParser.json()

// DADOS CATEGORIA
app.get('/v1/baze/categorias', cors(), async function(request, response, next){

    let dadosCategoria = await categoriasController.getListarCategorias()

    if(dadosCategoria){
        response.json(dadosCategoria)
        response.status(200)
    } else{
        response.json({message: 'NADA ENCONTRADO'})
        response.status(404)
    }
})

app.get('/v1/baze/categoria/:id', cors(), async function(request, response, next){

    let idCategoria = request.params.id

    let dadosCategoria = await categoriasController.getBuscarCategoria(idCategoria)

    if(dadosCategoria){
        response.json(dadosCategoria)
        response.status(200)
    } else{
        response.json({message: 'NADA ENCONTRADO'})
        response.status(404)
    }
})

app.post('/v1/baze/categoria', cors(), jsonBodyParser, async function(request, response, next){

    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultDados = await categoriasController.setInserirNovaCategoria(dadosBody, contentType)

    response.json(resultDados)
    response.status(resultDados.status_code)
})

app.delete('/v1/baze/categoria/:id', cors(), async function(request, response, next){

    let idCategoria = request.params.id
    let dadosCategoria = await categoriasController.setExcluirCategoria(idCategoria)

    response.json(dadosCategoria)
    response.status(200)
})

app.put('/v1/baze/atualizar/categoria/:id', jsonBodyParser, async function(request, response, next){

    let idCategoria = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultDados = await categoriasController.setAtualizarCategoria(idCategoria, contentType, dadosBody)

    response.json(resultDados)
    response.status(resultDados.status_code)

})

app.listen(8080, function(){
    console.log('A API já está em funcionamento, aguarde um tantinho...')
})
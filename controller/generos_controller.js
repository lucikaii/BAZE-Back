const config = require('../modulo/config.js')
const generoDAO = require('../model/DAO/generos.js')

const getListarGeneros = async function(){

    let jsonGeneros = {}
    let dadosGenero = await generoDAO.selectAllGeneros()

    if (dadosGenero) {
        
        if (dadosGenero.length > 0) {
            
            jsonGeneros.generos = dadosGenero
            jsonGeneros.quantidade = dadosGenero.length
            jsonGeneros.status_code = 200
            return jsonGeneros
        } else {
            return config.ERROR_NOT_FOUND
        }

    } else {
        return config.ERROR_INTERNAL_SERVER_DB
    }

}

const getBuscarGenero = async function(idGenero){

    let jsonGeneros = {}
    let dadosGenero = await generoDAO.selectByIdGenero(idGenero)

    if(dadosGenero){

        if (dadosGenero.length > 0) {
            jsonGeneros.generos = dadosGenero
            jsonGeneros.status_code = 200
            return jsonGeneros
        } else {
            return config.ERROR_NOT_FOUND
        }
    } else{
        return config.ERROR_INTERNAL_SERVER_DB
    }
}

const setInserirNovoGenero = async function(dadosGenero, contentType){

    try {
        
        if (String(contentType).toLowerCase() == 'application/json') {
            
            let statusValidate = false
            let jsonNovoGenero = {}

            if(dadosGenero.nome == '' || dadosGenero.nome == undefined || dadosGenero.nome == null || dadosGenero.nome.length > 100){

                return config.ERROR_REQUIRED_FIELDS
            } else{
                statusValidate = true
            }

            if(statusValidate){

                let novoGenero = await generoDAO.insertNovoGenero(dadosGenero)

                if(novoGenero){
                    jsonNovoGenero.status = config.SUCESS_CREATED_ITEM.status
                    jsonNovoGenero.status_code = config.SUCESS_CREATED_ITEM.status_code
                    jsonNovoGenero.message = config.SUCESS_CREATED_ITEM.message
                    jsonNovoGenero.genero = dadosGenero
                    jsonNovoGenero.id = dadosGenero.id
                    return jsonNovoGenero
                }
            }
        } else {
            return config.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return false
    }
}

const setExcluirGenero = async function(idGenero){

    try {
        
        if(idGenero == '' || idGenero == undefined || idGenero == null || isNaN(idGenero)){
            return config.ERROR_INVALID_ID
        } else{

            let dadosGenero = await generoDAO.deleteGenero(idGenero)

            if(dadosGenero){
                return config.SUCCESS_DELETED_ITEM
            } else{
                return config.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return false
    }
}

const setAtualizarGenero = async function(idGenero, contentType, dadosGenero){

    try {
        
        if (String(contentType).toLowerCase() == 'application/json') {
            
            let statusValidate = false
            let jsonNovoGenero = {}

            if(idGenero == '' || idGenero == undefined || idGenero == null || isNaN(idGenero) ||
            dadosGenero.nome == '' || dadosGenero.nome == undefined || dadosGenero.nome == null || dadosGenero.nome.length > 100){
                return config.ERROR_REQUIRED_FIELDS
            } else{
                statusValidate = true
            }

            if(statusValidate){

                let novoGenero = await generoDAO.updateGenero(idGenero, dadosGenero)

                if(novoGenero){
                    jsonNovoGenero.status = config.SUCCESS_UPDATED_ITEM.status
                    jsonNovoGenero.status_code = config.SUCCESS_UPDATED_ITEM.status_code
                    jsonNovoGenero.message = config.SUCCESS_UPDATED_ITEM.message
                    jsonNovoGenero.genero = dadosGenero
                    return jsonNovoGenero
                } else{
                    return config.ERROR_INTERNAL_SERVER_DB
                }
            }

        } else {
            return config.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    getListarGeneros,
    getBuscarGenero,
    setInserirNovoGenero,
    setExcluirGenero,
    setAtualizarGenero
}
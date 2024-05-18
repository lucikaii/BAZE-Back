const config = require('../modulo/config.js')
const categoriasDAO = require('../model/DAO/categorias.js')

const getListarCategorias = async function(){

    let jsonCategorias = {}
    let dadosCategoria = await categoriasDAO.selectAllCategorias()

    if(dadosCategoria){

        if(dadosCategoria.length > 0){

            jsonCategorias.categorias = dadosCategoria
            jsonCategorias.quantidade = dadosCategoria.length
            jsonCategorias.status_code = 200
            return jsonCategorias

        } else{
            return config.ERROR_NOT_FOUND
        }

    } else{
        return config.ERROR_INTERNAL_SERVER_DB
    }
}

const getBuscarCategoria = async function(idCategoria){

    let jsonCategorias = {}
    let dadosCategoria = await categoriasDAO.selectByIdCategoria(idCategoria)

    if(dadosCategoria){

        if (dadosCategoria.length > 0) {

            jsonCategorias.categorias = dadosCategoria
            jsonCategorias.status_code = 200
            return jsonCategorias
            
        } else {
            return config.ERROR_NOT_FOUND
        }

    } else{
        return config.ERROR_INTERNAL_SERVER_DB
    }
}

const setInserirNovaCategoria = async function(dadosCategoria, contentType){

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let statusValidate = false
            let jsonNovaCategoria = {}

            if (dadosCategoria.nome == ''|| dadosCategoria.nome == undefined || dadosCategoria.nome == null || dadosCategoria.nome.length > 100) {
                
                return config.ERROR_REQUIRED_FIELDS
            } else {
                statusValidate = true
            }

            if(statusValidate){

                let novaCategoria = await categoriasDAO.insertNovaCategoria(dadosCategoria)

                if(novaCategoria){
                    jsonNovaCategoria.status = config.SUCESS_CREATED_ITEM.status
                    jsonNovaCategoria.status_code = config.SUCESS_CREATED_ITEM.status_code
                    jsonNovaCategoria.message = config.SUCESS_CREATED_ITEM.message
                    jsonNovaCategoria.categoria = dadosCategoria
                    jsonNovaCategoria.id = dadosCategoria.id
                    return jsonNovaCategoria
                } else{
                    return config.ERROR_INTERNAL_SERVER_DB
                }
            }
            
        } else {
            return config.ERROR_CONTENT_TYPE
        }
        
    } catch (error) {
        return config.ERROR_INTERNAL_SERVER
    }
}

const setExcluirCategoria = async function(idCategoria){

    try {

        if(idCategoria == '' || idCategoria == undefined || idCategoria == null || isNaN(idCategoria)){
            return config.ERROR_INVALID_ID
        }else{
            let dadosCategoria = await categoriasDAO.deleteCategoria(idCategoria)

            if(dadosCategoria){
                return config.SUCCESS_DELETED_ITEM
            } else{
                return config.ERROR_INTERNAL_SERVER_DB
            }
        }
        
    } catch (error) {
        return config.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarCategoria = async function(idCategoria, contentType, dadosCategoria){

   try {

    if (String(contentType).toLowerCase() == 'application/json') {

        let statusValidate = false
        let jsonNovaCategoria = {}

        if(idCategoria == '' || idCategoria == undefined || idCategoria == null || isNaN(idCategoria) ||
           dadosCategoria.nome == '' || dadosCategoria.nome == undefined || dadosCategoria.nome == null || dadosCategoria.nome.length > 100){
            return config.ERROR_REQUIRED_FIELDS
        } else{
            statusValidate = true
        }
        if(statusValidate){

            let novaCategoria = await categoriasDAO.updateCategoria(idCategoria, dadosCategoria)

            if(novaCategoria){
                jsonNovaCategoria.status = config.SUCCESS_UPDATED_ITEM.status
                jsonNovaCategoria.status_code = config.SUCCESS_UPDATED_ITEM.status_code
                jsonNovaCategoria.message = config.SUCCESS_UPDATED_ITEM.message
                jsonNovaCategoria.categoria = dadosCategoria
                return jsonNovaCategoria
            } else{
                return config.ERROR_INTERNAL_SERVER_DB
            }
        }
        
    } else {
        return config.ERROR_CONTENT_TYPE
    }
    
   } catch (error) {
    return config.ERROR_INTERNAL_SERVER
   }
}

module.exports = {
    getListarCategorias,
    getBuscarCategoria,
    setInserirNovaCategoria,
    setExcluirCategoria,
    setAtualizarCategoria
}
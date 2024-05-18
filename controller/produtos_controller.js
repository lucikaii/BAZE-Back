const config = require('../modulo/config.js')
const produtosDAO = require('../model/DAO/produtos.js')


const getListarProdutos = async function(){

    let jsonProdutos = {}
    let dadosProduto = await produtosDAO.selectAllProdutos()

    if(dadosProduto){

        if(dadosProduto.length > 0){

            jsonProdutos.produtos = dadosProduto
            jsonProdutos.quantidade = dadosProduto.length
            jsonProdutos.status_code = 200
            return jsonProdutos

        } else{
            return config.ERROR_NOT_FOUND
        }

    } else{
        return config.ERROR_INTERNAL_SERVER_DB
    }
}

const getBuscarProduto = async function(idProduto){

    let jsonProdutos = {}
    let dadosProduto = await produtosDAO.selectByIdProduto(idProduto)

    if(dadosProduto){

        if (dadosProduto.length > 0) {

            jsonProdutos.produtos = dadosProduto
            jsonProdutos.status_code = 200
            return jsonProdutos
            
        } else {
            return config.ERROR_NOT_FOUND
        }

    } else{
        return config.ERROR_INTERNAL_SERVER_DB
    }
}

const setInserirNovoProduto = async function(dadosProduto, contentType){

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let statusValidate = false
            let jsonNovoProduto = {}

            if(dadosProduto.nome == ''|| dadosProduto.nome == undefined || dadosProduto.nome == null || dadosProduto.nome.length > 100 ||
               dadosProduto.descricao == '' || dadosProduto.descricao == undefined || dadosProduto.descricao == null || dadosProduto.descricao.length > 65000 ||
               dadosProduto.valor == '' || dadosProduto.valor == undefined || dadosProduto.valor == null || isNaN(dadosProduto.valor) ||
               dadosProduto.imagem == '' || dadosProduto.imagem == undefined || dadosProduto.imagem == null || dadosProduto.imagem.length > 300 ||
               dadosProduto.id_categoria == '' || dadosProduto.id_categoria == undefined || dadosProduto.id_categoria == null || isNaN(dadosProduto.id_categoria)
            ){
                return config.ERROR_REQUIRED_FIELDS
            } else{
                statusValidate = true
            }

            if(statusValidate){
                let novoProduto = await produtosDAO.insertNovoProduto(dadosProduto)

                if(novoProduto){
                    jsonNovoProduto.status = config.SUCESS_CREATED_ITEM.status
                    jsonNovoProduto.status_code = config.SUCESS_CREATED_ITEM.status_code
                    jsonNovoProduto.message = config.SUCESS_CREATED_ITEM.message
                    jsonNovoProduto.produto = dadosProduto
                    jsonNovoProduto.id = dadosProduto.id
                    return jsonNovoProduto
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

const setExcluirProduto = async function(idProduto){

    try {

        if(idProduto == '' || idProduto == undefined || idProduto == null || isNaN(idProduto)){
            return config.ERROR_INVALID_ID
        } else{

            let dadosProduto = await produtosDAO.deleteProduto(idProduto)

            if (dadosProduto) {
                return config.SUCCESS_DELETED_ITEM
            } else {
                return config.ERROR_INTERNAL_SERVER_DB
            }
        }
        
    } catch (error) {
        return config.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarProduto = async function(idProduto, contentType, dadosProduto){

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let statusValidate = false
            let jsonNovoProduto = {}

            if(dadosProduto.nome == ''|| dadosProduto.nome == undefined || dadosProduto.nome == null || dadosProduto.nome.length > 100 ||
               dadosProduto.descricao == '' || dadosProduto.descricao == undefined || dadosProduto.descricao == null || dadosProduto.descricao.length > 65000 ||
               dadosProduto.valor == '' || dadosProduto.valor == undefined || dadosProduto.valor == null || isNaN(dadosProduto.valor) ||
               dadosProduto.imagem == '' || dadosProduto.imagem == undefined || dadosProduto.imagem == null || dadosProduto.imagem.length > 300 ||
               dadosProduto.id_categoria == '' || dadosProduto.id_categoria == undefined || dadosProduto.id_categoria == null || isNaN(dadosProduto.id_categoria) ||
               idProduto == '' || idProduto == undefined || idProduto == null || isNaN(idProduto)
            ){
                return config.ERROR_REQUIRED_FIELDS
            } else{
                statusValidate = true
            }

            if(statusValidate){

                let novoProduto = await produtosDAO.updateProduto(idProduto, dadosProduto)

                if (jsonNovoProduto) {

                    jsonNovoProduto.status = config.SUCCESS_UPDATED_ITEM.status
                    jsonNovoProduto.status_code = config.SUCCESS_UPDATED_ITEM.status_code
                    jsonNovoProduto.message = config.SUCCESS_UPDATED_ITEM.message
                    jsonNovoProduto.produto = dadosProduto
                    return jsonNovoProduto
                    
                } else {
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
    getListarProdutos,
    getBuscarProduto,
    setInserirNovoProduto,
    setExcluirProduto,
    setAtualizarProduto
}
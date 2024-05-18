// Import da biblioteca do prima client
const { PrismaClient } = require('@prisma/client')

// Instanciando a classe do prisma client
const prisma = new PrismaClient()

const selectAllCategorias = async function(){

    try {

        let sql = `SELECT * FROM tbl_categoria`
        let resultCategoria = await prisma.$queryRawUnsafe(sql)

        return resultCategoria
        
    } catch (error) {
        return false
    }
}

const selectByIdCategoria = async function(idCategoria){

    try {

        let sql = `SELECT * FROM tbl_categoria WHERE id = ${idCategoria}`
        let resultCategoria = await prisma.$queryRawUnsafe(sql)
        return resultCategoria
        
    } catch (error) {
        return false
    }
}

const insertNovaCategoria = async function(dadosCategoria){

    try {

        let sql = `INSERT INTO tbl_categoria (nome) VALUES
                   ('${dadosCategoria.nome}')`
        let idSql = `SELECT cast(id AS DECIMAL) FROM tbl_categoria ORDER BY id DESC LIMIT 1`

        let resultCategoria = await prisma.$executeRawUnsafe(sql)
        let resultIdCategoria = await prisma.$queryRawUnsafe(idSql)

        if (resultCategoria, resultIdCategoria) {
            
            return resultCategoria, resultIdCategoria
        } else {
            return false
        }
        
    } catch (error) {
        return false
    }
}

const deleteCategoria = async function(idCategoria){

    try {

        let sql = `DELETE FROM tbl_categoria WHERE id = ${idCategoria}`
        let resultCategoria = await prisma.$executeRawUnsafe(sql)
        return resultCategoria
        
    } catch (error) {
        return false
    }
}

const updateCategoria = async function(idCategoria, dadosCategoria){

    try {
        
        let sql = `UPDATE tbl_categoria SET nome = '${dadosCategoria.nome}' WHERE id = ${idCategoria}`
        let resultCategoria = await prisma.$executeRawUnsafe(sql)
        return resultCategoria

    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllCategorias,
    selectByIdCategoria,
    insertNovaCategoria,
    deleteCategoria,
    updateCategoria
}
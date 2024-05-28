// Import da biblioteca do prima client
const { PrismaClient } = require('@prisma/client')

// Instanciando a classe do prisma client
const prisma = new PrismaClient()

const selectAllGeneros = async function(){

    try {
        
        let sql = `SELECT * FROM tbl_genero`
        let resultGenero = await prisma.$queryRawUnsafe(sql)

        return resultGenero

    } catch (error) {
        return false
    }
}

const selectByIdGenero = async function(idGenero){

    try {
        
        let sql = `SELECT * FROM tbl_genero WHERE id = ${idGenero}`
        let resultGenero = await prisma.$queryRawUnsafe(sql)

        return resultGenero
    } catch (error) {
        return false
    }
}

const insertNovoGenero = async function(dadosGenero){

    try {
        
        let sql = `INSERT INTO tbl_genero(nome) VALUES
                   ('${dadosGenero.nome}')`
        let idSql = `SELECT cast(id AS DECIMAL) FROM tbl_genero ORDER BY id DESC LIMIT 1`
        
        let resultGenero = await prisma.$executeRawUnsafe(sql)
        let resultIdGenero = await prisma.$queryRawUnsafe(idSql)

        if (resultGenero, resultIdGenero) {
            return resultGenero, resultIdGenero
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const deleteGenero = async function(idGenero){

    try {
        
        let sql = `DELETE FROM tbl_genero WHERE id = ${idGenero}`
        let resultGenero = await prisma.$executeRawUnsafe(sql)
        return resultGenero
    } catch (error) {
        return false
    }
}

const updateGenero = async function(idGenero, dadosGenero){

    try {
        
        let sql = `UPDATE tbl_genero SET nome = '${dadosGenero.nome}' WHERE id = ${idGenero}`
        let resultGenero = await prisma.$executeRawUnsafe(sql)
        return resultGenero
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllGeneros,
    selectByIdGenero,
    insertNovoGenero,
    deleteGenero,
    updateGenero
}
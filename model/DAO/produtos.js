// Import da biblioteca do prima client
const { PrismaClient } = require('@prisma/client')

// Instanciando a classe do prisma client
const prisma = new PrismaClient()

const selectAllProdutos = async function(){

    try {
        
        let sql = `SELECT * FROM tbl_produto`
        let resultProduto = await prisma.$queryRawUnsafe(sql)

        return resultProduto
    } catch (error) {
        return false
    }
}

const selectByIdProduto = async function(idProduto){

    try {
        
        let sql = `SELECT * FROM tbl_produto WHERE id = ${idProduto}`
        let resultProduto = await prisma.$queryRawUnsafe(sql)
        return resultProduto
    } catch (error) {
        return false
    }
}

const insertNovoProduto = async function(dadosProduto){

    try {
        
        let sql = `INSERT INTO tbl_produto (nome, descricao, valor, imagem, id_categoria) VALUES
        (
            '${dadosProduto.nome}',
            '${dadosProduto.descricao}',
            '${dadosProduto.valor}',
            '${dadosProduto.imagem}',
            ${dadosProduto.id_categoria}
        )`
        let idSql = `SELECT cast(id AS DECIMAL) FROM tbl_categoria ORDER BY id DESC LIMIT 1`

        let resultProduto = await prisma.$executeRawUnsafe(sql)
        let resultIdProduto = await prisma.$queryRawUnsafe(idSql)

        if(resultProduto, resultIdProduto){
            return resultProduto, resultIdProduto
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const deleteProduto = async function(idProduto){

    try {

        let sql = `DELETE FROM tbl_produto WHERE id = ${idProduto}`
        let resultProduto = await prisma.$executeRawUnsafe(sql)
        return resultProduto
        
    } catch (error) {
        return false
    }
}

const updateProduto = async function(idProduto, dadosProduto){

    try {
        
        let sql = `UPDATE tbl_produto SET
                   nome = '${dadosProduto.nome}',
                   descricao = '${dadosProduto.descricao}',
                   valor = '${dadosProduto.valor}',
                   imagem = '${dadosProduto.imagem}',
                   id_categoria = ${dadosProduto.id_categoria}
                   WHERE id = ${idProduto}`
        let resultProduto = await prisma.$executeRawUnsafe(sql)
        return resultProduto
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllProdutos,
    selectByIdProduto,
    insertNovoProduto,
    deleteProduto,
    updateProduto
}
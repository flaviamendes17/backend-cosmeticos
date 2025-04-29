const pool = require('../config/database');

const getCosmeticos = async () => {
    const result = await pool.query("SELECT * FROM produtos");
    return result.rows;
};

const getCosmeticosById = async (id) => {
    const result = await pool.query("SELECT * FROM produtos WHERE id = $1", [id]);
    return result.rows[0];
};

const createCosmeticos = async (nome, descricao, preco, marca_id) => {
    const result = await pool.query("INSERT INTO produtos (nome, descricao, preco, marca_id) VALUES ($1, $2, $3, $4) RETURNING *", [nome, descricao, preco, marca_id]);
    return result.rows[0];
};

const deleteCosmeticos = async (id) => {
    const result = await pool.query("DELETE FROM produtos WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
        throw new Error('Produto não encontrado');
    }

    return { message: 'Produto deletado com sucesso' };
}

const updateCosmeticos = async (nome, descricao, preco, marca_id) => {
    const result = await pool.query("UPDATE produtos SET nome = $1, descricao = $2, preco = $3, marca_id = $4 WHERE id = $5 RETURNING *", [nome, descricao, preco, marca_id, id]);
    return result.rows[0];
};

module.exports = { getCosmeticos, getCosmeticosById, createCosmeticos, deleteCosmeticos, updateCosmeticos };
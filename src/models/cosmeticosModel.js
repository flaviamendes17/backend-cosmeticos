const pool = require('../config/database');

const getProdutos = async () => {
    try {
        const result = await pool.query(`
            SELECT * 
            FROM produtos
        `);
        console.log('Produtos encontrados:', result.rows); 
    } catch (error) {
        console.error('Erro ao buscar produtos:', error); 
        throw error;
    }
};

const getProdutosById = async (id) => {
    const result = await pool.query("SELECT * FROM produtos WHERE id = $1", [id]);
    return result.rows[0];
};

const createProdutos = async (nome, descricao, preco, marca_id) => {
    const result = await pool.query("INSERT INTO produtos (nome, descricao, preco, marca_id) VALUES ($1, $2, $3, $4) RETURNING *", [nome, descricao, preco, marca_id]);
    return result.rows[0];
};

const deleteProdutos = async (id) => {
    const result = await pool.query("DELETE FROM produtos WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
        throw new Error('Produto não encontrado');
    }

    return { message: 'Produto deletado com sucesso' };
}

const updateProdutos = async (id, nome, descricao, preco, marca_id) => {
    try {
        const result = await pool.query(`
            UPDATE produtos
            SET nome = $1, descricao = $2, preco = $3, marca_id = $4
            WHERE id = $5
            RETURNING *
        `, [nome, descricao, preco, marca_id, id]);

        if (result.rowCount === 0) {
            return null; // Produto não encontrado
        }

        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar produto no banco de dados:', error); // Log do erro
        throw error;
    }
};

module.exports = { getProdutos, getProdutosById, createProdutos, deleteProdutos, updateProdutos };
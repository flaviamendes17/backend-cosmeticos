const pool = require('../config/database');

const getMarcas = async () => {
    try {
        const result = await pool.query(`
            SELECT * 
            FROM marcas
        `);
        console.log('Marcas encontradas no banco de dados:', result.rows);
        return result.rows;
    } catch (error) {
        console.error('Erro ao buscar marcas no banco de dados:', error);
        throw error;
    }
};

const getMarcasById = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM marcas WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao buscar marca por ID:', error);
        throw error;
    }
};

const createMarcas = async (nome, localizacao) => {
    try {
        const result = await pool.query(
            'INSERT INTO marcas (nome, localizacao) VALUES ($1, $2) RETURNING *',
            [nome, localizacao]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao criar marca:', error);
        throw error;
    }
};

const deleteMarcas = async (id) => {
    try {
        const result = await pool.query(
            'DELETE FROM marcas WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rowCount === 0) {
            throw new Error('Marca não encontrada');
        }

        return { message: 'Marca deletada com sucesso' };
    } catch (error) {
        console.error('Erro ao deletar marca:', error);
        throw error;
    }
};

const updateMarcas = async (id, nome, localizacao) => {
    try {
        const result = await pool.query(
            'UPDATE marcas SET nome = $1, localizacao = $2 WHERE id = $3 RETURNING *',
            [nome, localizacao, id]
        );

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar marca no banco de dados:', error);
        throw error;
    }
};

module.exports = { getMarcas, getMarcasById, createMarcas, deleteMarcas, updateMarcas};
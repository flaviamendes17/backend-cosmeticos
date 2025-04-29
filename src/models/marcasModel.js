const pool = require('../config/database');

const getMarcas = async () => {
    try {
        const result = await pool.query(`
            SELECT * 
            FROM marcas
        `);
        console.log('Marcas encontradas no banco de dados:', result.rows); // Log para depuração
        return result.rows;
    } catch (error) {
        console.error('Erro ao buscar marcas no banco de dados:', error); // Log do erro
        throw error;
    }
};

const getMarcasById = async (id) => {
    const result = await pool.query(`SELECT marcas.* 
        FROM marcas
        WHERE id = $1`, [id]
    );
    return result.rows[0];
};

const createMarcas = async (nome, localizacao) => {
    const result = await pool.query(`INSERT INTO marcas (nome, localizacao) 
        VALUES ($1, $2) RETURNING *`, [nome, localizacao]
    );
    return result.rows[0];
};

const deleteMarcas = async (id) => {
    const result = await pool.query(`DELETE FROM marcas WHERE id = $1 RETURNING *`, [id]);

    if (result.rowCount === 0) {
        throw new Error('Marca não encontrada');
    }

    return { message: 'Marca deletada com sucesso' };
};

const updateMarcas = async (id, nome, localizacao) => {
    try {
        const result = await pool.query(`
            UPDATE marcas
            SET nome = $1, localizacao = $2
            WHERE id = $3
            RETURNING *
        `, [nome, localizacao, id]);

        if (result.rowCount === 0) {
            return null; // Marca não encontrada
        }

        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar marca no banco de dados:', error); // Log do erro
        throw error;
    }
};

module.exports = { getMarcas, getMarcasById, createMarcas, deleteMarcas, updateMarcas};
const pool = require('../config/database');

const getMarcas = async (nome) => {
    if (!nome) {
        const result = await pool.query(`
            SELECT marcas.* 
            FROM marcas
            LEFT JOIN marcas ON marcas_id = marcas.id
        `);
        return result.rows;
    } else {
        const result = await pool.query(`
            SELECT marcas.* 
            FROM marcas
            LEFT JOIN marcas ON marcas_id = marcas.id
            WHERE nome ILIKE $1
        `, [`%${nome}%`]);
        return result.rows;
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
    const result = await pool.query(`UPDATE marcas SET nome = $1, localizacao = $2 
        WHERE id = $3 RETURNING *`, [nome, localizacao, id]
    );
    return result.rows[0];
};

module.exports = { getMarcas, getMarcasById, createMarcas, deleteMarcas, updateMarcas };
const marcasModel = require('../models/marcasModel');
const pool = require('../config/database');

const getAllMarcas = async (req, res) => {
    try {
        const { nome } = req.query; 
        const marcas = await marcasModel.getMarcas(nome); 
        res.json(marcas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar marcas' });
    }
};

const getMarcas = async (req, res) => {
    try {
        const marcas = await marcasModel.getMarcasById(req.params.id);
        if (!marcas) {
            return res.status(404).json({ error: 'Marca não encontrada' });
        }
        res.json(marcas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar marca' });
    }
};

const createMarcas = async (req, res) => {
    try {
        const { nome, localizacao } = req.body;
        console.log('Dados recebidos para criar marca:', { nome, localizacao }); 

        if (!nome || !localizacao) {
            return res.status(400).json({ error: 'Nome e localização são obrigatórios' });
        }

        const result = await pool.query(`
            INSERT INTO marcas (nome, localizacao) 
            VALUES ($1, $2) RETURNING *
        `, [nome, localizacao]);

        console.log('Marca criada:', result.rows[0]); 
        res.status(201).json(result.rows[0]); 
    } catch (error) {
        console.error('Erro ao criar marca no banco de dados:', error); 
        res.status(500).json({ error: 'Erro ao criar marca' });
    }
};

const deleteMarcas = async (req, res) => {
    try {
        const message = await marcasModel.deleteMarcas(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar marca' });
    }
};

const updateMarcas = async (req, res) => {
    try {
        const { nome, localizacao } = req.body;
        console.log('Dados recebidos para atualizar marca:', { nome, localizacao }); 

        if (!nome || !localizacao) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        const marca = await marcasModel.updateMarcas(req.params.id, nome, localizacao);

        if (!marca) {
            console.log('Marca não encontrada para o ID:', req.params.id); 
            return res.status(404).json({ error: 'Marca não encontrada' });
        }

        console.log('Marca atualizada com sucesso:', marca); 
    } catch (error) {
        console.error('Erro ao atualizar marca:', error); 
        res.status(500).json({ error: 'Erro ao atualizar marca' });
    }
};

module.exports = { getAllMarcas, getMarcas, createMarcas, deleteMarcas, updateMarcas };
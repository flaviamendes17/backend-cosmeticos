const marcasModel = require('../models/marcasModel');

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
        const marcas = await marcasModel.createMarcas(nome, localizacao);
        res.status(201).json(marcas);
    } catch (error) {
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
        const marcas = await marcasModel.updateMarcas(req.params.id, nome, localizacao);
        if (!marcas) {
            return res.status(404).json({ error: 'Marca não encontrada' });
        }
        res.json(marcas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar marca' });
    }
};

module.exports = { getAllMarcas, getMarcas, createMarcas, deleteMarcas, updateMarcas };
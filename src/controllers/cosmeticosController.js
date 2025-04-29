const produtosModel = require('../models/cosmeticosModel');

const getAllProdutos = async (req, res) => {
    try {
        const produtos = await produtosModel.getProdutos();
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
};

const getProdutos = async (req, res) => {
    try {
        const produtos = await produtosModel.getProdutosById(req.params.id);
        if (!produtos) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produto' });
    }
};

const createProdutos = async (req, res) => {
    try {
        const { nome, descricao, preco, marca_id } = req.body;
        const produtos = await produtosModel.createProdutos(nome, descricao, preco, marca_id);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
};

const deleteProdutos = async (req, res) => {
    try {
        const message = await produtosModel.deleteProdutos(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar produto' });
    }
};

const updateProdutos = async (req, res) => {
    try {
        const { nome, descricao, preco, marca_id } = req.body;
        const produtos = await produtosModel.updateProdutos(nome, descricao, preco, marca_id);
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
};

module.exports = { getAllProdutos, getProdutos, createProdutos, deleteProdutos, updateProdutos };
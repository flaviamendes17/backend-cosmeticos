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
        res.status(201).json(produtos);
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
        console.log('Dados recebidos para atualizar produto:', { nome, descricao, preco, marca_id }); // Log para depuração

        if (!nome || !descricao || !preco || !marca_id) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        const produto = await produtosModel.updateProdutos(req.params.id, nome, descricao, preco, marca_id);

        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        res.json(produto);
    } catch (error) {
        console.error('Erro ao atualizar produto:', error); // Log do erro
        res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
};

module.exports = { getAllProdutos, getProdutos, createProdutos, deleteProdutos, updateProdutos };
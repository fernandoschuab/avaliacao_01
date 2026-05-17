const { Produto, Categoria } = require('../model/modelos');

const cria_get = async (req, res) => {
  try {
    res.set('Cache-Control', 'private, max-age=5184000, must-revalidate');
    const categorias = await Categoria.findAll();
    res.render('cria_produto', {
      categorias: categorias.map(c => c.toJSON())
    });
  } catch (err) {
    res.status(500).render('error', { message: err.message });
  }
};

const cria_post = async (req, res) => {
  try {
    const { nome, preco, descricao, quantidade, status, categoria_id } = req.body;
    const usuario_id = req.user.id;
    const erros = [];

    if (!nome || nome.trim() === '') erros.push('Nome é obrigatório');
    if (!preco || isNaN(preco) || Number(preco) <= 0) erros.push('Preço deve ser um número positivo');
    if (!descricao || descricao.trim() === '') erros.push('Descrição é obrigatória');
    if (quantidade === undefined || quantidade === '' || isNaN(quantidade) || Number(quantidade) < 0) erros.push('Quantidade deve ser um número maior ou igual a zero');
    if (!status) erros.push('Status é obrigatório');
    if (!categoria_id) erros.push('Categoria é obrigatória');

    if (erros.length > 0) {
      res.set('Cache-Control', 'private, max-age=5184000, must-revalidate');
      const categorias = await Categoria.findAll();
      return res.status(400).render('cria_produto', {
        erros,
        categorias: categorias.map(c => c.toJSON()),
        valores: req.body
      });
    }

    await Produto.create({ nome, preco, descricao, quantidade, status, categoria_id, usuario_id });
    res.redirect('/');
  } catch (err) {
    res.status(500).render('error', { message: err.message });
  }
};

const consulta = async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store');
    const id = parseInt(req.params.id);
    if (!id || isNaN(id) || id <= 0) {
      return res.status(400).render('error', { message: 'ID inválido.' });
    }
    const produto = await Produto.findByPk(id, {
      include: [{ model: Categoria, as: 'categoria' }]
    });
    if (!produto) {
      return res.status(404).render('error', { message: 'Produto não encontrado.' });
    }
    res.render('consulta_produto', { produto: produto.toJSON() });
  } catch (err) {
    res.status(500).render('error', { message: err.message });
  }
};

const venda = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id || isNaN(id) || id <= 0) {
      return res.status(400).render('error', { message: 'ID inválido.' });
    }
    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).render('error', { message: 'Produto não encontrado.' });
    }
    if (produto.quantidade <= 0) {
      return res.status(400).render('error', { message: 'Quantidade insuficiente para venda.' });
    }
    await produto.decrement('quantidade');
    res.redirect('/');
  } catch (err) {
    res.status(500).render('error', { message: err.message });
  }
};

const compra = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id || isNaN(id) || id <= 0) {
      return res.status(400).render('error', { message: 'ID inválido.' });
    }
    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).render('error', { message: 'Produto não encontrado.' });
    }
    await produto.increment('quantidade');
    res.redirect('/');
  } catch (err) {
    res.status(500).render('error', { message: err.message });
  }
};

module.exports = { cria_get, cria_post, consulta, venda, compra };

const { Produto, Categoria, Usuario } = require('../model/modelos');

const cria_get = async (req, res) => {
  try {
    res.set('Cache-Control', 'private, max-age=5184000, must-revalidate');
    const categorias = await Categoria.findAll();
    const usuarios = await Usuario.findAll();
    res.render('cria_produto', {
      categorias: categorias.map(c => c.toJSON()),
      usuarios: usuarios.map(u => u.toJSON())
    });
  } catch (err) {
    res.status(500).render('error', { message: err.message });
  }
};

const cria_post = async (req, res) => {
  try {
    const { nome, preco, descricao, quantidade, status, categoria_id, usuario_id } = req.body;
    const erros = [];

    if (!nome || nome.trim() === '') erros.push('Nome é obrigatório');
    if (!preco || isNaN(preco) || Number(preco) <= 0) erros.push('Preço deve ser um número positivo');
    if (!descricao || descricao.trim() === '') erros.push('Descrição é obrigatória');
    if (quantidade === undefined || quantidade === '' || isNaN(quantidade) || Number(quantidade) < 0) erros.push('Quantidade deve ser um número maior ou igual a zero');
    if (!status) erros.push('Status é obrigatório');
    if (!categoria_id) erros.push('Categoria é obrigatória');
    if (!usuario_id) erros.push('Usuário responsável é obrigatório');

    if (erros.length > 0) {
      res.set('Cache-Control', 'private, max-age=5184000, must-revalidate');
      const categorias = await Categoria.findAll();
      const usuarios = await Usuario.findAll();
      return res.status(400).render('cria_produto', {
        erros,
        categorias: categorias.map(c => c.toJSON()),
        usuarios: usuarios.map(u => u.toJSON()),
        valores: req.body
      });
    }

    await Produto.create({ nome, preco, descricao, quantidade, status, categoria_id, usuario_id });
    res.redirect('/');
  } catch (err) {
    res.status(500).render('error', { message: err.message });
  }
};

module.exports = { cria_get, cria_post };

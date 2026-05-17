const { Produto, Categoria } = require('../model/modelos');

const tela_principal = async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store');
    const produtos = await Produto.findAll({
      include: [{ model: Categoria, as: 'categoria' }]
    });
    res.render('index', { produtos: produtos.map(p => p.toJSON()) });
  } catch (err) {
    res.status(500).render('error', { message: err.message });
  }
};

module.exports = { tela_principal };

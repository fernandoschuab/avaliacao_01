const bcrypt = require('bcrypt');
const { Categoria, Usuario, Produto } = require('../model/modelos');

const seed = async (req, res) => {
  try {
    const totalCategorias = await Categoria.count();
    if (totalCategorias > 0) {
      return res.status(200).send('Seed já executado anteriormente.');
    }

    const categorias = await Categoria.bulkCreate([
      { nome: 'Notebook' },
      { nome: 'Celular' },
      { nome: 'Teclado' },
      { nome: 'Monitor' },
      { nome: 'Mouse' }
    ]);

    const senha_hash = await bcrypt.hash('123456', 10);
    const usuario = await Usuario.create({
      nome: 'Administrador',
      email: 'admin@electrostore.com',
      senha_hash,
      perfil: 'admin'
    });

    await Produto.bulkCreate([
      { nome: 'Notebook Dell Inspiron', preco: 3500.00, descricao: 'Notebook com processador Intel i5, 8GB RAM e SSD 256GB.', quantidade: 5, status: 'ativo', categoria_id: categorias[0].id, usuario_id: usuario.id },
      { nome: 'Samsung Galaxy S23', preco: 2999.90, descricao: 'Smartphone Android com câmera tripla de 50MP.', quantidade: 0, status: 'ativo', categoria_id: categorias[1].id, usuario_id: usuario.id },
      { nome: 'Teclado Mecânico RGB', preco: 249.90, descricao: 'Teclado mecânico com switches blue e iluminação RGB.', quantidade: 10, status: 'ativo', categoria_id: categorias[2].id, usuario_id: usuario.id },
      { nome: 'Monitor LG 24 Full HD', preco: 899.00, descricao: 'Monitor IPS de 24 polegadas com painel Full HD.', quantidade: 3, status: 'inativo', categoria_id: categorias[3].id, usuario_id: usuario.id },
      { nome: 'Mouse Logitech MX Master', preco: 499.00, descricao: 'Mouse ergonômico com conectividade multi-dispositivo.', quantidade: 8, status: 'ativo', categoria_id: categorias[4].id, usuario_id: usuario.id }
    ]);

    res.status(200).send('Seed executado com sucesso.');
  } catch (err) {
    res.status(500).send('Erro ao executar seed: ' + err.message);
  }
};

module.exports = { seed };

const bcrypt = require('bcrypt');
const { Categoria, Usuario } = require('../model/modelos');

const seed = async (req, res) => {
  try {
    const totalCategorias = await Categoria.count();
    if (totalCategorias > 0) {
      return res.status(200).send('Seed já executado anteriormente.');
    }

    await Categoria.bulkCreate([
      { nome: 'Notebook' },
      { nome: 'Celular' },
      { nome: 'Teclado' },
      { nome: 'Monitor' },
      { nome: 'Mouse' }
    ]);

    const senha_hash = await bcrypt.hash('123456', 10);
    await Usuario.create({
      nome: 'Administrador',
      email: 'admin@electrostore.com',
      senha_hash,
      perfil: 'admin'
    });

    res.status(200).send('Seed executado com sucesso.');
  } catch (err) {
    res.status(500).send('Erro ao executar seed: ' + err.message);
  }
};

module.exports = { seed };

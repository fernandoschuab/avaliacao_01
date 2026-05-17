const { DataTypes } = require('sequelize');
const sequelize = require('./server');

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  perfil: {
    type: DataTypes.ENUM('usuario', 'admin', 'lojista'),
    allowNull: false,
    defaultValue: 'usuario'
  }
});

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  status: {
    type: DataTypes.ENUM('ativo', 'inativo'),
    allowNull: false,
    defaultValue: 'ativo'
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Categoria.hasMany(Produto, { foreignKey: 'categoria_id', as: 'produtos' });
Produto.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categoria' });

Usuario.hasMany(Produto, { foreignKey: 'usuario_id', as: 'produtos' });
Produto.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso.');
  })
  .catch(err => {
    console.error('Erro ao sincronizar tabelas:', err);
  });

module.exports = { Categoria, Usuario, Produto };

const bcrypt = require('bcrypt');
const passport = require('../config/passport');
const { Usuario } = require('../model/modelos');

const cadastro_get = (req, res) => {
  try {
    res.set('Cache-Control', 'private, max-age=31536000, immutable');
    res.render('cadastro_usuario');
  } catch (err) {
    res.status(500).render('error', { message: err.message });
  }
};

const cadastro_post = async (req, res) => {
  try {
    const { nome, email, senha, confirmar_senha } = req.body;
    const erros = [];

    if (!nome || nome.trim() === '') erros.push('Nome é obrigatório');
    if (!email || email.trim() === '') erros.push('E-mail é obrigatório');
    if (!senha || senha.length < 6) erros.push('Senha deve ter no mínimo 6 caracteres');
    if (senha !== confirmar_senha) erros.push('As senhas não conferem');

    if (erros.length > 0) {
      res.set('Cache-Control', 'private, max-age=31536000, immutable');
      return res.status(400).render('cadastro_usuario', { erros, valores: req.body });
    }

    const existente = await Usuario.findOne({ where: { email } });
    if (existente) {
      res.set('Cache-Control', 'private, max-age=31536000, immutable');
      return res.status(400).render('cadastro_usuario', {
        erros: ['E-mail já cadastrado'],
        valores: req.body
      });
    }

    const senha_hash = await bcrypt.hash(senha, 10);
    await Usuario.create({ nome, email, senha_hash, perfil: 'usuario' });
    res.redirect('/usuario/login');
  } catch (err) { 
    res.status(500).render('error', { message: err.message });
  }
};

const login_get = (req, res) => {
  try {
    res.render('login', { erro: req.flash ? req.flash('error') : null });
  } catch (err) {
    res.status(500).render('error', { message: err.message });
  }
};

const login_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/usuario/login',
  failureFlash: false
});

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};

module.exports = { cadastro_get, cadastro_post, login_get, login_post, logout };

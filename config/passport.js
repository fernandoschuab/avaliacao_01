const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { Usuario } = require('../model/modelos');

passport.use(new LocalStrategy(
  { usernameField: 'email', passwordField: 'senha' },
  async (email, senha, done) => {
    try {
      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return done(null, false, { message: 'E-mail ou senha incorretos.' });
      }
      const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
      if (!senhaValida) {
        return done(null, false, { message: 'E-mail ou senha incorretos.' });
      }
      return done(null, usuario);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const usuario = await Usuario.findByPk(id);
    done(null, usuario);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;

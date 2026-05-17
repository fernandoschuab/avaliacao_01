const ehAutenticado = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/usuario/login');
};

const ehAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.perfil === 'admin') {
    return next();
  }
  res.status(403).render('error', { message: 'Acesso restrito a administradores.' });
};

const ehLojista = (req, res, next) => {
  if (req.isAuthenticated() && req.user.perfil === 'lojista') {
    return next();
  }
  res.status(403).render('error', { message: 'Acesso restrito a lojistas.' });
};

module.exports = { ehAutenticado, ehAdmin, ehLojista };

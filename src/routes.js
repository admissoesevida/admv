import { Router } from 'express';

const routes = Router({});

/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.locals = {
    title: 'ADMV - Assembléia de Deus Missões e Vida',
    message: 'This is a message'
  };

  res.render('pages/index');
});

export default routes;

const ROUTE_NAME = 'expense-types';

export default (app, db) => {
  app.get(`/${ROUTE_NAME}`, (req, res) =>
    db.incomeType.findAll().then(result => res.json(result))
  );

  app.get(`/${ROUTE_NAME}/:id`, (req, res) =>
    db.incomeType.findByPk(req.params.id).then(result => res.json(result))
  );

  app.post(`/${ROUTE_NAME}`, (req, res) =>
    db.incomeType
      .create({
        name: req.body.name,
        note: req.body.note || ''
      })
      .then(result => res.json(result))
  );

  app.put(`/${ROUTE_NAME}/:id`, (req, res) =>
    db.incomeType
      .update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(result => res.json(result))
  );

  app.delete(`/${ROUTE_NAME}/:id`, (req, res) =>
    db.incomeType
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => res.json(result))
  );
};

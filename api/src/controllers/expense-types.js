const ROUTE_NAME = 'expense-types';

export default (app, db) => {
  const model = db.expenseType;

  app.get(`/${ROUTE_NAME}`, (req, res) =>
    model.findAll().then(result => res.json(result))
  );

  app.get(`/${ROUTE_NAME}/:id`, (req, res) =>
    model.findByPk(req.params.id).then(result => res.json(result))
  );

  app.get(`/${ROUTE_NAME}/:id/expenses`, (req, res) =>
    model
      .findByPk(req.params.id, {
        include: [
          {
            model: db.expense,
            as: 'expenses'
          }
        ]
      })
      .then(result => res.json(result))
  );

  app.post(`/${ROUTE_NAME}`, (req, res) =>
    model
      .create({
        name: req.body.name,
        note: req.body.note || ''
      })
      .then(result => res.json(result))
  );

  app.put(`/${ROUTE_NAME}/:id`, (req, res) =>
    model
      .update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(result => res.json(result))
  );

  app.delete(`/${ROUTE_NAME}/:id`, (req, res) =>
    model
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => res.json(result))
  );
};

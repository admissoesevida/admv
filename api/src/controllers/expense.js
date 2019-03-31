const ROUTE_NAME = 'expenses';

export default (app, db) => {
  const model = db.expense;

  app.get(`/${ROUTE_NAME}`, (req, res) =>
    model.findAll().then(result => res.json(result))
  );

  app.get(`/${ROUTE_NAME}/:id`, (req, res) =>
    model.findByPk(req.params.id).then(result => res.json(result))
  );

  app.post(`/${ROUTE_NAME}`, (req, res) =>
    model
      .create({
        date: req.body.date,
        value: req.body.value,
        providerId: req.body.providerId,
        expenseTypeId: req.body.expenseTypeId,
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

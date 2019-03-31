export default (app, db) => {
  app.get('/income-types', (req, res) =>
    db.incomeType.findAll().then(result => res.json(result))
  );

  app.get('/income-types/:id', (req, res) =>
    db.incomeType.findByPk(req.params.id).then(result => res.json(result))
  );

  app.post('/income-types', (req, res) =>
    db.incomeType
      .create({
        name: req.body.name,
        note: req.body.note || ''
      })
      .then(result => res.json(result))
  );

  app.put('/income-types/:id', (req, res) =>
    db.incomeType
      .update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(result => res.json(result))
  );

  app.delete('/income-types/:id', (req, res) =>
    db.incomeType
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => res.json(result))
  );
};

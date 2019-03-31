export default (app, db) => {
  app.get('/members', (req, res) =>
    db.member.findAll().then(result => res.json(result))
  );

  app.get('/members/:id', (req, res) =>
    db.member.findByPk(req.params.id).then(result => res.json(result))
  );

  app.get('/members/:id/incomes', (req, res) =>
    db.member
      .findById(req.params.id, {
        include: [
          {
            model: db.income,
            as: 'incomes'
          }
        ]
      })
      .then(result => res.json(result))
  );

  app.post('/members', (req, res) =>
    db.member
      .create({
        name: req.body.name,
        cpf: req.body.cpf
      })
      .then(result => res.json(result))
  );

  app.put('/members/:id', (req, res) =>
    db.member
      .update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(result => res.json(result))
  );

  app.delete('/members/:id', (req, res) =>
    db.member
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => res.json(result))
  );
};

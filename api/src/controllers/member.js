export default (app, db) => {
  app.get('/members', (req, res) =>
    db.member.findAll().then(result => res.json(result))
  );

  app.get('/member/:id', (req, res) =>
    db.member.findByPk(req.params.id).then(result => res.json(result))
  );

  app.post('/member', (req, res) =>
    db.member
      .create({
        name: req.body.name,
        cpf: req.body.cpf
      })
      .then(result => res.json(result))
  );

  app.put('/member/:id', (req, res) =>
    db.member
      .update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(result => res.json(result))
  );

  app.delete('/member/:id', (req, res) =>
    db.member
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => res.json(result))
  );
};

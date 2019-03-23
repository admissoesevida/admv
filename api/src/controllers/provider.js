export default (app, db) => {
    app.get("/providers", (req, res) =>
      db.provider.findAll().then(result => res.json(result))
    );
  
    app.get("/provider/:id", (req, res) =>
      db.provider.findByPk(req.params.id).then(result => res.json(result)) //findById is deprecated
    );
  
    app.post("/provider", (req, res) => {
        db.provider
        .create({
          name: req.body.name,
          cpf_cnpj: req.body.cpf_cnpj,
          email: req.body.email,
          phone: req.body.phone
        })
        .then(result => res.json(result))
    });
  
    app.put("/provider/:id", (req, res) =>
      db.provider
        .update(
          req.body,
          {
            where: {
              id: req.params.id
            }
          }
        )
        .then(result => res.json(result))
    );
  
    app.delete("/provider/:id", (req, res) =>
      db.provider
        .destroy({
          where: {
            id: req.params.id
          }
        })
        .then(result => res.json(result))
    );
  };
  
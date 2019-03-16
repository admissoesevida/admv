export default (app, db) => {
    app.get("/providers", (req, res) =>
      db.provider.findAll().then(result => res.json(result))
    );
  
    app.get("/provider/:id", (req, res) =>
      db.provider.findById(req.params.id).then(result => res.json(result))
    );
  
    app.post("/provider", (req, res) => {
        console.log(req.body)
        db.provider
        .create({
          name: req.body.name,
          cpf_cnpj: req.body.cpf_cnpj,
          email: req.body.email,
          telephony: req.body.telephony
        })
        .then(result => res.json(result))
    });
  
    app.put("/provider/:id", (req, res) =>
      db.provider
        .update(
          {
            name: req.body.name,
            cpf_cnpj: req.body.cpf_cnpj,
            email: req.body.email,
            telephony: req.body.telephony
          },
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
  
import db from '../models';
import express from 'express';

const model = db.provider;
const router = express.Router();

router.get('/', (req, res) => model.findAll().then(result => res.json(result)));

router.get('/:id', (req, res) =>
  model.findByPk(req.params.id).then(result => res.json(result))
);

router.get('/:id/expenses', (req, res) =>
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

router.post('/', (req, res) =>
  model
    .create({
      name: req.body.name,
      cpf_cnpj: req.body.cpf_cnpj,
      email: req.body.email,
      phone: req.body.phone
    })
    .then(result => res.json(result))
);

router.put('/:id', (req, res) =>
  model
    .update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(result => res.json(result))
);

router.delete('/:id', (req, res) =>
  model
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then(result => res.json(result))
);

export default router;

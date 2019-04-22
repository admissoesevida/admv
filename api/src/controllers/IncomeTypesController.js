import db from '../models';
import express from 'express';

const model = db.incomeType;
const router = express.Router();

router.get('/', (req, res) =>
  model
    .findAll()
    .then(result => res.json(result))
    .catch(error => res.status(500).json({ error: error.stack || error }))
);

router.get('/:id', (req, res) =>
  model
    .findByPk(req.params.id)
    .then(result => res.json(result))
    .catch(error => res.status(500).json({ error: error.stack || error }))
);

router.get('/:id/incomes', (req, res) =>
  model
    .findByPk(req.params.id, {
      include: [
        {
          model: db.income,
          as: 'incomes'
        }
      ]
    })
    .then(result => res.json(result))
    .catch(error => res.status(500).json({ error: error.stack || error }))
);

router.post('/', (req, res) =>
  model
    .create({
      name: req.body.name,
      note: req.body.note || ''
    })
    .then(result => res.json(result))
    .catch(error => res.status(500).json({ error: error.stack || error }))
);

router.put('/:id', (req, res) =>
  model
    .update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(result => res.json(result))
    .catch(error => res.status(500).json({ error: error.stack || error }))
);

router.delete('/:id', (req, res) =>
  model
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then(result => res.json(result))
    .catch(error => res.status(500).json({ error: error.stack || error }))
);

export default router;

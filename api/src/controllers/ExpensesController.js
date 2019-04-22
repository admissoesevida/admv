import db from '../models';
import express from 'express';

const model = db.expense;
const router = express.Router();

router.get('/', (req, res) =>
  model
    .findAll({
      include: [
        {
          model: db.expenseType,
          required: false
        },
        {
          model: db.provider,
          required: false
        }
      ]
    })
    .then(result => res.json(result))
    .catch(error => res.status(500).json({ error: error.stack || error }))
);

router.get('/:id', (req, res) =>
  model
    .findByPk(req.params.id, {
      include: [
        {
          model: db.expenseType,
          required: false
        },
        {
          model: db.provider,
          required: false
        }
      ]
    })
    .then(result => res.json(result))
    .catch(error => res.status(500).json({ error: error.stack || error }))
);

router.post('/', (req, res) =>
  model
    .create({
      date: req.body.date,
      value: req.body.value,
      providerId: req.body.providerId,
      expenseTypeId: req.body.expenseTypeId,
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

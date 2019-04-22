import db from '../models';
import express from 'express';

const model = db.income;
const router = express.Router();

router.get('/', (req, res) =>
  model
    .findAll({
      include: [
        {
          model: db.incomeType,
          required: false
        },
        {
          model: db.member,
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
          model: db.incomeType,
          required: false
        },
        {
          model: db.member,
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
      memberId: req.body.memberId,
      incomeTypeId: req.body.incomeTypeId,
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

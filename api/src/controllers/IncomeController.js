import db from '../models';
import express from 'express';

const model = db.income;
const router = express.Router();

router.get('/', (req, res) => model.findAll().then(result => res.json(result)));

router.get('/:id', (req, res) =>
  model.findByPk(req.params.id).then(result => res.json(result))
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
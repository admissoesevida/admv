// Chai docs - https://www.chaijs.com/api/bdd/

import { after, describe, it } from 'mocha';
import { expect } from 'chai';
import DatabaseHelper from './helpers/database-helper';
import IncomeUtilsHelper from './helpers/income-utils-helper';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const incomeHelper = new DatabaseHelper('incomes');
const incomeTypeHelper = new DatabaseHelper('income-types');
const memberHelper = new DatabaseHelper('members');

const { createIncomeItem } = new IncomeUtilsHelper(
  incomeHelper,
  memberHelper,
  incomeTypeHelper
);

describe('controllers/incomes', () => {
  describe('POST /incomes', async () => {
    it('Deve retornar o novo item registrado', async () => {
      const expected = {
        date: '2019-03-10T19:52:01.000Z',
        value: 20
      };
      const res = await createIncomeItem(expected);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('date', expected.date);
      expect(res.body).to.have.property('value', expected.value);
    });

    after(async () => {
      await incomeHelper.maybeDeleteAll();
      await incomeTypeHelper.maybeDeleteAll();
      await memberHelper.maybeDeleteAll();
    });
  });

  describe('PUT /incomes/:id', async () => {
    it('Deve retornar o item atualizado', async () => {
      const { body: newIncome } = await createIncomeItem({});

      expect(newIncome).to.have.property('value', 20);

      await incomeHelper.maybeUpdate({
        value: 30
      });

      const res = await incomeHelper.maybeGetItem();

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('value', '30.00');
    });

    after(async () => {
      await incomeHelper.maybeDeleteAll();
      await incomeTypeHelper.maybeDeleteAll();
      await memberHelper.maybeDeleteAll();
    });
  });

  describe('GET /incomes', async () => {
    it('Deve retornar vários itens', async () => {
      const res = await incomeHelper.maybeGetAll();

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.have.property('member');
      expect(res.body[0]).to.have.property('incomeType');
      expect(res.body[0].member).to.be.an('object');
      expect(res.body[0].incomeType).to.be.an('object');
    });
  });

  describe('GET /incomes/:id', async () => {
    it('Deve retornar um item específico', async () => {
      const { body: newIncome } = await createIncomeItem({});

      const res = await incomeHelper.maybeGetItem(newIncome.id);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('date', newIncome.date);
      expect(res.body).to.have.property('value', newIncome.value.toFixed(2));
      expect(res.body).to.have.property('member');
      expect(res.body).to.have.property('incomeType');
      expect(res.body.member).to.be.an('object');
      expect(res.body.incomeType).to.be.an('object');
    });

    after(async () => {
      await incomeHelper.maybeDeleteAll();
      await incomeTypeHelper.maybeDeleteAll();
      await memberHelper.maybeDeleteAll();
    });
  });

  describe('DELETE /incomes/:id', () => {
    it('Deve deletar um item específico', async () => {
      const { body: newIncome } = await createIncomeItem({});

      await incomeHelper.maybeDeleteItem(newIncome.id);

      const res = await incomeHelper.maybeGetItem(newIncome.id);

      expect(res).to.have.status(200);
      expect(res.body).to.be.null;
    });

    after(async () => {
      await incomeHelper.maybeDeleteAll();
      await incomeTypeHelper.maybeDeleteAll();
      await memberHelper.maybeDeleteAll();
    });
  });
});

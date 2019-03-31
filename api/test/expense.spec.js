// Chai docs - https://www.chaijs.com/api/bdd/

import { after, describe, it } from 'mocha';
import { expect } from 'chai';
import DatabaseHelper from './helpers/database-helper';
import ExpenseUtilsHelper from './helpers/expense-utils-helper';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const expenseHelper = new DatabaseHelper('expenses');
const expenseTypeHelper = new DatabaseHelper('expense-types');
const providerHelper = new DatabaseHelper('providers');

const { createExpenseItem } = new ExpenseUtilsHelper(
  expenseHelper,
  providerHelper,
  expenseTypeHelper
);

describe('controllers/expenses', () => {
  describe('POST /expenses', async () => {
    it('Deve retornar o novo item registrado', async () => {
      const expected = {
        date: '2019-03-10T19:52:01.000Z',
        value: 20
      };
      const res = await createExpenseItem(expected);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('date', expected.date);
      expect(res.body).to.have.property('value', expected.value);
    });

    after(async () => {
      await expenseHelper.maybeDeleteAll();
      await expenseTypeHelper.maybeDeleteAll();
      await providerHelper.maybeDeleteAll();
    });
  });

  describe('PUT /expenses/:id', async () => {
    it('Deve retornar o item atualizado', async () => {
      const { body: newExpense } = await createExpenseItem({});

      expect(newExpense).to.have.property('value', 20);

      await expenseHelper.maybeUpdate({
        value: 30
      });

      const res = await expenseHelper.maybeGetItem();

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('value', '30.00');
    });

    after(async () => {
      await expenseHelper.maybeDeleteAll();
      await expenseTypeHelper.maybeDeleteAll();
      await providerHelper.maybeDeleteAll();
    });
  });

  describe('GET /expenses', async () => {
    it('Deve retornar vários itens', async () => {
      const res = await expenseHelper.maybeGetAll();

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('GET /expenses/:id', async () => {
    it('Deve retornar um item específico', async () => {
      const { body: newExpense } = await createExpenseItem({});

      const res = await expenseHelper.maybeGetItem(newExpense.id);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('date', newExpense.date);
      expect(res.body).to.have.property('value', newExpense.value.toFixed(2));
    });

    after(async () => {
      await expenseHelper.maybeDeleteAll();
      await expenseTypeHelper.maybeDeleteAll();
      await providerHelper.maybeDeleteAll();
    });
  });

  describe('GET /expenses/:id', async () => {
    it('Deve retornar um item específico', async () => {
      const { body: newExpense } = await createExpenseItem({});

      const res = await expenseHelper.maybeGetItem(newExpense.id);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('date', newExpense.date);
      expect(res.body).to.have.property('value', newExpense.value.toFixed(2));
    });

    after(async () => {
      await expenseHelper.maybeDeleteAll();
      await expenseTypeHelper.maybeDeleteAll();
      await providerHelper.maybeDeleteAll();
    });
  });

  describe('DELETE /expenses/:id', () => {
    it('Deve deletar um item específico', async () => {
      const { body: newExpense } = await createExpenseItem({});

      await expenseHelper.maybeDeleteItem(newExpense.id);

      const res = await expenseHelper.maybeGetItem(newExpense.id);

      expect(res).to.have.status(200);
      expect(res.body).to.be.null;
    });

    after(async () => {
      await expenseHelper.maybeDeleteAll();
      await expenseTypeHelper.maybeDeleteAll();
      await providerHelper.maybeDeleteAll();
    });
  });
});

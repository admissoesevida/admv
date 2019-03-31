// Chai docs - https://www.chaijs.com/api/bdd/

import { after, before, describe, it } from 'mocha';
import { expect } from 'chai';
import DatabaseHelper from './helpers/database-helper';
import ExpenseUtilsHelper from './helpers/expense-utils-helper';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const expenseTypeHelper = new DatabaseHelper('expense-types');
const expenseHelper = new DatabaseHelper('expenses');
const providerHelper = new DatabaseHelper('providers');

const { createExpenseItem } = new ExpenseUtilsHelper(
  expenseHelper,
  providerHelper,
  expenseTypeHelper
);

describe('controllers/expense-types', () => {
  describe('POST /expense-types', async () => {
    it('Deve retornar o novo item registrado', async () => {
      const newItem = {
        name: 'Item Test'
      };
      const res = await expenseTypeHelper.maybeCreate(newItem);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.name).to.be.an('string');
      expect(res.body.name).to.equal(newItem.name);
    });

    after(async () => {
      await expenseTypeHelper.maybeDeleteAll();
    });
  });

  describe('PUT /expense-types/:id', async () => {
    before(async () => {
      await expenseTypeHelper.maybeCreate({
        name: 'Novo Item'
      });
    });
    it('Deve retornar o nome do item atualizado', async () => {
      const updateItem = {
        name: 'Novo nome'
      };
      await expenseTypeHelper.maybeUpdate(updateItem);

      const res = await expenseTypeHelper.maybeGetItem();

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.name).to.be.an('string');
      expect(res.body.name).to.equal(updateItem.name);
    });

    after(async () => {
      await expenseTypeHelper.maybeDeleteAll();
    });
  });

  describe('GET /expense-types', async () => {
    before(async () => {
      await expenseTypeHelper.maybeCreate({
        name: 'Novo Item 1'
      });
      await expenseTypeHelper.maybeCreate({
        name: 'Novo Item 2'
      });
      await expenseTypeHelper.maybeCreate({
        name: 'Novo Item 3'
      });
    });
    it('Deve retornar vários itens', async () => {
      const res = await expenseTypeHelper.maybeGetAll();

      expect(res).to.have.status(200);
      expect(res.body)
        .to.be.an('array')
        .that.has.length.greaterThan(2);
    });

    after(async () => {
      await expenseTypeHelper.maybeDeleteAll();
    });
  });

  describe('GET /expense-types/:id', async () => {
    it('Deve retornar um item específico', async () => {
      const { body: newItem } = await expenseTypeHelper.maybeCreate({
        name: 'Novo Item'
      });

      const res = await expenseTypeHelper.maybeGetItem(newItem.id);

      expect(res).to.have.status(200);
      expect(res.body)
        .to.be.an('object')
        .that.have.property('name', newItem.name);
    });

    after(async () => {
      await expenseTypeHelper.maybeDeleteAll();
    });
  });

  describe('GET /expense-types/:id/expenses', async () => {
    it('Deve retornar as expenses relacionadas ao tipo', async () => {
      const newType = {
        name: 'Test Type'
      };
      const { body: type } = await expenseTypeHelper.maybeCreate(newType);

      const { body: newExpense } = await createExpenseItem({ typeId: type.id });

      const res = await expenseTypeHelper.maybeGet('expenses');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('name', newType.name);
      expect(res.body)
        .to.have.property('expenses')
        .that.is.an('array');

      expect(res.body.expenses[0]).to.have.deep.include({
        id: newExpense.id,
        expenseTypeId: type.id
      });
    });

    after(async () => {
      await expenseHelper.maybeDeleteAll();
      await expenseTypeHelper.maybeDeleteAll();
      await providerHelper.maybeDeleteAll();
    });
  });

  describe('DELETE /expense-types/:id', () => {
    it('Deve deletar um item específico', async () => {
      const { body: newItem } = await expenseTypeHelper.maybeCreate({
        name: 'Novo Item'
      });

      await expenseTypeHelper.maybeDeleteItem(newItem.id);

      const res = await expenseTypeHelper.maybeGetItem(newItem.id);

      expect(res).to.have.status(200);
      expect(res.body).to.be.null;
    });
  });
});

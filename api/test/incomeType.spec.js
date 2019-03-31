// Chai docs - https://www.chaijs.com/api/bdd/

import { after, before, describe, it } from 'mocha';
import { expect } from 'chai';
import DatabaseHelper from './helpers/database-helper';
import IncomeUtilsHelper from './helpers/income-utils-helper';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const incomeTypeHelper = new DatabaseHelper('income-types');
const incomeHelper = new DatabaseHelper('incomes');
const memberHelper = new DatabaseHelper('members');

const { createIncomeItem } = new IncomeUtilsHelper(
  incomeHelper,
  memberHelper,
  incomeTypeHelper
);

describe('controllers/income-types', () => {
  describe('POST /income-types', async () => {
    it('Deve retornar o novo item registrado', async () => {
      const newItem = {
        name: 'Income Test'
      };
      const res = await incomeTypeHelper.maybeCreate(newItem);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.name).to.be.an('string');
      expect(res.body.name).to.equal(newItem.name);
    });

    after(async () => {
      await incomeTypeHelper.maybeDeleteAll();
    });
  });

  describe('PUT /income-types/:id', async () => {
    before(async () => {
      await incomeTypeHelper.maybeCreate({
        name: 'Novo Item'
      });
    });
    it('Deve retornar o nome do item atualizado', async () => {
      const updateItem = {
        name: 'Novo nome'
      };
      await incomeTypeHelper.maybeUpdate(updateItem);

      const res = await incomeTypeHelper.maybeGetItem();

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.name).to.be.an('string');
      expect(res.body.name).to.equal(updateItem.name);
    });

    after(async () => {
      await incomeTypeHelper.maybeDeleteAll();
    });
  });

  describe('GET /income-types', async () => {
    before(async () => {
      await incomeTypeHelper.maybeCreate({
        name: 'Novo Item 1'
      });
      await incomeTypeHelper.maybeCreate({
        name: 'Novo Item 2'
      });
      await incomeTypeHelper.maybeCreate({
        name: 'Novo Item 3'
      });
    });
    it('Deve retornar vários itens', async () => {
      const res = await incomeTypeHelper.maybeGetAll();

      expect(res).to.have.status(200);
      expect(res.body)
        .to.be.an('array')
        .that.has.length.greaterThan(2);
    });

    after(async () => {
      await incomeTypeHelper.maybeDeleteAll();
    });
  });

  describe('GET /income-types/:id', async () => {
    it('Deve retornar um item específico', async () => {
      const { body: newItem } = await incomeTypeHelper.maybeCreate({
        name: 'Novo Item'
      });

      const res = await incomeTypeHelper.maybeGetItem(newItem.id);

      expect(res).to.have.status(200);
      expect(res.body)
        .to.be.an('object')
        .that.have.property('name', newItem.name);
    });

    after(async () => {
      await incomeTypeHelper.maybeDeleteAll();
    });
  });

  describe('GET /income-types/:id/incomes', async () => {
    it('Deve retornar as incomes relacionadas ao tipo', async () => {
      const newType = {
        name: 'Test Type'
      };
      const { body: type } = await incomeTypeHelper.maybeCreate(newType);

      const { body: newIncome } = await createIncomeItem({ typeId: type.id });

      const res = await incomeTypeHelper.maybeGet('incomes');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('name', newType.name);
      expect(res.body)
        .to.have.property('incomes')
        .that.is.an('array');

      expect(res.body.incomes[0]).to.have.deep.include({
        id: newIncome.id,
        incomeTypeId: type.id
      });
    });

    after(async () => {
      await incomeHelper.maybeDeleteAll();
      await incomeTypeHelper.maybeDeleteAll();
      await memberHelper.maybeDeleteAll();
    });
  });

  describe('DELETE /income-types/:id', () => {
    it('Deve deletar um item específico', async () => {
      const { body: newItem } = await incomeTypeHelper.maybeCreate({
        name: 'Novo Item'
      });

      await incomeTypeHelper.maybeDeleteItem(newItem.id);

      const res = await incomeTypeHelper.maybeGetItem(newItem.id);

      expect(res).to.have.status(200);
      expect(res.body).to.be.null;
    });
  });
});

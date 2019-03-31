// Chai docs - https://www.chaijs.com/api/bdd/

import { after, before, describe, it } from 'mocha';
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

describe('controllers/members', () => {
  describe('POST /members', async () => {
    it('Deve retornar o novo item registrado', async () => {
      const newItem = {
        name: 'Item Test'
      };
      const res = await memberHelper.maybeCreate(newItem);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.name).to.be.an('string');
      expect(res.body.name).to.equal(newItem.name);
    });

    after(async () => {
      await memberHelper.maybeDeleteAll();
    });
  });

  describe('PUT /members/:id', async () => {
    before(async () => {
      await memberHelper.maybeCreate({
        name: 'Novo Item'
      });
    });
    it('Deve retornar o nome do item atualizado', async () => {
      const updateItem = {
        name: 'Novo nome'
      };
      await memberHelper.maybeUpdate(updateItem);

      const res = await memberHelper.maybeGetItem();

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.name).to.be.an('string');
      expect(res.body.name).to.equal(updateItem.name);
    });

    after(async () => {
      await memberHelper.maybeDeleteAll();
    });
  });

  describe('GET /members', async () => {
    before(async () => {
      await memberHelper.maybeCreate({
        name: 'Novo Item 1'
      });
      await memberHelper.maybeCreate({
        name: 'Novo Item 2'
      });
      await memberHelper.maybeCreate({
        name: 'Novo Item 3'
      });
    });
    it('Deve retornar vários itens', async () => {
      const res = await memberHelper.maybeGetAll();

      expect(res).to.have.status(200);
      expect(res.body)
        .to.be.an('array')
        .that.has.length.greaterThan(2);
    });

    after(async () => {
      await memberHelper.maybeDeleteAll();
    });
  });

  describe('GET /members/:id/incomes', async () => {
    it('Deve retornar as incomes relacionadas ao member', async () => {
      const newMember = {
        name: 'Test Member'
      };
      const { body: member } = await memberHelper.maybeCreate(newMember);

      const { body: newIncome } = await createIncomeItem({ id: member.id });

      const res = await memberHelper.maybeGet('incomes');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('name', newMember.name);
      expect(res.body)
        .to.have.property('incomes')
        .that.is.an('array');

      expect(res.body.incomes[0]).to.have.deep.include({
        id: newIncome.id,
        memberId: member.id
      });
    });

    after(async () => {
      await incomeHelper.maybeDeleteAll();
      await incomeTypeHelper.maybeDeleteAll();
      await memberHelper.maybeDeleteAll();
    });
  });

  describe('GET /members/:id', async () => {
    it('Deve retornar um item específico', async () => {
      const { body: newItem } = await memberHelper.maybeCreate({
        name: 'Novo Item'
      });

      const res = await memberHelper.maybeGetItem(newItem.id);

      expect(res).to.have.status(200);
      expect(res.body)
        .to.be.an('object')
        .that.have.property('name', newItem.name);
    });

    after(async () => {
      await memberHelper.maybeDeleteAll();
    });
  });

  describe('DELETE /members/:id', () => {
    it('Deve deletar um item específico', async () => {
      const { body: newItem } = await memberHelper.maybeCreate({
        name: 'Novo Item'
      });

      await memberHelper.maybeDeleteItem(newItem.id);

      const res = await memberHelper.maybeGetItem(newItem.id);

      expect(res).to.have.status(200);
      expect(res.body).to.be.null;
    });
  });
});

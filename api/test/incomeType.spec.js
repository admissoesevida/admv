// Chai docs - https://www.chaijs.com/api/bdd/

import { after, before, describe, it } from 'mocha';
import { expect } from 'chai';
import IncomeTypeHelper from './helpers/income-type-helper';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const helper = new IncomeTypeHelper();

describe('controllers/income-types', () => {
  describe('POST /income-types', async () => {
    it('Deve retornar o novo item registrado', async () => {
      const newItem = {
        name: 'Income Test'
      };
      const res = await helper.maybeCreate(newItem);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.name).to.be.an('string');
      expect(res.body.name).to.equal(newItem.name);
    });

    after(async () => {
      await helper.maybeDeleteAll();
    });
  });

  describe('PUT /income-types/:id', async () => {
    before(async () => {
      await helper.maybeCreate({
        name: 'Novo Item'
      });
    });
    it('Deve retornar o nome do item atualizado', async () => {
      const updateItem = {
        name: 'Novo nome'
      };
      await helper.maybeUpdate(updateItem);

      const res = await helper.maybeGetItem();

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.name).to.be.an('string');
      expect(res.body.name).to.equal(updateItem.name);
    });

    after(async () => {
      await helper.maybeDeleteAll();
    });
  });

  describe('GET /income-types', async () => {
    before(async () => {
      await helper.maybeCreate({
        name: 'Novo Item 1'
      });
      await helper.maybeCreate({
        name: 'Novo Item 2'
      });
      await helper.maybeCreate({
        name: 'Novo Item 3'
      });
    });
    it('Deve retornar vários itens', async () => {
      const res = await helper.maybeGetAll();

      expect(res).to.have.status(200);
      expect(res.body)
        .to.be.an('array')
        .that.has.length.greaterThan(2);
    });

    after(async () => {
      await helper.maybeDeleteAll();
    });
  });

  describe('GET /income-types/:id', async () => {
    it('Deve retornar um item específico', async () => {
      const { body: newItem } = await helper.maybeCreate({
        name: 'Novo Item'
      });

      const res = await helper.maybeGetItem(newItem.id);

      expect(res).to.have.status(200);
      expect(res.body)
        .to.be.an('object')
        .that.have.property('name', newItem.name);
    });

    after(async () => {
      await helper.maybeDeleteAll();
    });
  });

  describe('DELETE /income-types/:id', () => {
    it('Deve deletar um item específico', async () => {
      const { body: newItem } = await helper.maybeCreate({
        name: 'Novo Item'
      });

      await helper.maybeDeleteItem(newItem.id);

      const res = await helper.maybeGetItem(newItem.id);

      expect(res).to.have.status(200);
      expect(res.body).to.be.null;
    });
  });
});

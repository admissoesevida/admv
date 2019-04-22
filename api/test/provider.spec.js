// Chai docs - https://www.chaijs.com/api/bdd/

import { after, before, describe, it } from 'mocha';
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

const ProviderTest = {
  name: 'Caso de teste',
  cpf_cnpj: '46542212723',
  email: 'teste@teste.com',
  phone: '+5514999999999'
};

const alterProvider = {
  name: 'Teste de update'
};

describe('controllers/Providers', () => {
  describe('POST /providers', () => {
    it('Deve retornar o fornecedor registrado', async () => {
      const res = await providerHelper.maybeCreate(ProviderTest);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('name', ProviderTest.name);
      expect(res.body).to.have.property('cpf_cnpj', ProviderTest.cpf_cnpj);
      expect(res.body).to.have.property('email', ProviderTest.email);
      expect(res.body).to.have.property('phone', ProviderTest.phone);
    });

    after(async () => {
      await providerHelper.maybeDeleteAll();
    });
  });

  describe('PUT /providers/:id', async () => {
    before(async () => {
      await providerHelper.maybeCreate(ProviderTest);
    });
    it('Deve retornar o item atualizado', async () => {
      await providerHelper.maybeUpdate(alterProvider);

      const res = await providerHelper.maybeGetItem();

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('name', alterProvider.name);
      expect(res.body).to.have.property('cpf_cnpj', ProviderTest.cpf_cnpj);
      expect(res.body).to.have.property('email', ProviderTest.email);
      expect(res.body).to.have.property('phone', ProviderTest.phone);
    });

    after(async () => {
      await providerHelper.maybeDeleteAll();
    });
  });

  describe('GET /providers/:id/expenses', async () => {
    it('Deve retornar as expenses relacionadas ao fornecedor', async () => {
      const newProvider = {
        cpf_cnpj: '123.456.789-0',
        name: 'Test Provider'
      };
      const { body: provider } = await providerHelper.maybeCreate(newProvider);

      const { body: newExpense } = await createExpenseItem({ id: provider.id });

      const res = await providerHelper.maybeGet('expenses');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('cpf_cnpj', newProvider.cpf_cnpj);
      expect(res.body).to.have.property('name', newProvider.name);
      expect(res.body)
        .to.have.property('expenses')
        .that.is.an('array');

      expect(res.body.expenses[0]).to.have.deep.include({
        id: newExpense.id,
        providerId: provider.id
      });
    });

    after(async () => {
      await expenseHelper.maybeDeleteAll();
      await expenseTypeHelper.maybeDeleteAll();
      await providerHelper.maybeDeleteAll();
    });
  });

  describe('GET /providers', () => {
    before(async () => {
      await providerHelper.maybeCreate(ProviderTest);
      await providerHelper.maybeCreate(ProviderTest);
      await providerHelper.maybeCreate(ProviderTest);
    });
    it('Deve retornar os fornecedores registrados', async () => {
      const res = await providerHelper.maybeGetAll();

      expect(res).to.have.status(200);
      expect(res.body)
        .to.be.an('array')
        .that.has.length.greaterThan(2);
    });

    after(async () => {
      await providerHelper.maybeDeleteAll();
    });
  });

  describe('GET /providers/:id', () => {
    it('Deve retornar um item específico', async () => {
      await providerHelper.maybeCreate(ProviderTest);
      await providerHelper.maybeCreate(ProviderTest);
      const { body: newItem } = await providerHelper.maybeCreate(ProviderTest);

      const res = await providerHelper.maybeGetItem(newItem.id);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('name', ProviderTest.name);
      expect(res.body).to.have.property('cpf_cnpj', ProviderTest.cpf_cnpj);
      expect(res.body).to.have.property('email', ProviderTest.email);
      expect(res.body).to.have.property('phone', ProviderTest.phone);
    });

    after(async () => {
      await providerHelper.maybeDeleteAll();
    });
  });

  describe('DELETE /providers/:id', () => {
    it('Deve deletar um item específico', async () => {
      const { body: newItem } = await providerHelper.maybeCreate(ProviderTest);

      await providerHelper.maybeDeleteItem(newItem.id);

      const res = await providerHelper.maybeGetItem(newItem.id);

      expect(res).to.have.status(200);
      expect(res.body).to.be.null;
    });
  });
});

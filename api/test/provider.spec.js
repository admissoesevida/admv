// Chai docs - https://www.chaijs.com/api/bdd/

import { describe, it } from 'mocha';
import { expect } from 'chai';
import api from '../src/server';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const { request } = chai;

const ProviderTest = {
  name: 'Caso de teste',
  cpf_cnpj: '46542212723',
  email: 'teste@teste.com',
  phone: '14992345621'
};

let newProvider = {};

const alterProvider = {
  name: 'Teste de update'
};

describe('controllers/Provider', () => {
  describe('POST /provider', () => {
    it('Deve retornar o fornecedor registrado', done => {
      request(api)
        .post(`/provider`)
        .send(ProviderTest)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');

          newProvider = {
            ...res.body,
            ...ProviderTest
          };

          expect(res.body).to.eql(newProvider);
          done();
        });
    });
  });

  describe('PUT /provider/:id', () => {
    it('Deve retornar 1 para o update realizado', done => {
      request(api)
        .put(`/provider/${newProvider.id}`)
        .send(alterProvider)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.eql([1]);
          done();
        });
    });
  });

  describe('GET /providers', () => {
    it('Deve retornar os fornecedores registrados', done => {
      request(api)
        .get(`/providers`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /provider/:id', () => {
    it('Deve retornar apenas o fornecedor do id que foi criado', done => {
      request(api)
        .get(`/provider/${newProvider.id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');

          const newBody = res.body;
          delete newBody.createdAt;
          delete newBody.updatedAt;

          const equalProvider = newProvider;
          delete equalProvider.createdAt;
          delete equalProvider.updatedAt;
          expect(newBody).to.eql({
            ...equalProvider,
            ...alterProvider
          });
          done();
        });
    });
  });

  describe('DELETE /provider/:id', () => {
    it('Deve retornar 1 para quando o registro é deletado', done => {
      request(api)
        .delete(`/provider/${newProvider.id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.equal(1);
          done();
        });
    });
  });
});

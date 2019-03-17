// Chai docs - https://www.chaijs.com/api/bdd/

import chai from "chai";
import chaiHttp from "chai-http";
import { expect } from "chai";
import api from "../src/server";

chai.use(chaiHttp);

const { request } = chai;

const ProviderTest = {
	name: "Caso de teste",
    cpf_cnpj: "46542212723",
    email: "teste@teste.com",
    telephony: "14992345621"
};

let newProvider = {};

const alterProvider = {
    name: "Teste de update"
};

describe("controllers/Provider", () => {
  it("POST /provider - Deve retornar o fornecedor registrado", done => {
    request(api)
        .post(`/provider`)
        .send(ProviderTest)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");

            newProvider = {
                ...res.body,
                ...ProviderTest
            }

            expect(res.body).to.eql(newProvider);
            done();
        });
  });

  it("PUT /provider/:id - Deve retornar 1 para o update realizado", done => {
    request(api)
        .put(`/provider/${newProvider.id}`)
        .send(alterProvider)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array");
            expect(res.body).to.eql([1]);
            done();
        });
  });

  it("GET /providers - Deve retornar os fornecedores registrados", done => {
    request(api)
      .get(`/providers`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("GET /provider/:id - Deve retornar apenas o fornecedor do id que foi criado", done => {
    request(api)
        .get(`/provider/${newProvider.id}`)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");

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

  it("DELETE /provider/:id - Deve retornar 1 para quando o registro é deletado", done => {
    request(api)
        .delete(`/provider/${newProvider.id}`)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.equal(1);
            done();
        });
  });
});

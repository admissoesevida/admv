// Chai docs - https://www.chaijs.com/api/bdd/

import { describe, it } from 'mocha';
import { expect } from 'chai';
import api from '../src/server';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const { request } = chai;

describe('controllers/Member', () => {
  describe('GET /members', () => {
    it('Deve retornar os membros registrados', done => {
      request(api)
        .get(`/members`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
});

// Chai docs - https://www.chaijs.com/api/bdd/

import chai from "chai";
import chaiHttp from "chai-http";
import { expect } from "chai";
import api from "../src/server";

chai.use(chaiHttp);

const { request } = chai;

describe("controllers/Member", () => {
  it("GET /members - Deve retornar os membros registrados", done => {
    request(api)
      .get(`/members`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});

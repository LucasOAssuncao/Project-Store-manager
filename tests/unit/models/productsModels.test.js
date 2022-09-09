const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const productModel = require("../../../src/models/products.model");

describe("Testes de unidade do model de products", function () {
  
  it("Checa o tipo do retorno", async function () {
    const list = await productModel.getProducts();
    expect(list).to.be.an('array');
  });

  describe("teste com product Id", function () { 
    before(async function () {
      const execute = [
        {
          id: 1,
          name: "Martelo de Thor",
        },
      ];

      sinon.stub(connection, "execute").resolves([execute]);
    });

    const expected = {
      id: 1,
      name: "Martelo de Thor",
    };

    const payload = 1;

    after(async function () {
      connection.execute.restore();
    });
    it("Com sucesso", async function () {
      const res = await productModel.getProductById(payload);

      expect(res[0]).to.deep.equal(expected)
    })
  });
});
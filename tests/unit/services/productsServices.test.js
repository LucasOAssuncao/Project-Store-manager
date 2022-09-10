const { expect } = require("chai");
const sinon = require("sinon");

const productModel = require("../../../src/models/products.model");
const productService = require("../../../src/services/products.service");

const { allProductsResponse } = require("./mocks/products.model.mock");

describe("Testes de unidade do service de products", function () {
  describe("teste com todos produtos", function () {
    before(async function () {
      sinon.stub(productModel, "getProducts").resolves([allProductsResponse]);
    });
    after(async function () {
      sinon.restore();
    });
    it("Checa o tipo do retorno", async function () {
      const list = await productService.getProducts();
      expect(list).to.be.an("array");
    });
   });

  describe("teste com product Id", function () {
    before(async function () {
      sinon.stub(productModel, "getProductById").resolves([{
        id: 1,
        name: "Martelo de Thor",
      }]);
    });

    const expected = {
      id: 1,
      name: "Martelo de Thor",
    };

    afterEach(async function () {
      sinon.restore();
    });
    it("Com sucesso", async function () {
      const res = await productService.getProductById(1);

      expect(res[0]).to.deep.equal(expected);
    });
  });
});

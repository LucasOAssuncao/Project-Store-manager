const { expect } = require("chai");
const sinon = require("sinon");
const { calledWith } = sinon.assert

const productController = require("../../../src/controllers/products.controller");
const productService = require("../../../src/services/products.service");

describe("Testes de unidade do controller de products", function () {
  afterEach(sinon.restore);
  it("Checa a func getproducts", async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();

    sinon.stub(productService, "getProducts").resolves([
      {
        id: 1,
        name: "Martelo de Thor",
      },
      {
        id: 2,
        name: "Traje de encolhimento",
      },
      {
        id: 3,
        name: "Escudo do Capitão América",
      },
    ]);
    await productController.getProducts(req, res);

    expect(res.status.calledWith(200)).to.be.true
  });

  describe("teste com product Id", function () {
    const expected = [{
      id: 1,
      name: "Martelo de Thor",
    }];

    const fail = { message: "Product not found" };

    after(async function () {
      sinon.restore();
    });
    it("Com sucesso", async function () {
      const req = {};
      const res = {};

      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(productService, 'getProductById').resolves(expected);

      await productController.getProductById(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(expected[0])).to.be.true;
    });

    it("Com falha", async function () {
      const req = {};
      const res = {};

      req.params = { id: 99999 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(productService, "getProductById").resolves(fail);

      await productController.getProductById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith(fail)).to.be.true;
    });
  });
});

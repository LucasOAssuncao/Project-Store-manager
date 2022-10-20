const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;

const salesController = require("../../../src/controllers/sales.controller");
const salesService = require("../../../src/services/sales.service");

const {
  saleCreateResponse,
  validBodyRequest,
  salesList,
  saleById,
} = require("./mocks/sales.model.mock");

describe("testando o controller de Sales", function () {
  describe("Cadastrando uma nova venda", function () {
    afterEach(function () {
      sinon.restore();
    });

    it("com sucesso", async function () {
      sinon
        .stub(salesService, "doSale")
        .resolves( saleCreateResponse );

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.doSale(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      // expect(res.json.calledWith(saleCreateResponse)).to.be.true;
    });

    // it("testando a resposta em caso de erro", async function () {
    //   sinon
    //     .stub(salesService, "createSale")
    //     .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

    //   const req = {};
    //   const res = {};

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();

    //   await salesController.createNewSale(req, res);

    //   expect(res.status.calledWith(404)).to.be.true;
    //   expect(res.json.calledWith({ message: "Product not found" })).to.be.true;
    // });
  });
});

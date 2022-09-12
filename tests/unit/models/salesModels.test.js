const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const { allSales } = require("./mocks/sales.model.mock");
const salesModel = require("../../../src/models/sales.model");

describe("Testes de unidade do model de sales", () => {
  beforeEach(sinon.restore);
  afterEach(sinon.restore);

  describe("testando criar uma sale", () => {
    describe("criado com sucesso", () => {
      it("retorna o id", async () => {
        sinon.stub(connection, "execute").resolves([{ insertId: 4 }]);

        const sale = await salesModel.insertSaleDate();
        expect(sale).to.deep.equal(4);
      });
    });
  });

    describe("criado com sucesso", () => {
      it("retorna um objeto", async () => {
        sinon
          .stub(connection, "execute")
          .resolves({ saleId: 1, productId: 4, quantity: 5 });

        const saleInfo = { saleId: 1, productId: 4, quantity: 5 };
        const sale = await salesModel.insertSale(saleInfo);
        expect(sale).to.deep.equal(1);
      });
    });

  describe("testando listar sales", () => {
    describe("com sucesso", () => {
      it("retorna um array", async () => {
        sinon.stub(connection, "execute").resolves([allSales]);

        const sale = await salesModel.listSales();
        expect(sale).to.be.an("array");
        expect(sale).to.be.equal(allSales);
      });
    });
  });

  describe("testando pegar sales por id", () => {
    describe("com sucesso", () => {
      it("retorna um objeto", async () => {
        sinon.stub(connection, "execute").resolves([allSales[0]]);
        const sale = await salesModel.listSaleById(1);
        expect(sale).to.be.an("object");
        expect(sale).to.be.equal(allSales[0]);
      });
      describe("sem sucesso", () => {
        it("retorna null", async () => {
          sinon.stub(connection, "execute").resolves([[]]);

          const sale = await salesModel.listSaleById(999);
          expect(sale).to.be.equal(null);
        });
      });
    });
  });
});

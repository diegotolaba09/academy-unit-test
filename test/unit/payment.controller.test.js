const {
  getPaymentById,
  createPayment,
  getSummary,
  getPaymentGroupedByPaymentGateway,
  sortPaymentsByAmount,
} = require("../../controllers/payment.controller");
const {
  getPayments,
  validate,
  create,
} = require("../../services/payment.service");
const payments = require("../../model/payments.json");

jest.mock("../../services/payment.service");

beforeEach(() => {
  getPayments.mockClear();
  validate.mockClear();
  create.mockClear();
});

describe("Testing in payment controller", () => {
  it("Should create payment data", () => {
    const paymentData = {
      id: "5f3fe4eb-6afc-4d5b-b630-10b09177b45c",
      amount: 1000,
      description: "product example",
      payment_gateway: "naranja",
      pan: "************4447",
    };

    validate.mockReturnValue("Payment validation");
    create.mockReturnValue("Payment creation");

    const result = createPayment(paymentData);

    expect(result).toBe(undefined);
    expect(validate).toHaveBeenCalledTimes(1);
    expect(validate).toHaveBeenNthCalledWith(1, paymentData);
    expect(create).toHaveBeenCalledTimes(1);
    expect(create).toHaveBeenNthCalledWith(1, paymentData);
  });

  it("Should return paymentId", () => {
    getPayments.mockReturnValue(payments);

    const paymentId = "4f3fe4eb-6afc-4d7b-b630-10b09177b48c";
    const result = getPaymentById(paymentId);

    expect(result.id).toBe(paymentId);
    expect(getPayments).toHaveBeenCalledTimes(1);
    expect(getPayments).toHaveBeenNthCalledWith(1);
  });

  it("Should return summary", () => {
    getPayments.mockReturnValue(payments);
    const paymentData = payments;
    const total = paymentData.reduce(
      (previous, payment) => previous + payment.amount,
      0
    );
    const count = payments.length;

    const result = getSummary();

    expect(result.total).toBe(total);
    expect(result.count).toBe(count);
    expect(getPayments).toHaveBeenCalledTimes(1);
    expect(getPayments).toHaveBeenNthCalledWith(1);
  });

  it("Should return paymentsGroup", () => {
    getPayments.mockReturnValue(payments);

    const result = getPaymentGroupedByPaymentGateway();

    expect(result.naranja.length).not.toBe(0);
    expect(result.naranja.length).toBe(5);
    expect(result.visa.length).not.toBe(0);
    expect(result.visa.length).toBe(3);
    expect(getPayments).toHaveBeenCalledTimes(1);
    expect(getPayments).toHaveBeenNthCalledWith(1);
  });

  it("Should return payments by amount", () => {
    getPayments.mockReturnValue(payments);

    const resultOne = sortPaymentsByAmount();
    const resultTwo = sortPaymentsByAmount(false);

    expect(resultOne.length).not.toBe(0);
    expect(resultTwo.length).not.toBe(0);
    expect(getPayments).toHaveBeenCalledTimes(2);
    expect(getPayments).toHaveBeenNthCalledWith(1);
    expect(getPayments).toHaveBeenNthCalledWith(2);
  });
});

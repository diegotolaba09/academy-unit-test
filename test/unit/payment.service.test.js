const {
  getPayments,
  validate,
  create,
} = require("../../services/payment.service");
const payments = require("../../model/payments.json");

describe("Testing in payment services", () => {
  it("Should return payment data", () => {
    const result = getPayments();

    expect(result).toBe(payments);
    expect(result.length).not.toBe(0);
  });
  
  it("Should return validate log message", () => {
    const result = validate();

    expect(result).toBe(undefined);
  });

  it("Should return create log message", () => {
    const result = create();

    expect(result).toBe(undefined);
  });
});

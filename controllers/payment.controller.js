const PaymentsService = require("../services/payment.service");

function createPayment(data) {
  PaymentsService.validate(data);
  PaymentsService.create(data);
}

function getPaymentById(id) {
  const payments = PaymentsService.getPayments();
  return payments.find((payment) => payment.id === id);
}

function getSummary() {
  const payments = PaymentsService.getPayments();
  const total = payments.reduce(
    (previous, payment) => previous + payment.amount,
    0
  );
  const count = payments.length;
  return {
    total,
    count,
  };
}

function getPaymentGroupedByPaymentGateway() {
  const payments = PaymentsService.getPayments();
  const paymentsGroup = {};

  payments.forEach((payment) => {
    if (!paymentsGroup[payment.payment_gateway]) {
      paymentsGroup[payment.payment_gateway] = [payment];
    } else {
      paymentsGroup[payment.payment_gateway].push(payment);
    }
  });

  return paymentsGroup;
}

function sortPaymentsByAmount(asc = true) {
  const payments = PaymentsService.getPayments();

  payments.sort((firstPayment, secondPayment) => {
    return asc
      ? firstPayment.amount - secondPayment.amount
      : secondPayment.amount - firstPayment.amount;
  });

  return payments;
}

module.exports = {
  createPayment,
  getPaymentById,
  getSummary,
  getPaymentGroupedByPaymentGateway,
  sortPaymentsByAmount,
};

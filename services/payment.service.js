const payments = require('../model/payments.json');

function getPayments() {
    return payments;
}

function validate(data) {
    console.log('Payment validation');
}

function create() {
    console.log('Payment creation');
}

module.exports = {
    getPayments,
    validate,
    create
}

const User = require("../models/userModel");
const braintree = require('braintree');
require('dotenv').config();

const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
})
exports.generateToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send(response);
        }
    })
}
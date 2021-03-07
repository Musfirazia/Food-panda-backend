"use strict";
exports.__esModule = true;
exports.OrderSchema = void 0;
var mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
exports.OrderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    totalPrice: {
        type: Number,
        "default": 0
    },
    voucher: {
        type: String
    },
    paymentType: {
        type: String,
        "default": "In Cash",
        "enum": ["In Cash", "Visa Card"] // enum means string objects
    }
}, cardDetails, {
    CardNumber: String,
    cvcNumber: String
}, expiryDate, {
    type: Date
}, paymentDate, {
    type: Date,
    "default": Date.now
});

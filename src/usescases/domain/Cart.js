'use strict';

class Cart {
    constructor(id = null, code, datetime, customer, products, address, totalvalue, methodpayment, state, datetimeupdated) {
        this.id = id;
        this.code = code;
        this.datetime = datetime;
        this.customer = customer;
        this.products = products;
        this.address = address;
        this.totalvalue = totalvalue;
        this.methodpayment = methodpayment;
        this.state = state;
        this.datetimeupdated = datetimeupdated;
    }
}
module.exports = Cart;
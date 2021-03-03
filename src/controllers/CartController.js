'use strict';

const CreateCart = require('../usescases/CreateCart');
const CancelCart = require('../usescases/CancelCart');
const GetAllCarts = require('../usescases/GetAllCarts');
const GetAllCartsByCustomer = require('../usescases/GetAllCartsByCustomer');
const Cart = require('../usescases/domain/Cart');
const CartRepository = require('../repositories/CartRepository');
const FirebaseDaoFactory = require('../repositories/daoFactory/FirebaseDaoFactory');
const CartFirebaseEntityMap = require('../repositories/mapEntities/CartFirebaseEntityMap');
const SendEmailNodeMailer = require('../usescases/SendEmailNodeMailer');

class CartController {
    constructor() {
        this.cartRepository = new CartRepository(new FirebaseDaoFactory(), new CartFirebaseEntityMap());
        this.SendEmailNodeMailer = new SendEmailNodeMailer();
    }

    createCart(request, h) {
        const { id, code, datetime, customer, products, address, totalvalue, methodpayment, state, datetimeupdated } = request.payload;
        const useCase = new CreateCart(this.cartRepository, this.SendEmailNodeMailer);
        useCase.setCart(new Cart(id, code, datetime, customer, products, address, totalvalue, methodpayment, state, datetimeupdated));
        const response = h.response({ "data": useCase.execute() }).code(201).type('application/json');
        response.header("Authorization", request.headers.authorization);
        return response;
    }

    cancelCart(request, h) {
        const { id, code, datetime, customer, products, address, totalvalue, methodpayment, state, datetimeupdated } = request.payload;
        const useCase = new CancelCart(this.cartRepository, this.SendEmailNodeMailer);
        useCase.setCart(new Cart(id, code, datetime, customer, products, address, totalvalue, methodpayment, state, datetimeupdated));
        const response = h.response({ "data": useCase.execute() }).code(200).type('application/json');
        response.header("Authorization", request.headers.authorization);
        return response;
    }

    async getAllCarts(request, h) {
        const useCase = new GetAllCarts(this.cartRepository);
        const response = h.response({ "data": await useCase.execute() }).code(200).type('application/json');
        response.header("Authorization", request.headers.authorization);
        return response;
    }

    async getAllCartsByCustomer(request, h) {
        const customerId = request.params.id;
        const useCase = new GetAllCartsByCustomer(this.cartRepository);
        useCase.setCustomerId(customerId);
        const response = h.response({ "data": await useCase.execute() }).code(200).type('application/json');
        response.header("Authorization", request.headers.authorization);
        return response;
    }
}

module.exports = CartController;

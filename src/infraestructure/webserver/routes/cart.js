'use strict';

const JWT = require('jsonwebtoken');
const CartController = require('../../../controllers/CartController');
const cartsController = new CartController();

module.exports = [
  {
    method: 'GET',
    path: '/api/token',
    config: {
      auth: false
    },
    handler: async (request, h) => {
      const people = {
        1: {
          id: 1,
          name: 'Jen Jones'
        }
      };
      const token = JWT.sign(people[1], 'NeverShareYourSecret');
      return h.response({
        token: token
      }).code(200).type('application/json');
    }
  },
  {
    method: "GET",
    path: "/",
    config: { auth: false },
    handler: async (request, h) => {
      return { text: 'Token not required' };
    }
  },
  {
    method: 'POST',
    path: '/api/carts',
    config: { auth: 'jwt' },
    handler: async (request, h) => cartsController.createCart(request, h)
  },
  {
    method: 'PUT',
    path: '/api/carts',
    config: { auth: 'jwt' },
    handler: async (request, h) => cartsController.cancelCart(request, h)
  },
  {
    method: 'GET',
    path: '/api/carts',
    config: { auth: 'jwt' },
    handler: async (request, h) => cartsController.getAllCarts(request, h)
  },
  {
    method: 'GET',
    path: '/api/carts/getAllCartsByCustomer/{id}',
    config: { auth: 'jwt' },
    handler: async (request, h) => cartsController.getAllCartsByCustomer(request, h)
  }
];

'use strict';

const ICartRepository = require('../usescases/repository/ICartRepository');

class CartRepository extends ICartRepository {

    constructor(cartDaoFactory, cartEntityMap) {
        super();
        this.cartDaoFactory = cartDaoFactory;
        this.cartEntityMap = cartEntityMap;
    }

    save(cart) {
        const entity = this.cartEntityMap.serializeToEntity(cart);
        const source = this.cartDaoFactory.getCartDao();   
        return source.save(entity);
    }

    setState(cart) {
        const entity = this.cartEntityMap.serializeToEntity(cart);
        const source = this.cartDaoFactory.getCartDao();   
        return source.setState(entity);
    }

    remove(id) {
     
    }

    async get(id) {
      
    }

    async all() {
        const source = this.cartDaoFactory.getCartDao();   
        return  this.cartEntityMap.serializeToCart(await source.all());
    }

    async getAllCartsByCustomer(customerId) {
        const source = this.cartDaoFactory.getCartDao();   
        return  this.cartEntityMap.serializeToCart(await source.getAllCartsByCustomer(customerId));
    }
}

module.exports = CartRepository;

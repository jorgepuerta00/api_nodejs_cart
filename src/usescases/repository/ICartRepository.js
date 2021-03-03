'use strict';

class ICartRepository {
    constructor() {
     }

    save(cart) {
        // To be overridden in concrete implementation
    }

    setState(cart) {
        // To be overridden in concrete implementation
    }

    remove(cart) {
        // To be overridden in concrete implementation
    }

    get(id) {
        // To be overridden in concrete implementation
    }

    async all() {
        // To be overridden in concrete implementation
    }

    async getAllCartsByCustomer(customerId) {
        // To be overridden in concrete implementation
    }

    
}

module.exports = ICartRepository;

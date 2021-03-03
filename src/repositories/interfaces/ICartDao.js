'use strict';

class ICartDao {
    constructor() { }

    save(entity) {
        // To be overridden in concrete implementation
    }

    setState(entity) {
        // To be overridden in concrete implementation
    }

    remove(id) {
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

module.exports = ICartDao;

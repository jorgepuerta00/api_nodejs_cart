'use strict';

/**
 * Get all carts from database
 */
class GetAllCartsByCustomer {
    constructor(cartRepository) {
        this.cartRepository = cartRepository;
    }

    setCustomerId(customerId) {
        this.customerId = customerId;
    }

    async execute() {
        return await this.cartRepository.getAllCartsByCustomer(this.customerId);
    }
}

module.exports = GetAllCartsByCustomer;

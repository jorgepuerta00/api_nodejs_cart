'use strict';

const CartFirebaseEntity = require('../entities/CartFirebaseEntity');
const Cart = require('../../usescases/domain/Cart');

const _serializeSingleCartEntity = (entity) => {
    var firebaseEntity = new CartFirebaseEntity(
        entity.id,
        entity.code,
        entity.datetime,
        entity.customer,
        entity.products,
        entity.address,
        entity.totalvalue,
        entity.methodpayment,
        entity.state,
        entity.datetimeupdated
    );
    return JSON.parse(JSON.stringify(firebaseEntity));
};

const _serializeSingleCart = (entity) => {
    return new Cart(
        entity.id,
        entity.code,
        entity.datetime,
        entity.customer,
        entity.products,
        entity.address,
        entity.totalvalue,
        entity.methodpayment,
        entity.state,
        entity.datetimeupdated
    );
}

module.exports = class CartFirebaseEntityMap {
    serializeToEntity(data) {
        if (!data) {
            throw new Error('Invalid Data');
        }
        if (Array.isArray(data)) {
            return data.map(_serializeSingleCartEntity);
        }
        return _serializeSingleCartEntity(data);
    }

    serializeToCart(data) {
        if (!data) {
            throw new Error('Invalid Data');
        }
        if (Array.isArray(data)) {
            return data.map(_serializeSingleCart);
        }
        return _serializeSingleCart(data);
    }
};

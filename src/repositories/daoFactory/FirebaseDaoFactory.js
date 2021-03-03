'use strict';

const CartFirebaseDao = require('../firebasePersistence/CartFirebaseDao');

class FirebaseDaoFactory {

    getCartDao() {
        return CartFirebaseDao;
    }
}

module.exports =  FirebaseDaoFactory;
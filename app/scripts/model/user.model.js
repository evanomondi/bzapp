(function () {

    'use strict';

    angular.module('app.model').factory('User', user);

    user.$inject = ['Address'];

    function user(Address) {

        function User() {}

        User.prototype = {

            get id() {
                return this._id;
            },
            set id(value) {
                this._id = value;
            },
            get username() {
                return this._username;
            },
            set username(value) {
                this._username = value;
            },
            get email() {
                return this._email;
            },
            set email(value) {
                this._email = value;
            },
            get firstName() {
                return this._firstName;
            },
            set firstName(value) {
                this._firstName = value;
            },
            get lastName() {
                return this._lastName;
            },
            set lastName(value) {
                this._lastName = value;
            },
            get addresses() {
                return this._addresses;
            },
            set addresses(value) {
                this._addresses = value;
            },
            get shippingAddress() {
                return this._shippingAddress;
            },
            set shippingAddress(value) {
                this._shippingAddress = value;
            },
            get billingAddress() {
                return this._billingAddress;
            },
            set billingAddress(value) {
                this._billingAddress = value;
            },
            get rawData() {
                return this._rawData;
            },
            set rawData(value) {
                this._rawData = value;
            }           
        };

        User.build = function (source, adapter) {
            var user = new User();
            if (adapter) {
                adapter.transform(user, source);
            } else {
                angular.extend(user, source);

                // convert raw addresses to address models
                user.addresses =  source.address.map(function (rawAddress) {
                    return Address.build(rawAddress);
                });

                if (source.shippingAddress) {
                    user.shippingAddress = Address.build(source.shippingAddress);
                }

                if (source.billingAddress) {
                    user.billingAddress = Address.build(source.billingAddress);
                }
            }

            return user;
        };

        return User;
    }

})();
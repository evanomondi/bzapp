(function () {

    'use strict';

    angular.module('app.model').factory('Address', address);

    function address() {

        function Address() {

        }

        Address.prototype = {

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
            get phone() {
                return this._phone;
            },
            set phone(value) {
                this._phone = value;
            },
            get country() {
                return this._country;
            },
            set country(value) {
                this._country = value;
            },
            get state() {
                return this._state;
            },
            set state(value) {
                this._state = value;
            },
            get postcode() {
                return this._postcode;
            },
            set postcode(value) {
                this._postcode = value;
            },
            get city() {
                return this._city;
            },
            set city(value) {
                this._city = value;
            },
            get address1() {
                return this._address1;
            },
            set address1(value) {
                this._address1 = value;
            },
            get address2() {
                return this._address2;
            },
            set address2(value) {
                this._address2 = value;
            },

            clone: function () {
                return Address.build(this);
            },

            serialize: function () {
                return {
                    'email': this.email || '',
                    'first_name': this.firstName || '',
                    'last_name': this.lastName || '',
                    'country': this.country || '',
                    'city': this.city || '',
                    'state': this.state || '',
                    'postcode': this.postcode || '',
                    'address': this.address1 || '',
                    'address_2': this.address2 || '',
                    'phone': this.phone || ''
                };
            }

        };

        Address.build = function (source, adapter) {
            var address = new Address();
            if (adapter) {
                adapter.transform(address, source);
            } else {
                angular.extend(address, source);
            }

            return address;
        };

        return Address;
    }

})();
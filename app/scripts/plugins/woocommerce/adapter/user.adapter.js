(function () {

    'use strict';

    angular.module('app.plugin.adapter').factory('userAdapter', adapter);

    adapter.$inject = ['Address', 'addressAdapter'];

    function adapter(Address, addressAdapter) {

        return {
            transform: function (destination, source) {
                destination.id = source.id;
                destination.username = source.username;
                destination.email = source.email;
                destination.firstName = source.first_name;
                destination.lastName = source.last_name;

                destination.addresses = [];

                if (source.shipping_address) {                    
                    destination.shippingAddress = Address.build(source.shipping_address, addressAdapter);
                    // Override shipping email with customer's email
                    // have to do it for woocommerce as they don't store email in address
                    destination.shippingAddress.email = destination.email;   
                }
                else {
                    // No address? Fine, create an empty one with customer's email
                    destination.shippingAddress = Address.build({email: destination.email});
                }

                if (source.billing_address) {
                    destination.billingAddress = Address.build(source.billing_address, addressAdapter);

                    // Override shipping address email with billing address email. WooCommerce 
                    // stores only billing address email.                  
                    if (destination.billingAddress.email) {
                        destination.shippingAddress.email = destination.billingAddress.email;
                    }   
                    // Override shipping address phone with billing address phone. WooCommerce 
                    // stores only billing address phone.         
                    if (destination.billingAddress.phone) {
                        destination.shippingAddress.phone = destination.billingAddress.phone;
                    } 
                }
                else {
                    destination.billingAddress = Address.build({});
                }

                destination.addresses.push(destination.shippingAddress);
                destination.addresses.push(destination.billingAddress);

                destination.rawData = source;
            }
        };       
    }

})();
(function () {

	'use strict';

	angular.module('app.model').factory('PaymentMethodDetails', paymentMethod);

	function paymentMethod() {
		
		function PaymentMethodDetails() {}

		PaymentMethodDetails.prototype = {

			get id() {
				return this._id;
			},
			set id(value) {
				this._id = value;
			},
			get cardNumber() {
				return this._cardNumber;
			},
			set cardNumber(value) {
				this._cardNumber = value;
			},
			get cardHolderName() {
				return this._cardHolderName;
			},
			set cardHolderName(value) {
				this._cardHolderName = value;
			},
			get validThru() {
				return this._validThrough;
			},
			set validThru(value) {
				this._validThrough = value;
			}, 
			get cvv() {
				return this._cvv;
			},
			set cvv(value) {
				this._cvv = value;
			},
			get token() {
				return this._token;
			},
			set token(value) {
				this._token = value;
			},

			clearSensitiveData: function() {
				this.cardNumber = null;
				this.cardHolderName = null;
				this.validThru = null;
				this.cvv = null;
			}

		};

		PaymentMethodDetails.build = function (source, adapter) {
			var details = new PaymentMethodDetails();
			if (adapter) {
				adapter.transform(details, source);
			}
			else {
				angular.extend(details, source);
			}

			return details;
		};

		return PaymentMethodDetails;
	}

})();
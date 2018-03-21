(function(){

	'use strict';

	angular.module('app.model').factory('Block', block);
	

	function block() {

		function Block() {}

		Block.prototype = {
			get title() {
				return this._title;
			},
			set title(value) {
				this._title = value;
			},
			get subtitle() {
				return this._subtitle;
			},
			set subtitle(value) {
				this._subtitle = value;
			},
			get action() {
				return this._action;
			},
			set action(value) {
				this._action = value;
			},
			get highlightContent() {
				return this._highlightContent;
			},
			set highlightContent(value) {
				this._highlightContent = value;
			},
			get storeCategoryId() {
				return this._storeCategoryId;
			},
			set storeCategoryId(value) {
				this._storeCategoryId = value;
			},
			get image() {
				return this._image;
			},
			set image(value) {
				this._image = value;
			},
			get halign() {
				return this._halign;
			},
			set halign(value) {
				this._halign = value;
			},
			get valign() {
				return this._valign;
			},
			set valign(value) {
				this._valign = value;
			}
		};

		Block.build = function (source, adapter) {
			var block = new Block();

			if (adapter) {
				adapter.transform(block, source);
			}
			else {
				angular.extend(block, source);				
			}

			return block;
		};

		return Block;
	}

})();
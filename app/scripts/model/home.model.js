(function(){

	'use strict';

	angular.module('app.model').factory('Home', home);

	home.$inject = ['Block'];

	function home(Block) {

		function Home() {}

		Home.prototype = {
			get blocks() {
                return this._blocks;
            },
            set blocks(value) {
                this._blocks = value;
            }
		};

		Home.build = function (source, adapter) {
			var home = new Home();

			if (adapter) {
				adapter.transform(home, source);
			}
			else {
				angular.extend(home, source);

				home.blocks = home.blocks.map(function (blockSrc) {
					return Block.build(blockSrc);
				});
			}

			return home;
		};

		return Home;
	}

})();
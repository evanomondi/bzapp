(function () {

    'use strict';

    angular.module('app.plugin.adapter').factory('homeAdapter', adapter);

    adapter.$inject = ['Block', 'blockAdapter'];

    function adapter(Block, blockAdapter) {

        return {
            transform: function (destination, source) {                
                destination.blocks = source.blocks.map(function (block) {
                    return Block.build(block, blockAdapter);
                });                                       
            }
        };       
    }
})();
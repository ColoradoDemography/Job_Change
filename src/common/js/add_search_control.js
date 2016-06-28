// @flow

module.exports = function(map: Object) {
    'use strict';

    L.Control.Command = L.Control.extend({
        options: {
            position: 'topright'
        },
        onAdd: require("./create_search_box")
    });


    L.control.command = function(options) {
        return new L.Control.Command(options);
    };

    var LeafletFilterControl = L.control.command({
        postion: 'topright'
    });

    map.addControl(LeafletFilterControl);

};
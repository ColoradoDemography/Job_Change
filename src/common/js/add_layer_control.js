// @flow


module.exports = function(map: Object, basemaps: Object) {
    'use strict';


    var baseMaps: Object = {
        "Mapbox Light": basemaps.light,
        "Mapbox Emerald": basemaps.emerald
    };

    L.control.layers(baseMaps, null).addTo(map);


}
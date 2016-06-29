// @flow


module.exports = function(map: Object, basemaps: Object) {
    'use strict';


    var baseMaps: Object = {
        "Default": basemaps.nolabel,
        "Mapbox Emerald": basemaps.emerald
    };

    L.control.layers(baseMaps, null).addTo(map);


}
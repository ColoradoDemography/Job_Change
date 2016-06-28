// @flow

document.addEventListener("DOMContentLoaded", function() {
    'use strict';

    require("!style!css!../../lib/css/leaflet.modal.css");
    require("!style!css!../css/app.css");

    var basemaps = require("./load_basemaps")();

    var map = L.map('map', {
        center: [39, -105.5],
        zoom: 7,
        layers: [basemaps.light],
        zoomControl: false
    });

    var instance = require("./geojson_layers.js")(map);

    require("./add_credits")(map);
    require("./add_title_control")(map);

    L.control.zoom({
        position: 'topright'
    }).addTo(map);

    require("./add_layer_control.js")(map, instance, basemaps);

    require("./add_custom_control")(map, function() {});


}); //end DOM Content Loaded
// @flow



document.addEventListener("DOMContentLoaded", function() {
    'use strict';

    require("!style!css!../../lib/css/leaflet.modal.css");
    require("!style!css!../css/app.css");
    require("!style!css!../../lib/css/leaflet.groupedlayercontrol.min.css");

    var basemaps = require("./load_basemaps")();

    var map = L.map('map', {
        center: [39, -105.5],
        zoom: 9,
        layers: [basemaps.light],
        zoomControl: false
    });


    require("./add_credits")(map);
    require("./add_title_control")(map);
    require("./add_search_control")(map);

    L.control.zoom({
        position: 'topright'
    }).addTo(map);




}); //end DOM Content Loaded
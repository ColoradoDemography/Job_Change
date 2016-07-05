// @flow

//webworker
var p: Promise = new Promise(function(resolve) {

    /* $FlowIssue - Flow throws cannot find module error on Worker */
    var Worker = require("worker!./workers/load_data.js");
    var worker: Worker = new Worker;

    worker.postMessage("start");
    worker.onmessage = function(e) {
        resolve(e.data);
    }

});

document.addEventListener("DOMContentLoaded", function() {
    'use strict';

    require("!style!css!../../lib/css/leaflet.modal.css");
    require("!style!css!../../lib/css/easy-button.css");
    require("!style!css!../css/app.css");
    require("!style!css!../css/tabs.css");

    var basemaps = require("./load_basemaps")();

    var map = L.map('map', {
        center: [39.0, -105.4],
        zoom: 7,
        layers: [basemaps.nolabel],
        zoomControl: false
    });

    require("./add_legend")(map);
    require("./add_credits")(map);
    require("./add_title_control")(map);

    L.control.zoom({
        position: 'topright'
    }).addTo(map);

    require("./add_save_button.js")(map);


    require("./add_layer_control.js")(map, basemaps);





    //when data has been loaded
    p.then(function(worker_data) {

        var p1: Promise = new Promise(function(resolve) {
            require("./geojson_layers.js")(map, worker_data[0], resolve);
        });

        p1.then(function(layer) {
            require("./add_custom_control.js")(map, layer, worker_data);
        });

    });




}); //end DOM Content Loaded
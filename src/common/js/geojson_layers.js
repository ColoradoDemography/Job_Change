// @flow



module.exports = function(map: Object, worker_data: Object, resolve: any) {

    'use strict';

    var buildModal = require("./build_modal.js");

    var coutline: Object = new L.geoJson(null, {
        style: function() {
            return {
                weight: 1,
                color: "grey",
                fillOpacity: 0
            };
        },
        onEachFeature: function(feature, layer) {
            layer.on('click', function(e) {
                buildModal(e, worker_data, map);
            });
        }
    }).addTo(map);


    var xhr = new XMLHttpRequest();
    xhr.open('GET', "data/counties.geojson");
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var parsed_response = JSON.parse(xhr.responseText);
                coutline.addData(parsed_response);
                require("./d3_text.js")(map);
                resolve(coutline);
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    };




}
// @flow

var styleLayer = require("./style_layer.js");

module.exports = function(map: Object) {
    'use strict';


    function county_onEachFeature(feature, layer) {
        layer.bindPopup("County: " + feature.properties.NAME);
    }

    var coutline: Object = new L.geoJson(null, {
        style: styleLayer(null),
        onEachFeature: county_onEachFeature
    }).addTo(map);


    var xhr = new XMLHttpRequest();
    xhr.open('GET', "data/counties.geojson");
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var parsed_response = JSON.parse(xhr.responseText);
                coutline.addData(parsed_response);
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    };


    return coutline;

}
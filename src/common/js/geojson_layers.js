// @flow

module.exports = function(map: Object) {
    'use strict';


    function county_onEachFeature(feature, layer) {
        layer.bindPopup("County: " + feature.properties.NAME);
    }

    var coutline: Object = new L.geoJson(null, {
        style: function() {
            return {
                weight: 1,
                color: "#444",
                fillOpacity: 0
            };
        },
        onEachFeature: county_onEachFeature
    }).addTo(map);


    var p1: Promise = new Promise(function(resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', "data/counties.geojson");
        xhr.send(null);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var parsed_response = JSON.parse(xhr.responseText);
                    coutline.addData(parsed_response);
                    resolve("geojson file successfully loaded");
                } else {
                    console.log('Error: ' + xhr.status);
                    reject("count not load geojson file");
                }
            }
        };

    }); //end promise

    return [p1, coutline];

}
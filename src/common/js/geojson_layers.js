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
                color: "grey",
                fillOpacity: 0
            };
        },
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
                require("./d3_text.js")(map);
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    };


    return coutline;

}
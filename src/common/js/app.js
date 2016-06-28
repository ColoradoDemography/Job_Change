// @flow

var fetchJSONFile = require("./fetch_json.js");

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

    var CMap = require("./init_object.js")();
  
  
  var cMap = {};
  
fetchJSONFile('https://gis.dola.colorado.gov/lookups/components?year=1970,1973&county=1,3,5,7,9,11,13,14,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125', function(data) {
  cMap = new CMap(data);
  
  console.log(cMap.data);
  
  console.log("first_year: " + cMap.first_year);
  console.log("last_year: " + cMap.last_year);
  console.log("number_of_years: " + cMap.number_of_years);
  console.log("Adams Pop Estimate 1970: " + cMap.retrieveCountyPop(1,1970));
  console.log('PopChgAdams: ' + cMap.retrieveTtlPopChg(1));
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
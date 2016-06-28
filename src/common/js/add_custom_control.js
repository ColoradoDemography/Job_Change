// @flow

var fetchJSONFile = require("./fetch_json.js");
var refreshdata = require("./refresh_data.js");


module.exports = function(map: Object, layer: Object) {
    'use strict';

    //Custom Layer Control
    var command: Object = L.control({
        position: 'topleft'
    });


    fetchJSONFile('https://gis.dola.colorado.gov/lookups/componentYRS', function(data) {

        var queriedYears: string = "";

        for (let i = 0; i < data.length; i++) {
            queriedYears += "<option style='color:" + ((data[i].datatype === "Estimate") ? "black" : "red") + "' value='" + data[i].year + "'>" + data[i].year + "</option>";
        }

        command.onAdd = function() {
            var div = L.DomUtil.create('div', 'command bord');
            div.innerHTML = "Statistic:<br /><select id='stat'><option value='2'>Total Population Change</option><option value='1'>Percent Population Change</option><option value='4'>Avg Population Change</option><option value='3'>Avg Pct Population Change</option><option value='5'>Birth Rate</option><option value='6'>Death Rate</option><option value='7'>Rate of Natural Increase</option><option value='8'>Migration Rate</option><option value='9'>Total Births</option><option value='10'>Total Deaths</option><option value='11'>Total Natural Increase</option><option value='12'>Total Migration</option></select><br />" +
                "<br />From:&nbsp;&nbsp;<select id='selfrom'>" + queriedYears + "</select>&nbsp;&nbsp;&nbsp;To:&nbsp;&nbsp;<select id='selto'>" + queriedYears + "</select>";
            div.padding = "20px";
            return div;
        };
        command.addTo(map);


        document.getElementById("stat").addEventListener("change", function() {
            refreshdata(layer);
        }, false);

        document.getElementById("selfrom").addEventListener("change", function() {
            refreshdata(layer);
        }, false);

        document.getElementById("selto").addEventListener("change", function() {
            refreshdata(layer);
        }, false);


        var a: Object = document.getElementsByClassName('leaflet-control-container')[0];

        a.addEventListener('dblclick', function(event) {
            event = event || window.event // cross-browser event
            if (event.stopPropagation) {
                event.stopPropagation()
            } else {
                event.cancelBubble = true
            }
        });

        a.addEventListener('mousemove', function(event) {
            event = event || window.event // cross-browser event
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        });

    });




}
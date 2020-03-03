// @flow

var refreshdata = require("./refresh_data.js");


module.exports = function(map: Object, layer: Object, worker_data: any) {
    'use strict';

    //Custom Layer Control
    var command: Object = L.control({
        position: 'topleft'
    });

    var yrs_data = worker_data[1];
    var main_data = worker_data[0];

    var queriedYears: string = "";

    for (let i = 0; i < yrs_data.length; i++) {
         queriedYears += "<option style='color:" + ((yrs_data[i].datatype === "ESTIMATE") ? "black" : "red") + "' value='" + yrs_data[i].population_year + "'>" + yrs_data[i].population_year + "</option>";
    }

    command.onAdd = function() {
        var div = L.DomUtil.create('div', 'command bord');
        div.innerHTML = "Statistic:<br /><select id='stat'><option value='2'>Total Job Change</option><option value='1'>Percent Job Change</option>></select><br />" +
            "<br />From:&nbsp;&nbsp;<select id='selfrom'>" + queriedYears + "</select>&nbsp;&nbsp;&nbsp;To:&nbsp;&nbsp;<select id='selto'>" + queriedYears + "</select>";
        div.padding = "20px";
        return div;
    };
    command.addTo(map);


    document.getElementById("stat").addEventListener("change", function() {
        refreshdata(layer, main_data);
    }, false);

    document.getElementById("selfrom").addEventListener("change", function() {
        refreshdata(layer, main_data);
    }, false);

    document.getElementById("selto").addEventListener("change", function() {
        refreshdata(layer, main_data);
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


    function getJsonFromUrl() {
        var query = location.search.substr(1);
        var result = {};
        query.split("&").forEach(function(part) {
            var item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });
        return result;
    }

    //intialize!
    var querystring = getJsonFromUrl();

    if ('print' in querystring && 'stat' in querystring && 'from' in querystring && 'to' in querystring) {

        map.panTo(L.latLng(39.35, -104.3));

        let e: any = document.querySelector('#stat [value="' + querystring.stat + '"]');
        e.selected = true;
        let f: any = document.querySelector('#selfrom [value="' + querystring.from + '"]');
        f.selected = true;
        let g: any = document.querySelector('#selto [value="' + querystring.to + '"]');
        g.selected = true;
        document.getElementsByClassName('command')[0].style.display = 'none';
        document.getElementsByClassName('leaflet-top leaflet-right')[0].style.display = 'none';

        let stat_select: any = document.getElementById('stat');
        let stat_text: any = stat_select.options[stat_select.selectedIndex].text;

        let title_h2 = document.querySelector('.title h2');
        let selfrom: any = document.getElementById("selfrom");
        let selto: any = document.getElementById("selto");
        title_h2.innerHTML = "Colorado, " + selfrom.value + " to " + selto.value + ":&nbsp;&nbsp;" + stat_text;

        refreshdata(layer, main_data);
    } else {
        let e: any = document.querySelector('#selto [value="2018"]');
        e.selected = true;
        refreshdata(layer, main_data);

        require("./add_stat_caption.js")(map);
    }








}

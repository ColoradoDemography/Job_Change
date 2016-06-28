// @flow

module.exports = function() {

    'use strict';

    var basemaps: Object = {};

    basemaps.mbAttr = "© <a href='https://www.mapbox.com/map-feedback/'>Mapbox</a> | © <a href='https://www.openstreetmap.org/copyright'><span class='ifmobile'>OSM</span><span class='notmobile'>OpenStreetMap</span> Contributors</a> | <a href='#' id='devcred'>Credits</a><span id='ifmobile' class='ifmobile' ></span>",
        basemaps.mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3RhdGVjb2RlbW9nIiwiYSI6Ikp0Sk1tSmsifQ.hl44-VjKTJNEP5pgDFcFPg';


    basemaps.emerald = L.tileLayer(basemaps.mbUrl, {
        id: 'mapbox.emerald',
        attribution: basemaps.mbAttr
    });


    basemaps.classic = L.tileLayer(basemaps.mbUrl, {
        id: 'mapbox.streets-basic',
        attribution: basemaps.mbAttr
    });

    basemaps.light = L.tileLayer(basemaps.mbUrl, {
        id: 'mapbox.light',
        attribution: basemaps.mbAttr
    });


    return basemaps;

}
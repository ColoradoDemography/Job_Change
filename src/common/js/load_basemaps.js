// @flow

module.exports = function() {

    'use strict';

    var basemaps: Object = {};

    basemaps.mbAttr = "© <a href='https://www.mapbox.com/map-feedback/'>Mapbox</a> | © <a href='https://www.openstreetmap.org/copyright'><span class='ifmobile'>OSM</span><span class='notmobile'>OpenStreetMap</span> Contributors</a> | <a href='#' id='devcred'>Credits</a><span id='ifmobile' class='ifmobile' ></span>",
        basemaps.mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3RhdGVjb2RlbW9nIiwiYSI6Ikp0Sk1tSmsifQ.hl44-VjKTJNEP5pgDFcFPg';



    basemaps.emerald = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: 'mapbox/outdoors-v11',
        accessToken: 'pk.eyJ1Ijoic3RhdGVjb2RlbW9nIiwiYSI6Ikp0Sk1tSmsifQ.hl44-VjKTJNEP5pgDFcFPg'
    });


    basemaps.classic = L.tileLayer(basemaps.mbUrl, {
        id: 'mapbox.streets-basic',
        attribution: basemaps.mbAttr
    });

    basemaps.light = L.tileLayer(basemaps.mbUrl, {
        id: 'mapbox.light',
        attribution: basemaps.mbAttr
    });

    basemaps.nolabel = L.tileLayer('https://api.mapbox.com/styles/v1/statecodemog/ciq0yl9wf000ebpndverm5ler/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3RhdGVjb2RlbW9nIiwiYSI6Ikp0Sk1tSmsifQ.hl44-VjKTJNEP5pgDFcFPg', {
        attribution: basemaps.mbAttr
    });

    return basemaps;

}
// @flow


module.exports = function(map: Object) {
    'use strict';

    //Custom Layer Control
    var command: Object = L.control({
        position: 'topleft'
    });


    command.onAdd = function() {
        var div = L.DomUtil.create('div', 'bord');
        div.id = "caption_control";
        div.innerHTML = "";
        div.style.background = "white";
        return div;
    };
    command.addTo(map);



    var a: Object = document.getElementById('caption_control');

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





}
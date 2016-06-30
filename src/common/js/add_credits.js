// @flow

module.exports = function(map: Object) {

    var content: string = '<table class="abbrev">' +
        '<h3>Development Credits</h3>' +
        '<ul>' +
        '<li><a href="http://leafletjs.com/" target="_blank">Leaflet Mapping Library</a> - <a href="http://agafonkin.com/en/" target="_blank">Vladimir Agafonkin</a></li>' +
        '<li><a href="https://d3js.org/" target="_blank">D3 Data Visualization Library</a> - <a href="https://bost.ocks.org/mike/" target="_blank">Mike Bostock</a></li>' +
        '<li><a href="https://github.com/teralytics/Leaflet.D3SvgOverlay" target="_blank">Leaflet D3 Overlay Plugin</a> - <a href="http://www.teralytics.net/" target="_blank">Teralytics</a></li>' +
        '<li><a href="https://github.com/w8r/Leaflet.Modal" target="_blank">Leaflet Modal Plugin</a> - Alexander Milevski</li>' +
        '<li><a href="https://github.com/eligrey/FileSaver.js" target="_blank">FileSaver Plugin</a> - <a href="https://eligrey.com/" target="_blank">Eli Grey</a></li>' +
        '</ul>' +
        '<p>This Application works best on Chrome, Firefox, Safari, Internet Explorer (versions 10+), and Microsoft Edge.  It has been tested on a limited number of mobile devices.<p>';


    var addDevModal = function() {
        map.openModal({
            content: content
        });
    };

    var addDevModalListener = function() {
        var devcred = document.getElementById("devcred");
        devcred.addEventListener('click', addDevModal);
    };

    addDevModalListener(); //listen to click on Credits

    map.on('baselayerchange', function() {
        //re-add listener on Credits if basemap changes
        addDevModalListener();
    });

};
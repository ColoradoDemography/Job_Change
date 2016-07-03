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
        '<li><a href="https://github.com/fgnass/spin.js" target="_blank">Spin.js</a> - <a href="https://twitter.com/fgnass" target="_blank">Felix Gnass</a></li>' +
        '<li><a href="https://github.com/makinacorpus/Leaflet.Spin" target="_blank">Leaflet Spin</a> - <a href="http://makina-corpus.com/" target="_blank">Makina Corpus</a></li>' +
        '<li><a href="https://github.com/exupero/saveSvgAsPng" target="_blank">SaveSvgAsPng</a> - <a href="http://exupero.org/" target="_blank">Eric Shull</a></li>' +
        '<li><a href="https://github.com/CliffCloud/Leaflet.EasyButton" target="_blank">Leaflet Easy Button</a> - <a href="http://danielmontague.com/" target="_blank">Daniel Montague</a></li>' +
        '<li><a href="https://github.com/FortAwesome/Font-Awesome" target="_blank">Font Awesome</a> - <a href="https://twitter.com/davegandy" target="_blank">Dave Gandy</a></li>' +
        '<li><a href="" target="_blank">Waterfall Chart</a>' +
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
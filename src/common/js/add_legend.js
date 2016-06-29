module.exports = function(map) {

    var legend = L.control({
        position: 'bottomright'
    });

    legend.onAdd = function() {
        var div = L.DomUtil.create('div', 'title bord');
        div.id = 'legend-control';
        div.innerHTML = 'placeholder';
        return div;
    };

    legend.addTo(map);

}
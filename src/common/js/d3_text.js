module.exports = function(map) {


    d3.json("data/county_pts.json", function(error, data) {


        var text = data.map(d => {
            return {
                cname: d.cname,
                fips: d.fips,
                latitude: d.y,
                longitude: d.x,
                coordinates: L.latLng(d.y, d.x)
            }
        })

        var textOverlay = L.d3SvgOverlay(function(sel, proj) {

            var key = function(d) {
                return d.fips;
            };

            var textUpd = sel.selectAll('text')
                .data(text, key);


            textUpd.enter()
                .append('text')
                .style('text-anchor', 'middle')
                .style('color', '#444')
                .style('font-family', "'Source Sans Pro', sans-serif")
                .style('font-size', "8pt")
                .attr('x', function(d) {
                    return proj.latLngToLayerPoint(d.coordinates).x;
                })
                .attr('y', function(d) {
                    return proj.latLngToLayerPoint(d.coordinates).y;
                })
                .text(function(d) {
                    return d.cname;
                })
                .style('pointer-events', 'none');


            var insertLinebreaks = function(d) {
                var el = d3.select(this);
                var words = d.cname.split('|');
                el.text('');

                for (var i = 0; i < words.length; i++) {
                    var tspan = el.append('tspan').text(words[i]);
                    if (i > 0)
                        tspan.attr('x', proj.latLngToLayerPoint(d.coordinates).x).attr('dy', '10');
                }
            };

            textUpd.each(insertLinebreaks);


        });


        map.addLayer(textOverlay);


    });


}



module.exports = function(map){
  
  
  d3.json("/data/county_pts.json", function(error, data) {

   
    var text = data.map(d=>{
      return {
        cname: d.cname,
        fips: d.fips,
        latitude: d.y,
        longitude: d.x,
        coordinates: L.latLng(d.y,d.x)
      }
    })
    
      var textOverlay = L.d3SvgOverlay(function(sel, proj) {

        var textUpd = sel.selectAll('text')
            .data(text);

        textUpd.enter()
            .append('text')
            .style('text-anchor', 'left')
            .style("opacity", 1)
            .style('stroke', '#2f4f4f')
            .style('stroke-width', '1')
            .style('fill', '#000')
            .style('font-size', 12)
            .attr('x', function(d) {
          console.log(d.coordinates);
                return proj.latLngToLayerPoint(d.coordinates).x;
            })
            .attr('y', function(d) {
                return proj.latLngToLayerPoint(d.coordinates).y;
            })
            .text(function(d){ return d.cname;})
            .style('pointer-events', 'none');


    });

  
  map.addLayer(textOverlay);

 });
  
  
}
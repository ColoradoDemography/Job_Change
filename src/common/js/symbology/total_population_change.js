


module.exports = function(geolayer, cMap){
            
              var max = cMap.getMaxTtlChange();
              var min = cMap.getMinTtlChange();
      
  
              geolayer.setStyle(function(d){
              
              var fips = parseInt(d.properties.COUNTYFP);
              var value = cMap.retrieveTtlPopChg(fips);

              if(value > (-Infinity) && value <= (min*0.4)){ return { weight: 1, color: "grey", fillOpacity: 0.5, fillColor:"rgb(49, 54, 149)"}; }
              if(value > (min * 0.4) && value <= (min*0.25)){ return { weight: 1, color: "grey", fillOpacity: 0.5, fillColor:"rgb(69, 117, 180)"}; }
              if(value > (min * 0.25) && value <= (min*0.1)){ return { weight: 1, color: "grey", fillOpacity: 0.5, fillColor:"rgb(116, 173, 209)"}; }
              if(value > (min * 0.1) && value <= (min*0.05)){ return { weight: 1, color: "grey", fillOpacity: 0.5, fillColor:"rgb(171, 217, 233)"}; }
              if(value > (min * 0.05) && value <= (min*0)){ return { weight: 1, color: "grey", fillOpacity: 0.5, fillColor:"rgb(224, 243, 248)"}; }
              if(value > (min * 0) && value <= (max*0.05)){ return { weight: 1, color: "grey", fillOpacity: 0.5, fillColor:"rgb(255, 255, 191)"}; }
              if(value > (max * 0.05) && value <= (max*0.1)){ return { weight: 1, color: "grey", fillOpacity: 0.5, fillColor:"rgb(254, 224, 144)"}; }
              if(value > (max * 0.1) && value <= (max*0.2)){ return { weight: 1, color: "grey", fillOpacity: 0.5, fillColor:"rgb(253, 174, 97)"}; }
              if(value > (max * 0.2) && value <= (max*0.35)){ return { weight: 1, color: "grey", fillOpacity: 0.5, fillColor:"rgb(244, 109, 67)"}; }
              if(value > (max * 0.35) && value <= (max*0.5)){ return { weight: 1, color: "grey", fillOpacity: 0.5, fillColor:"rgb(215, 48, 39)"}; }
              if(value > (max * 0.5) && value <= (Infinity)){ return { weight: 1, color: "grey", fillOpacity: 0.5, fillColor:"rgb(165, 0, 38)"}; }
              
               return { weight: 13, color: "blue", fillOpacity: 0}; //hey you; there's a problem
              
            });
  
}
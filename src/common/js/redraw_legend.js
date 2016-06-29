

module.exports = function(min, max){
  
  
      //[{rgb_string, lowtext, operator, hightext}]
      var legend_components = [];
      legend_components.push({rgb_string: "rgba(49, 54, 149, 0.5)", lowtext: "Loss", operator: ">" , hightext: (min * 0.5).toLocaleString()});
      legend_components.push({rgb_string: "rgba(69, 117, 180, 0.5)", lowtext: (min * 0.5).toLocaleString(), operator: "to" , hightext: (min * 0.35).toLocaleString()});
      legend_components.push({rgb_string: "rgba(116, 173, 209, 0.5)", lowtext: (min * 0.35).toLocaleString(), operator: "to" , hightext: (min * 0.2).toLocaleString()});
      legend_components.push({rgb_string: "rgba(171, 217, 233, 0.5)", lowtext: (min * 0.2).toLocaleString(), operator: "to" , hightext: (min * 0.1).toLocaleString()});
      legend_components.push({rgb_string: "rgba(224, 243, 248, 0.5)", lowtext: (min * 0.1).toLocaleString(), operator: "to" , hightext: "0"});
      legend_components.push({rgb_string: "rgba(255, 255, 191, 0.5)", lowtext: "0", operator: "to" , hightext: (max * 0.1).toLocaleString()});
      legend_components.push({rgb_string: "rgba(254, 224, 144, 0.5)", lowtext: (max * 0.1).toLocaleString(), operator: "to" , hightext: (max * 0.2).toLocaleString()});
      legend_components.push({rgb_string: "rgba(253, 174, 97, 0.5)", lowtext: (max * 0.2).toLocaleString(), operator: "to" , hightext: (max * 0.35).toLocaleString()});
      legend_components.push({rgb_string: "rgba(244, 109, 67, 0.5)", lowtext: (max * 0.35).toLocaleString(), operator: "to" , hightext: (max * 0.5).toLocaleString()});
      legend_components.push({rgb_string: "rgba(215, 48, 39, 0.5)", lowtext: (max * 0.5).toLocaleString(), operator: "to" , hightext: (max * 0.75).toLocaleString()});
      legend_components.push({rgb_string: "rgba(165, 0, 38, 0.5)", lowtext: (max * 0.75).toLocaleString(), operator: "+" , hightext: ""});
  
  var htmlstring = "";
  
  for(let i=0; i< legend_components.length; i++){
    
    htmlstring += "<span style='font-family: Courier'><span style='color: " + legend_components[i].rgb_string + "'>&block;</span>&nbsp;&nbsp;" + legend_components[i].lowtext + "&nbsp;" + legend_components[i].operator + "&nbsp;" + legend_components[i].hightext + "</span><br />";
    
  }
  
  var legend = document.getElementById('legend-control');
  legend.innerHTML = htmlstring;
  
  
}
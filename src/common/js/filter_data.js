

module.exports = function(main_data, years_string, callback){
  
  //create array from years_string
  var years_array = years_string.split(",");
  
  var filtered_data = main_data.filter(function(d){
    
    for(let i=0; i<years_array.length; i++){
      if(d.year===parseInt(years_array[i])){return true;}
    }
    
    return false;
    
  });

  if (callback) callback(filtered_data);
}
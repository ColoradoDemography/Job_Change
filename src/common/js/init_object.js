
//will assume incoming data includes all counties.  countyfips=1 will be used for all data breadth calcs

module.exports = function(){
  
  function CMap(data){
    
    this.data = data;
        
    var first_year = function(){
      var low_year_value = 5000;
      for(let i=0;i<data.length; i++){
        if(data[i].year<low_year_value){low_year_value = data[i].year;}
      }
      return low_year_value;
    }();
    this.first_year = first_year;
    
    var last_year = function(){
      var high_year_value = 0;
      for(let i=0;i<data.length; i++){
        if(data[i].year>high_year_value){high_year_value = data[i].year;}
      }
      return high_year_value;
    }();
    this.last_year = last_year;
    
    var number_of_years = function(){
      return (last_year - first_year);
    }();
    this.number_of_years = number_of_years;
    
    
    
    this.retrieveCountyPop = function(fips, year){
      for(let i=0; i<data.length; i++){
        if(data[i].countyfips === fips && data[i].year === year){return data[i].estimate;}
      }
      return undefined;
    }
    
    this.retrieveTtlPopChg = function(fips){
      return (this.retrieveCountyPop(fips, last_year) - this.retrieveCountyPop(fips, first_year));
    }
    
    
    
    
  }

  
  
  return CMap;  // return constructor function
  
}
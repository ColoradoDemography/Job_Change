
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
    
    this.retrieveCountyBirths = function(fips, year){
      for(let i=0; i<data.length; i++){
        if(data[i].countyfips === fips && data[i].year === year){
          return Number(data[i].births);
        }
      }
      console.log('error: retrieveCountyBirths');
      return undefined;
    }
    
    this.retrieveCountyDeaths = function(fips, year){
      for(let i=0; i<data.length; i++){
        if(data[i].countyfips === fips && data[i].year === year){
          return Number(data[i].deaths);
        }
      }
      console.log('error: retrieveCountyDeaths');
      return undefined;
    }
    
    this.retrieveCountyNatInc = function(fips, year){
      for(let i=0; i<data.length; i++){
        if(data[i].countyfips === fips && data[i].year === year){
          return (Number(data[i].births) - Number(data[i].deaths));
        }
      }
      console.log('error: retrieveCountyNatInc');
      return undefined;
    }
    
    this.retrieveCountyBirthRate = function(fips, year){
      for(let i=0; i<data.length; i++){
        if(data[i].countyfips === fips && data[i].year === year){
          return (Number(data[i].births) / Number(data[i].estimate))*1000; 
        }
      }
      console.log('error: retrieveCountyBirthRates');
      return undefined;
    }
    
    this.retrieveCountyDeathRate = function(fips, year){
      for(let i=0; i<data.length; i++){
        if(data[i].countyfips === fips && data[i].year === year){
          return (Number(data[i].deaths) / Number(data[i].estimate))*1000; 
        }
      }
      console.log('error: retrieveCountyDeathRates');
      return undefined;
    }
    
    this.retrieveCountyNatIncRate = function(fips, year){
      for(let i=0; i<data.length; i++){
        if(data[i].countyfips === fips && data[i].year === year){
          return ((Number(data[i].births) - Number(data[i].deaths)) / Number(data[i].estimate));
        }
      }
      console.log('error: retrieveCountyNatIncRate');
      return undefined;
    }
    
    
    this.retrieveCountyMigration = function(fips, year){
      for(let i=0; i<data.length; i++){
        if(data[i].countyfips === fips && data[i].year === year){
          return Number(data[i].netmig);
        }
      }
      console.log('error: retrieveCountyMigration');
      return undefined;
    }
    
    this.retrieveTtlPopChg = function(fips){
      return (this.retrieveCountyPop(fips, last_year) - this.retrieveCountyPop(fips, first_year));
    }
    
    this.retrievePctPopChg = function(fips){
      return (( this.retrieveTtlPopChg(fips) / this.retrieveCountyPop(fips, first_year) )*100).toFixed(2);
    }
    
    this.retrieveTtlBirths = function(fips){
      var running_total_births = 0;
      for(let j=(first_year+1); j<(last_year+1); j++){
        running_total_births += this.retrieveCountyBirths(fips, j);
      }
      return running_total_births;
    }
    
    this.retrieveTtlDeaths = function(fips){
      var running_total_deaths = 0;
      for(let j=(first_year+1); j<(last_year+1); j++){
        running_total_deaths += this.retrieveCountyDeaths(fips, j);
      }
      return running_total_deaths;
    }
    
    this.retrieveNatIncrease = function(fips){
      return ( this.retrieveTtlBirths(fips) - this.retrieveTtlDeaths(fips) );
    }    
    
    this.retrieveTtlMigration = function(fips){
      var running_total_migration = 0;
      for(let j=(first_year+1); j<(last_year+1); j++){
        running_total_migration += this.retrieveCountyMigration(fips, j);
      }
      return running_total_migration;
    }    
    
    this.retrieveAvgPopChg = function(fips){
      return ( this.retrieveTtlPopChg(fips) / number_of_years );
    }        
    
    this.retrieveAvgPctPopChg = function(fips){
      return (Math.pow((this.retrieveCountyPop(fips, last_year) / this.retrieveCountyPop(fips, first_year)),(1/number_of_years)))-1;
    }      
    
    this.retrieveBirthRate = function(fips){
      var running_total = 0;
      for(let j=(first_year+1); j<(last_year+1); j++){
        running_total += this.retrieveCountyBirthRate(fips, j);
      }
      return (running_total / number_of_years).toFixed(1);
    }            
    
    this.retrieveDeathRate = function(fips){
      var running_total = 0;
      for(let j=(first_year+1); j<(last_year+1); j++){
        running_total += this.retrieveCountyDeathRate(fips, j);
      }
      return (running_total / number_of_years).toFixed(1);
    }        
     
    this.retrieveAvgAnnualGrowthRate = function(fips){
      var running_total = 0;
      for(let j=(first_year+1); j<(last_year+1); j++){
        running_total += this.retrieveCountyNatIncRate(fips, j);
      }
      return ((running_total / number_of_years)*100).toFixed(2);
    }  
    
    
    
    
    
    
  }

  
  
  return CMap;  // return constructor function
  
}
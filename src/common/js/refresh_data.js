var fetchJSONFile = require("./fetch_json.js");
var CMap = require("./init_object.js")();
var getUserInputs = require("./get_from_dom.js");

var symbology = require("./symbology.js");


module.exports = function(geolayer) {

    // string_output[0] = comma delimited years  
    // string_output[1] = selected stat
    var string_output = getUserInputs();

    fetchJSONFile('https://gis.dola.colorado.gov/lookups/components?year=' + string_output[0] + '&county=1,3,5,7,9,11,13,14,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125', function(data) {

        var cMap = new CMap(data);


        console.log(cMap.data);
        console.log("first_year: " + cMap.first_year);
        console.log("last_year: " + cMap.last_year);
        console.log("number_of_years: " + cMap.number_of_years);
        console.log("Adams Pop Estimate 1970: " + cMap.retrieveCountyPop(1, 1970));
        console.log('PopChgAdams: ' + cMap.retrieveTtlPopChg(1));
        console.log('PctPopChg: ' + cMap.retrievePctPopChg(1));
        console.log('TtlBirths: ' + cMap.retrieveTtlBirths(1));
        console.log('TtlDeaths: ' + cMap.retrieveTtlDeaths(1));
        console.log('NaturalIncrease: ' + cMap.retrieveNatIncrease(1));
        console.log('Net Migration: ' + cMap.retrieveTtlMigration(1));
        console.log('Avg Pop Chg: ' + cMap.retrieveAvgPopChg(1));
        console.log('avg pct pop chg: ' + cMap.retrieveAvgPctPopChg(1));
        console.log('adams birth rate: ' + cMap.retrieveCountyBirthRate(1, 1970));
        console.log('adams birth rateTtl: ' + cMap.retrieveBirthRate(1));
        console.log('adams death rate: ' + cMap.retrieveCountyDeathRate(1, 1970));
        console.log('adams death rateTtl: ' + cMap.retrieveDeathRate(1));
        console.log('rate of natural increase: ' + cMap.retrieveRateNaturalIncrease(1));
        console.log('migration rate: ' + cMap.retrieveMigrationRate(1));

        //symbolize layer
        symbology(geolayer, cMap, string_output[1]);

    });



}
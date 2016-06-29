var CMap = require("./init_object.js")();
var getUserInputs = require("./get_from_dom.js");
var filterData = require("./filter_data.js");

module.exports = function(e, worker_data, map) {


    // string_output[0] = comma delimited years  
    // string_output[1] = selected stat
    var string_output = getUserInputs();


    filterData(worker_data, string_output[0], function(data) {

        var cMap = new CMap(data);
        var info_html = "<h2>" + e.target.feature.properties.NAME + " County</h2><br /><table>";

        var fips = parseInt(e.target.feature.properties.COUNTYFP, 10);


        //  -        console.log('PopChgAdams: ' + cMap.retrieveTtlPopChg(1));		
        //  -        console.log('PctPopChg: ' + cMap.retrievePctPopChg(1));		
        //  -        console.log('TtlBirths: ' + cMap.retrieveTtlBirths(1));		
        //  -        console.log('TtlDeaths: ' + cMap.retrieveTtlDeaths(1));		
        //  -        console.log('NaturalIncrease: ' + cMap.retrieveNatIncrease(1));		
        //  -        console.log('Net Migration: ' + cMap.retrieveTtlMigration(1));		
        //  -        console.log('Avg Pop Chg: ' + cMap.retrieveAvgPopChg(1));		
        //  -        console.log('avg pct pop chg: ' + cMap.retrieveAvgPctPopChg(1));		
        //  -        console.log('adams birth rate: ' + cMap.retrieveCountyBirthRate(1, 1970));		
        //  -        console.log('adams birth rateTtl: ' + cMap.retrieveBirthRate(1));		
        //  -        console.log('adams death rate: ' + cMap.retrieveCountyDeathRate(1, 1970));		
        //  -        console.log('adams death rateTtl: ' + cMap.retrieveDeathRate(1));		
        //  -        console.log('rate of natural increase: ' + cMap.retrieveRateNaturalIncrease(1));		
        //  -        console.log('migration rate: ' + cMap.retrieveMigrationRate(1));

        info_html += "<tr><td>Population " + cMap.first_year + ":</td><td>" + cMap.retrieveCountyPop(fips, cMap.first_year) + "</td><td></td></tr>";
        info_html += "<tr><td>Population " + cMap.last_year + ":</td><td>" + cMap.retrieveCountyPop(fips, cMap.last_year) + "</td><td></td></tr>";
        info_html += "<tr><td>Total Population Change:</td><td>" + cMap.retrieveTtlPopChg(fips) + "</td><td>" + cMap.retrievePctPopChg(1) + "</td></tr>";


        info_html += "</table>";

        console.log(info_html);

        map.openModal({
            content: info_html
        });

    });

}
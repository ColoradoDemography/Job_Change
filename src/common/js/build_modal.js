var CMap = require("./init_object.js")();
var getUserInputs = require("./get_from_dom.js");
var filterData = require("./filter_data.js");

module.exports = function(e, worker_data, map) {

    // string_output[0] = comma delimited years  
    // string_output[1] = selected stat
    var string_output = getUserInputs();


    filterData(worker_data, string_output[0], function(data) {

        var cMap = new CMap(data);
        var info_html = "<h2 style='text-align: center'>" + e.target.feature.properties.NAME + " County,&nbsp;&nbsp;" + cMap.first_year + " to " + cMap.last_year + "</h2><br /><table>";

        var fips = parseInt(e.target.feature.properties.COUNTYFP, 10);
      
        var emphasize = " style='font-weight: 900'";
      
        info_html += "<tr><th>Statistic</th><th style='text-align: right'>Value</th><th style='text-align: right'>Percent</th></tr>";
        info_html += "<tr><td>Population " + cMap.first_year + ":</td><td style='text-align: right'>" + parseInt(cMap.retrieveCountyPop(fips, cMap.first_year)).toLocaleString(undefined, {maximumFractionDigits: 0}) + "</td><td></td></tr>";
        info_html += "<tr><td>Population " + cMap.last_year + ":</td><td style='text-align: right'>" + parseInt(cMap.retrieveCountyPop(fips, cMap.last_year)).toLocaleString(undefined, {maximumFractionDigits: 0}) + "</td><td></td></tr>";
        info_html += "<tr" + ((string_output[1] === "1" || string_output[1] === "2") ? emphasize : "") + "><td>Total Population Change:</td><td style='text-align: right'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + cMap.retrieveTtlPopChg(fips).toLocaleString(undefined, {maximumFractionDigits: 0}) + "</td><td style='text-align: right'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + parseFloat(cMap.retrievePctPopChg(fips)).toLocaleString(undefined, {maximumFractionDigits: 1}) + " %</td></tr>";
        info_html += "<tr" + ((string_output[1] === "3" || string_output[1] === "4") ? emphasize : "") + "><td>Avg Population Change:</td><td style='text-align: right'>" + cMap.retrieveAvgPopChg(fips).toLocaleString(undefined, {maximumFractionDigits: 0}) + "</td><td style='text-align: right'>" + parseFloat(cMap.retrieveAvgPctPopChg(fips)).toLocaleString(undefined, {maximumFractionDigits: 1}) + " %</td></tr>";      
        info_html += "<tr" + ((string_output[1] === "9") ? emphasize : "") + "><td>Total Births:</td><td style='text-align: right'>" + cMap.retrieveTtlBirths(fips).toLocaleString(undefined, {maximumFractionDigits: 0}) + "</td><td></td></tr>";
        info_html += "<tr" + ((string_output[1] === "5") ? emphasize : "") + "><td>Birth Rate per 1,000 Pop:</td><td style='text-align: right'>" + cMap.retrieveBirthRate(fips).toLocaleString(undefined, {maximumFractionDigits: 1}) + "</td><td></td></tr>";      
        info_html += "<tr" + ((string_output[1] === "10") ? emphasize : "") + "><td>Total Deaths:</td><td style='text-align: right'>" + cMap.retrieveTtlDeaths(fips).toLocaleString(undefined, {maximumFractionDigits: 0}) + "</td><td></td></tr>";
        info_html += "<tr" + ((string_output[1] === "6") ? emphasize : "") + "><td>Death Rate per 1,000 Pop:</td><td style='text-align: right'>" + cMap.retrieveDeathRate(fips).toLocaleString(undefined, {maximumFractionDigits: 1}) + "</td><td></td></tr>";      
        info_html += "<tr" + ((string_output[1] === "11" || string_output[1] === "7") ? emphasize : "") + "><td>Total Natural Increase:</td><td style='text-align: right'>" + cMap.retrieveNatIncrease(fips).toLocaleString(undefined, {maximumFractionDigits: 0}) + "</td><td style='text-align: right'>" + cMap.retrieveRateNaturalIncrease(fips).toLocaleString(undefined, {maximumFractionDigits: 2}) + " %</td></tr>";
        info_html += "<tr" + ((string_output[1] === "12") ? emphasize : "") + "><td>Total Migration:</td><td style='text-align: right'>" + cMap.retrieveTtlMigration(fips).toLocaleString(undefined, {maximumFractionDigits: 0}) + "</td><td></td></tr>";
        info_html += "<tr" + ((string_output[1] === "8") ? emphasize : "") + "><td>Migration Rate per 1,000:&nbsp;&nbsp;&nbsp;</td><td style='text-align: right'>" + cMap.retrieveMigrationRate(fips).toLocaleString(undefined, {maximumFractionDigits: 1}) + "</td><td></td></tr>";


        info_html += "</table>";

        console.log(info_html);

        map.openModal({
            content: info_html
        });

    });

}
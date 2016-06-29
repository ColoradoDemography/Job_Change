var CMap = require("./init_object.js")();
var getUserInputs = require("./get_from_dom.js");
var filterData = require("./filter_data.js");
var symbology = require("./symbology.js");


module.exports = function(geolayer, main_data) {

    // string_output[0] = comma delimited years  
    // string_output[1] = selected stat
    var string_output = getUserInputs();


    filterData(main_data, string_output[0], function(data) {
        var cMap = new CMap(data);

        //symbolize layer
        symbology(geolayer, cMap, string_output[1]);
    });

}
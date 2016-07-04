var WaterfallObj = require("./init_waterfall_obj.js")();

module.exports = function(cMap, fips, title) {

    var waterfall_chart = require("./easy-d3-waterfall.js");

    var firstyear = cMap.first_year;
    var lastyear = cMap.last_year;

    var data = [];
    var numberformat = d3.format(",d");


    data.push({
        "x": firstyear,
        "class": 'total',
        "value": Number(cMap.retrieveCountyPop(fips, firstyear))
    });


    var min_array = [];

    for (let i = firstyear; i < lastyear; i++) {

        min_array.push(Number(cMap.retrieveCountyPop(fips, i)));

        data.push({
            "x": i + .25,
            "value": Number(cMap.retrieveCountyBirths(fips, i + 1)),
            "class": 'birth',
            "title": i + ' Births: ' + numberformat(Number(cMap.retrieveCountyBirths(fips, i + 1)))
        });
        data.push({
            "x": i + .5,
            "value": -Number(cMap.retrieveCountyDeaths(fips, i + 1)),
            "class": 'death',
            "title": i + ' Deaths: ' + numberformat(Number(cMap.retrieveCountyDeaths(fips, i + 1)))
        });
        data.push({
            "x": i + .75,
            "value": Number(cMap.retrieveCountyMigration(fips, i + 1)),
            "class": 'migration',
            "title": i + ' Migration: ' + numberformat(Number(cMap.retrieveCountyMigration(fips, i + 1)))
        });
        data.push({
            "x": i + 1,
            "value": 0,
            "class": 'total'
        });
    }

    min_array.push(Number(cMap.retrieveCountyPop(fips, lastyear)));

    var dataset_min = Math.min(...min_array);

    //leave some room
    dataset_min = parseInt(dataset_min * 0.85, 10);


    // Transform data (i.e., finding cumulative values and total) for easier charting
    var cumulative = 0;
    for (var i = 0; i < data.length; i++) {
        data[i].start = cumulative;

        cumulative += data[i].value;
        data[i].end = cumulative;

        if (data[i].class === 'total') {
            data[i].start = dataset_min;
            data[i].title = data[i].x + ' Population: ' + numberformat(parseInt(data[i].end));
        }

    }




    //modal chart
    var options = new WaterfallObj();
    options.title.text = title;

    //large chart for full-size screenshot
    var fulloptions = new WaterfallObj();

    fulloptions.chart.width = 800;
    fulloptions.chart.height = 600;
    fulloptions.title.text = title;

    var charta = waterfall_chart("#wf_chart", data, options);
    charta();

    var chartb = waterfall_chart("#full_chart", data, fulloptions);
    chartb();


}
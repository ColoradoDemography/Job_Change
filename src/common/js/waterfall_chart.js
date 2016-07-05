var WaterfallObj = require("./init_waterfall_obj.js")();

module.exports = function(cMap, fips, title) {

    var waterfall_chart = require("./easy-d3-waterfall.js");

    var firstyear = cMap.first_year;
    var lastyear = cMap.last_year;

    var data = [];
    var numberformat = d3.format(",.0f");



    var agg_years = 1;
    if ((lastyear - firstyear) > 10) {
        agg_years = 2;
    }
    if ((lastyear - firstyear) > 20) {
        agg_years = 3;
    }
    if ((lastyear - firstyear) > 30) {
        agg_years = 4;
    }
    if ((lastyear - firstyear) > 40) {
        agg_years = 5;
    }


    //initial value
    data.push({
        "x": firstyear,
        "class": 'total',
        "value": Number(cMap.retrieveCountyPop(fips, firstyear)),
        "title": firstyear + ' Population: ' + numberformat(Number(cMap.retrieveCountyPop(fips, firstyear))),
        "barscale": agg_years
    });


    function find_barscale(i) {
        let est = i + agg_years;
        let barscale = agg_years;
        if (est > lastyear) {
            barscale = agg_years - (est - lastyear);
        }
        return barscale;
    }

    function find_x_value(i, bar_fraction) {
        let est = i + (1 * agg_years);
        let x_pos = i + (bar_fraction * agg_years);
        if (est > lastyear) {
            x_pos = i + ((agg_years - (est - lastyear)) * bar_fraction);
        }
        return x_pos;
    }

    var birth_aggr_ttl = function(i) {
        let running_total = 0;
        for (let j = i + 1; j <= (i + agg_years); j++) {
            running_total += Number(cMap.retrieveCountyBirths(fips, j));
        }
        return running_total;
    };

    var death_aggr_ttl = function(i) {
        let running_total = 0;
        for (let j = i + 1; j <= (i + agg_years); j++) {
            running_total += Number(cMap.retrieveCountyDeaths(fips, j));
        }
        return running_total;
    };

    var migration_aggr_ttl = function(i) {
        let running_total = 0;
        for (let j = i + 1; j <= (i + agg_years); j++) {
            running_total += Number(cMap.retrieveCountyMigration(fips, j));
        }
        return running_total;
    };

    var year_range = function(i) {
        if (agg_years === 1) {
            return i;
        }
        let est = i + (1 * agg_years);
        if (est > lastyear) {
            if (i === (lastyear - 1)) {
                return i;
            } else {
                return i + " - " + (lastyear - 1);
            }
        }
        return i + " - " + (est - 1);
    }

    for (let i = firstyear; i < lastyear; i = i + agg_years) {

        data.push({
            "x": find_x_value(i, 0.25),
            "value": birth_aggr_ttl(i),
            "class": 'birth',
            "title": year_range(i) + ' Births: ' + numberformat(birth_aggr_ttl(i)),
            "barscale": find_barscale(i)
        });
        data.push({
            "x": find_x_value(i, 0.5),
            "value": death_aggr_ttl(i),
            "class": 'death',
            "title": year_range(i) + ' Deaths: ' + numberformat(death_aggr_ttl(i)),
            "barscale": find_barscale(i)
        });
        data.push({
            "x": find_x_value(i, 0.75),
            "value": migration_aggr_ttl(i),
            "class": 'migration',
            "title": year_range(i) + ' Migration: ' + numberformat(migration_aggr_ttl(i)),
            "barscale": find_barscale(i)
        });

        //pushing total calculations are custom
        data.push({
            "x": (function() {
                let est = i + (1 * agg_years);
                if (est > lastyear) {
                    est = lastyear;
                }
                return est;
            }()),
            "value": 0,
            "class": 'total',
            "title": (function() {
                let est = i + (1 * agg_years);
                if (est > lastyear) {
                    return lastyear + ' Population: ' + numberformat(Number(cMap.retrieveCountyPop(fips, lastyear)));
                } else {
                    return (i + (1 * agg_years)) + ' Population: ' + numberformat(Number(cMap.retrieveCountyPop(fips, (i + (1 * agg_years)))));
                }
            }()),
            "barscale": (function() {
                let est = i + agg_years;
                let barscale = agg_years;
                if (est > lastyear) {
                    barscale = agg_years - (est - lastyear);
                } else {
                    if ((est + agg_years) > lastyear) {
                        barscale = lastyear - est;
                        if (barscale === 0) {
                            barscale = agg_years;
                        }
                    }
                }
                return barscale;
            }())
        });
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
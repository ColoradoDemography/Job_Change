var redraw_legend = require("./redraw_legend.js");

module.exports = function(geolayer, cMap, num) {

    var max;
    var min;
    var median;
    var spreadl;
    var spreadh;
    var breaks = [];

    if (num === "1") {
        max = cMap.getMaxPctChange();
        min = cMap.getMinPctChange();
        breaks = [min * 0.5, min * 0.35, min * 0.2, min * 0.1, 0, max * 0.1, max * 0.2, max * 0.35, max * 0.5, max * 0.75];
        if (min > 0) {
            min = -max;
        }
    }
    if (num === "2") {
        max = cMap.getMaxTtlChange();
        min = cMap.getMinTtlChange();
        breaks = [min * 0.4, min * 0.25, min * 0.1, min * 0.05, 0, max * 0.05, max * 0.1, max * 0.2, max * 0.35, max * 0.5];
        if (min > 0) {
            min = -max;
        }
    }
    if (num === "3") {
        max = cMap.getMaxAvgPctPopChg();
        min = cMap.getMinAvgPctPopChg();
        breaks = [min * 0.5, min * 0.35, min * 0.2, min * 0.1, 0, max * 0.1, max * 0.2, max * 0.35, max * 0.5, max * 0.75];
        if (min > 0) {
            min = -max;
        }
    }
    if (num === "4") {
        max = cMap.getMaxAvgPopChg();
        min = cMap.getMinAvgPopChg();
        breaks = [-2000, -1000, -500, -200, 0, 200, 500, 2000, 5000, 10000];
        if (min > 0) {
            min = -max;
        }
    }
    if (num === "5") {
        max = cMap.getMaxBirthRate();
        min = cMap.getMinBirthRate();
        median = cMap.getMedianBirthRate();
        spreadl = median - min;
        spreadh = max - median;
        breaks = [(min + spreadl * (2 / 5)), (min + spreadl * (3 / 5)), (min + spreadl * (4 / 5)), (min + spreadl * (9 / 10)), median, (median + spreadh * (1 / 12)), (median + spreadh * (1 / 6)), (median + spreadh * (2 / 6)), (median + spreadh * (3 / 6)), (median + spreadh * (4 / 6))];
    }
    if (num === "6") {
        max = cMap.getMaxDeathRate();
        min = cMap.getMinDeathRate();
        median = cMap.getMedianDeathRate();
        spreadl = median - min;
        spreadh = max - median;
        breaks = [(min + spreadl * (2 / 5)), (min + spreadl * (3 / 5)), (min + spreadl * (4 / 5)), (min + spreadl * (9 / 10)), median, (median + spreadh * (1 / 12)), (median + spreadh * (1 / 6)), (median + spreadh * (2 / 6)), (median + spreadh * (3 / 6)), (median + spreadh * (4 / 6))];
    }
    if (num === "7") {
        max = cMap.getMaxRateNaturalIncrease();
        min = cMap.getMinRateNaturalIncrease();
        breaks = [min * 0.5, min * 0.35, min * 0.2, min * 0.1, 0, max * 0.1, max * 0.2, max * 0.35, max * 0.5, max * 0.75];
    }
    if (num === "8") {
        max = cMap.getMaxMigrationRate();
        min = cMap.getMinMigrationRate();
        breaks = [min * 0.5, min * 0.35, min * 0.2, min * 0.1, 0, max * 0.1, max * 0.2, max * 0.35, max * 0.5, max * 0.75];
        if (min > 0) {
            min = -max;
        }
    }
    if (num === "9") {
        max = cMap.getMaxTtlBirths();
        min = cMap.getMinTtlBirths();
        median = cMap.getMedianTotalBirths();
        spreadl = median - min;
        spreadh = max - median;
        breaks = [(min + spreadl * (2 / 5)), (min + spreadl * (3 / 5)), (min + spreadl * (4 / 5)), (min + spreadl * (9 / 10)), median, (median + spreadh * (1 / 12)), (median + spreadh * (1 / 6)), (median + spreadh * (2 / 6)), (median + spreadh * (3 / 6)), (median + spreadh * (4 / 6))];
    }
    if (num === "10") {
        max = cMap.getMaxTtlDeaths();
        min = cMap.getMinTtlDeaths();
        median = cMap.getMedianTotalDeaths();
        spreadl = median - min;
        spreadh = max - median;
        breaks = [(min + spreadl * (2 / 5)), (min + spreadl * (3 / 5)), (min + spreadl * (4 / 5)), (min + spreadl * (9 / 10)), median, (median + spreadh * (1 / 12)), (median + spreadh * (1 / 6)), (median + spreadh * (2 / 6)), (median + spreadh * (3 / 6)), (median + spreadh * (4 / 6))];
    }
    if (num === "11") {
        max = cMap.getMaxNatIncrease();
        min = cMap.getMinNatIncrease();
        breaks = [min * 0.5, min * 0.35, min * 0.2, min * 0.1, 0, max * 0.1, max * 0.2, max * 0.35, max * 0.5, max * 0.75];
    }
    if (num === "12") {
        max = cMap.getMaxTtlMigration();
        min = cMap.getMinTtlMigration();
        breaks = [min * 0.5, min * 0.35, min * 0.2, min * 0.1, 0, max * 0.1, max * 0.2, max * 0.35, max * 0.5, max * 0.75];
    }



    redraw_legend(min, max, num, breaks);



    geolayer.setStyle(function(d) {

        var value;
        var fips = parseInt(d.properties.COUNTYFP);

        if (num === "1") {
            value = cMap.retrievePctPopChg(fips);
        }
        if (num === "2") {
            value = cMap.retrieveTtlPopChg(fips);
        }
        if (num === "3") {
            value = cMap.retrieveAvgPctPopChg(fips);
        }
        if (num === "4") {
            value = cMap.retrieveAvgPopChg(fips);
        }
        if (num === "5") {
            value = cMap.retrieveBirthRate(fips);
        }
        if (num === "6") {
            value = cMap.retrieveDeathRate(fips);
        }
        if (num === "7") {
            value = cMap.retrieveRateNaturalIncrease(fips);
        }
        if (num === "8") {
            value = cMap.retrieveMigrationRate(fips);
        }
        if (num === "9") {
            value = cMap.retrieveTtlBirths(fips);
        }
        if (num === "10") {
            value = cMap.retrieveTtlDeaths(fips);
        }
        if (num === "11") {
            value = cMap.retrieveNatIncrease(fips);
        }
        if (num === "12") {
            value = cMap.retrieveTtlMigration(fips);
        }



        if ((value > (-Infinity)) && (value <= breaks[0])) {
            return {
                weight: 1,
                color: "grey",
                fillOpacity: 0.5,
                fillColor: "rgb(49, 54, 149)"
            };
        }
        if ((value > breaks[0]) && (value <= breaks[1])) {
            return {
                weight: 1,
                color: "grey",
                fillOpacity: 0.5,
                fillColor: "rgb(69, 117, 180)"
            };
        }
        if ((value > breaks[1]) && (value <= breaks[2])) {
            return {
                weight: 1,
                color: "grey",
                fillOpacity: 0.5,
                fillColor: "rgb(116, 173, 209)"
            };
        }
        if ((value > breaks[2]) && (value <= breaks[3])) {
            return {
                weight: 1,
                color: "grey",
                fillOpacity: 0.5,
                fillColor: "rgb(171, 217, 233)"
            };
        }
        if ((value > breaks[3]) && (value <= breaks[4])) {
            return {
                weight: 1,
                color: "grey",
                fillOpacity: 0.5,
                fillColor: "rgb(224, 243, 248)"
            };
        }
        if ((value > breaks[4]) && (value <= breaks[5])) {
            return {
                weight: 1,
                color: "grey",
                fillOpacity: 0.5,
                fillColor: "rgb(255, 255, 191)"
            };
        }
        if ((value > breaks[5]) && (value <= breaks[6])) {
            return {
                weight: 1,
                color: "grey",
                fillOpacity: 0.5,
                fillColor: "rgb(254, 224, 144)"
            };
        }
        if ((value > breaks[6]) && (value <= breaks[7])) {
            return {
                weight: 1,
                color: "grey",
                fillOpacity: 0.5,
                fillColor: "rgb(253, 174, 97)"
            };
        }
        if ((value > breaks[7]) && (value <= breaks[8])) {
            return {
                weight: 1,
                color: "grey",
                fillOpacity: 0.5,
                fillColor: "rgb(244, 109, 67)"
            };
        }
        if ((value > breaks[8]) && (value <= breaks[9])) {
            return {
                weight: 1,
                color: "grey",
                fillOpacity: 0.5,
                fillColor: "rgb(215, 48, 39)"
            };
        }
        if ((value > breaks[9]) && (value <= Infinity)) {
            return {
                weight: 1,
                color: "grey",
                fillOpacity: 0.5,
                fillColor: "rgb(165, 0, 38)"
            };
        }

        return {
            weight: 13,
            color: "blue",
            fillOpacity: 0
        }; //hey you; there's a problem

    });




}
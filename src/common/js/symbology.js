module.exports = function(geolayer, cMap, num) {

    var max;
    var min;


    if (num === "1") {
        max = cMap.getMaxPctChange();
        min = cMap.getMinPctChange();
    }
    if (num === "2") {
        max = cMap.getMaxTtlChange();
        min = cMap.getMinTtlChange();
    }
    if (num === "3") {
        max = cMap.getMaxAvgPctPopChg();
        min = cMap.getMinAvgPctPopChg();
    }
    if (num === "4") {
        max = cMap.getMaxAvgPopChg();
        min = cMap.getMinAvgPopChg();
    }
    if (num === "5") {
        max = cMap.getMaxBirthRate();
        min = cMap.getMinBirthRate();
    }
    if (num === "6") {
        max = cMap.getMaxDeathRate();
        min = cMap.getMinDeathRate();
    }
    if (num === "7") {
        max = cMap.getMaxRateNaturalIncrease();
        min = cMap.getMinRateNaturalIncrease();
    }
    if (num === "8") {
        max = cMap.getMaxMigrationRate();
        min = cMap.getMinMigrationRate();
    }
    if (num === "9") {
        max = cMap.getMaxTtlBirths();
        min = cMap.getMinTtlBirths();
    }
    if (num === "10") {
        max = cMap.getMaxTtlDeaths();
        min = cMap.getMinTtlDeaths();
    }
    if (num === "11") {
        max = cMap.getMaxNatIncrease();
        min = cMap.getMinNatIncrease();
    }
    if (num === "12") {
        max = cMap.getMaxTtlMigration();
        min = cMap.getMinTtlMigration();
    }


    if (min > 0) {
        min = -max;
    }

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

        if (value > (-Infinity) && value <= (min * 0.5)) {
            return {
                weight: 1,
                color: "grey",
                fillOpacity: 0.5,
                fillColor: "rgb(49, 54, 149)"
            };
        }
        if (value > (min * 0.5) && value <= (min * 0.35)) {
            return {
                weight: 1,
                color: "grey",
                fillOpacity: 0.5,
                fillColor: "rgb(69, 117, 180)"
            };
        }
        if (value > (min * 0.35) && value <= (min * 0.2)) {
            return {
                weight: 1,
                color: "grey",
                fillOpacity: 0.5,
                fillColor: "rgb(116, 173, 209)"
            };
        }
        if (value > (min * 0.2) && value <= (min * 0.1)) {
            return {
                weight: 1,
                color: "grey",
                fillOpacity: 0.5,
                fillColor: "rgb(171, 217, 233)"
            };
        }
        if (value > (min * 0.1) && value <= (min * 0)) {
            return {
                weight: 1,
                color: "grey",
                fillOpacity: 0.5,
                fillColor: "rgb(224, 243, 248)"
            };
        }
        if (value > (min * 0) && value <= (max * 0.1)) {
            return {
                weight: 1,
                color: "grey",
                fillOpacity: 0.5,
                fillColor: "rgb(255, 255, 191)"
            };
        }
        if (value > (max * 0.1) && value <= (max * 0.2)) {
            return {
                weight: 1,
                color: "grey",
                fillOpacity: 0.5,
                fillColor: "rgb(254, 224, 144)"
            };
        }
        if (value > (max * 0.2) && value <= (max * 0.35)) {
            return {
                weight: 1,
                color: "grey",
                fillOpacity: 0.5,
                fillColor: "rgb(253, 174, 97)"
            };
        }
        if (value > (max * 0.35) && value <= (max * 0.5)) {
            return {
                weight: 1,
                color: "grey",
                fillOpacity: 0.5,
                fillColor: "rgb(244, 109, 67)"
            };
        }
        if (value > (max * 0.5) && value <= (max * 0.75)) {
            return {
                weight: 1,
                color: "grey",
                fillOpacity: 0.5,
                fillColor: "rgb(215, 48, 39)"
            };
        }
        if (value > (max * 0.75) && value <= (Infinity)) {
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
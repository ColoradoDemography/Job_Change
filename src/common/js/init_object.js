//will assume incoming data includes all counties.  countyfips=1 will be used for all data breadth calcs

module.exports = function() {

    var CMap = function(data) {

        var fips_array = [1, 3, 5, 7, 9, 11, 13, 14, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99, 101, 103, 105, 107, 109, 111, 113, 115, 117, 119, 121, 123, 125];

        this.data = data;

        var first_year = function() {
            var low_year_value = 5000;
            for (let i = 0; i < data.length; i++) {
                if (data[i].population_year < low_year_value) {
                    low_year_value = data[i].population_year;
                }
            }
            return low_year_value;
        }();
        this.first_year = first_year;

        var last_year = function() {
            var high_year_value = 0;
            for (let i = 0; i < data.length; i++) {
                if (data[i].population_year > high_year_value) {
                    high_year_value = data[i].population_year;
                }
            }
            return high_year_value;
        }();
        this.last_year = last_year;

        var number_of_years = function() {
            return (last_year - first_year);
        }();
        this.number_of_years = number_of_years;


        /* POPULATION */

        this.retrieveCountyPop = function(fips, year) {
            var agepop = 0;
            for (let i = 0; i < data.length; i++) {
                if (data[i].countyfips === fips && data[i].population_year === year) {
                    agepop = agepop + parseInt(data[i].totaljobs);
                }
            }
            return agepop;
        }

        this.retrieveTtlPopChg = function(fips) {
            return (this.retrieveCountyPop(fips, last_year) - this.retrieveCountyPop(fips, first_year));
        }

        this.getMaxTtlChange = function() {
            var max_value = -Infinity;
            for (let i = 0; i < fips_array.length; i++) {
                var current_county = (this.retrieveCountyPop(fips_array[i], last_year) - this.retrieveCountyPop(fips_array[i], first_year));
                if (current_county > max_value) {
                    max_value = current_county;
                }
            }
            return max_value;
        }

        this.getMinTtlChange = function() {
            var min_value = Infinity;
            for (let i = 0; i < fips_array.length; i++) {
                var current_county = (this.retrieveCountyPop(fips_array[i], last_year) - this.retrieveCountyPop(fips_array[i], first_year));
                if (current_county < min_value) {
                    min_value = current_county;
                }
            }
            return min_value;
        }

        this.getMaxTtl = function() {
            var max_value = -Infinity;
            for (let i = 0; i < fips_array.length; i++) {
                var current_county = this.retrieveCountyPop(fips_array[i], first_year);
                if (current_county > max_value) {
                    max_value = current_county;
                }
            }
            return max_value;
        }

        this.getMinTtl = function() {
            var min_value = Infinity;
            for (let i = 0; i < fips_array.length; i++) {
                var current_county = this.retrieveCountyPop(fips_array[i], first_year);
                if (current_county < min_value) {
                    min_value = current_county;
                }
            }
            return min_value;
        }

        this.retrieveAvgPopChg = function(fips) {
            return (this.retrieveTtlPopChg(fips) / number_of_years);
        }


        this.getMaxAvgPopChg = function() {
            var max_value = -Infinity;
            for (let i = 0; i < fips_array.length; i++) {
                var current_county = parseFloat(this.retrieveAvgPopChg(fips_array[i]));
                if (current_county > max_value) {
                    max_value = current_county;
                }
            }
            return max_value;
        }

        this.getMinAvgPopChg = function() {
            var min_value = Infinity;
            for (let i = 0; i < fips_array.length; i++) {
                var current_county = parseFloat(this.retrieveAvgPopChg(fips_array[i]));
                if (current_county < min_value) {
                    min_value = current_county;
                }
            }
            return min_value;
        }
        
        this.getMedianTotalPop = function() {
            var values = [];
            for (let i = 0; i < fips_array.length; i++) {
                var current_county = parseFloat(this.retrieveTtlPop(fips_array[i]));
                values.push(current_county);
            }

            values.sort(function(a, b) {
                return a - b;
            });

            var half = Math.floor(values.length / 2);
            if (values.length % 2)
                return values[half];
            else
                return (values[half - 1] + values[half]) / 2.0;
        }

        /* PERCENT POPULATION */

        this.retrievePctPopChg = function(fips) {
            var pctpopchg = ((this.retrieveTtlPopChg(fips) / this.retrieveCountyPop(fips, first_year)) * 100).toFixed(2);
            if (isFinite(pctpopchg)) {
                return pctpopchg;
            } else {
                return 0;
            }
        }

        this.getMaxPctChange = function() {
            var max_value = -Infinity;
            for (let i = 0; i < fips_array.length; i++) {
                var current_county = parseFloat(this.retrievePctPopChg(fips_array[i]));
                if (current_county > max_value) {
                    max_value = current_county;
                }
            }
            return max_value;
        }

        this.getMinPctChange = function() {
            var min_value = Infinity;
            for (let i = 0; i < fips_array.length; i++) {
                var current_county = parseFloat(this.retrievePctPopChg(fips_array[i]));
                if (current_county < min_value) {
                    min_value = current_county;
                }
            }
            return min_value;
        }


        this.retrieveAvgPctPopChg = function(fips) {
            var calc = (((Math.pow((this.retrieveCountyPop(fips, last_year) / this.retrieveCountyPop(fips, first_year)), (1 / number_of_years))) - 1) * 100).toFixed(2);
            if (isFinite(calc)) {
                return calc;
            } else {
                return 0;
            }
        }

        this.getMaxAvgPctPopChg = function() {
            var max_value = -Infinity;
            for (let i = 0; i < fips_array.length; i++) {
                var current_county = parseFloat(this.retrieveAvgPctPopChg(fips_array[i]));
                if (current_county > max_value) {
                    max_value = current_county;
                }
            }
            return max_value;
        }

        this.getMinAvgPctPopChg = function() {
            var min_value = Infinity;
            for (let i = 0; i < fips_array.length; i++) {
                var current_county = parseFloat(this.retrieveAvgPctPopChg(fips_array[i]));
                if (current_county < min_value) {
                    min_value = current_county;
                }
            }
            return min_value;
        }

        // /* BIRTHS */

        // this.retrieveCountyBirths = function(fips, year) {
        //     for (let i = 0; i < data.length; i++) {
        //         if (data[i].countyfips === fips && data[i].population_year === year) {
        //             return Number(data[i].births);
        //         }
        //     }
        //     return 0;
        // }


        // this.retrieveCountyBirthRate = function(fips, year) {
        //     for (let i = 0; i < data.length; i++) {
        //         if (data[i].countyfips === fips && data[i].population_year === year) {
        //             return (Number(data[i].births) / Number(data[i].totaljobs)) * 1000;
        //         }
        //     }
        //     return 0;
        // }

        // this.retrieveTtlBirths = function(fips) {
        //     var running_total_births = 0;
        //     for (let j = (first_year + 1); j < (last_year + 1); j++) {
        //         running_total_births += this.retrieveCountyBirths(fips, j);
        //     }
        //     return running_total_births;
        // }

        // this.getMaxTtlBirths = function() {
        //     var max_value = -Infinity;
        //     for (let i = 0; i < fips_array.length; i++) {
        //         var current_county = this.retrieveTtlBirths(fips_array[i]);
        //         if (current_county > max_value) {
        //             max_value = current_county;
        //         }
        //     }
        //     return max_value;
        // }

        // this.getMinTtlBirths = function() {
        //     var min_value = Infinity;
        //     for (let i = 0; i < fips_array.length; i++) {
        //         var current_county = this.retrieveTtlBirths(fips_array[i]);
        //         if (current_county < min_value) {
        //             min_value = current_county;
        //         }
        //     }
        //     return min_value;
        // }


        // this.getMedianTotalBirths = function() {
        //     var values = [];
        //     for (let i = 0; i < fips_array.length; i++) {
        //         var current_county = parseFloat(this.retrieveTtlBirths(fips_array[i]));
        //         values.push(current_county);
        //     }

        //     values.sort(function(a, b) {
        //         return a - b;
        //     });

        //     var half = Math.floor(values.length / 2);
        //     if (values.length % 2)
        //         return values[half];
        //     else
        //         return (values[half - 1] + values[half]) / 2.0;
        // }

        // this.retrieveBirthRate = function(fips) {
        //     var running_total = 0;
        //     for (let j = (first_year + 1); j < (last_year + 1); j++) {
        //         running_total += this.retrieveCountyBirthRate(fips, j);
        //     }
        //     return (running_total / number_of_years).toFixed(1);
        // }

        // this.getMaxBirthRate = function() {
        //     var max_value = -Infinity;
        //     for (let i = 0; i < fips_array.length; i++) {
        //         var current_county = parseFloat(this.retrieveBirthRate(fips_array[i]));
        //         if (current_county > max_value) {
        //             max_value = current_county;
        //         }
        //     }
        //     return max_value;
        // }

        // this.getMinBirthRate = function() {
        //     var min_value = Infinity;
        //     for (let i = 0; i < fips_array.length; i++) {
        //         var current_county = parseFloat(this.retrieveBirthRate(fips_array[i]));
        //         if (current_county < min_value) {
        //             min_value = current_county;
        //         }
        //     }
        //     return min_value;
        // }

        // this.getMedianBirthRate = function() {
        //     var values = [];
        //     for (let i = 0; i < fips_array.length; i++) {
        //         var current_county = parseFloat(this.retrieveBirthRate(fips_array[i]));
        //         values.push(current_county);
        //     }

        //     values.sort(function(a, b) {
        //         return a - b;
        //     });

        //     var half = Math.floor(values.length / 2);
        //     if (values.length % 2)
        //         return values[half];
        //     else
        //         return (values[half - 1] + values[half]) / 2.0;
        // }


        // /* DEATHS */


        // this.retrieveCountyDeaths = function(fips, year) {
        //     for (let i = 0; i < data.length; i++) {
        //         if (data[i].countyfips === fips && data[i].population_year === year) {
        //             return Number(data[i].deaths);
        //         }
        //     }
        //     return 0;
        // }


        // this.retrieveCountyDeathRate = function(fips, year) {
        //     for (let i = 0; i < data.length; i++) {
        //         if (data[i].countyfips === fips && data[i].population_year === year) {
        //             return (Number(data[i].deaths) / Number(data[i].totaljobs)) * 1000;
        //         }
        //     }
        //     return 0;
        // }

        // this.retrieveTtlDeaths = function(fips) {
        //     var running_total_deaths = 0;
        //     for (let j = (first_year + 1); j < (last_year + 1); j++) {
        //         running_total_deaths += this.retrieveCountyDeaths(fips, j);
        //     }
        //     return running_total_deaths;
        // }


        // this.getMaxTtlDeaths = function() {
        //     var max_value = -Infinity;
        //     for (let i = 0; i < fips_array.length; i++) {
        //         var current_county = this.retrieveTtlDeaths(fips_array[i]);
        //         if (current_county > max_value) {
        //             max_value = current_county;
        //         }
        //     }
        //     return max_value;
        // }

        // this.getMinTtlDeaths = function() {
        //     var min_value = Infinity;
        //     for (let i = 0; i < fips_array.length; i++) {
        //         var current_county = this.retrieveTtlDeaths(fips_array[i]);
        //         if (current_county < min_value) {
        //             min_value = current_county;
        //         }
        //     }
        //     return min_value;
        // }

        // this.getMedianTotalDeaths = function() {
        //     var values = [];
        //     for (let i = 0; i < fips_array.length; i++) {
        //         var current_county = parseFloat(this.retrieveTtlDeaths(fips_array[i]));
        //         values.push(current_county);
        //     }

        //     values.sort(function(a, b) {
        //         return a - b;
        //     });

        //     var half = Math.floor(values.length / 2);
        //     if (values.length % 2)
        //         return values[half];
        //     else
        //         return (values[half - 1] + values[half]) / 2.0;
        // }

        // this.retrieveDeathRate = function(fips) {
        //     var running_total = 0;
        //     for (let j = (first_year + 1); j < (last_year + 1); j++) {
        //         running_total += this.retrieveCountyDeathRate(fips, j);
        //     }
        //     return (running_total / number_of_years).toFixed(1);
        // }

        // this.getMaxDeathRate = function() {
        //     var max_value = -Infinity;
        //     for (let i = 0; i < fips_array.length; i++) {
        //         var current_county = parseFloat(this.retrieveDeathRate(fips_array[i]));
        //         if (current_county > max_value) {
        //             max_value = current_county;
        //         }
        //     }
        //     return max_value;
        // }

        // this.getMinDeathRate = function() {
        //     var min_value = Infinity;
        //     for (let i = 0; i < fips_array.length; i++) {
        //         var current_county = parseFloat(this.retrieveDeathRate(fips_array[i]));
        //         if (current_county < min_value) {
        //             min_value = current_county;
        //         }
        //     }
        //     return min_value;
        // }

        // this.getMedianDeathRate = function() {
        //     var values = [];
        //     for (let i = 0; i < fips_array.length; i++) {
        //         var current_county = parseFloat(this.retrieveDeathRate(fips_array[i]));
        //         values.push(current_county);
        //     }

        //     values.sort(function(a, b) {
        //         return a - b;
        //     });

        //     var half = Math.floor(values.length / 2);
        //     if (values.length % 2)
        //         return values[half];
        //     else
        //         return (values[half - 1] + values[half]) / 2.0;
        // }

        // /* NATURAL INCREASE  */
        // this.retrieveCountyNatInc = function(fips, year) {
        //     for (let i = 0; i < data.length; i++) {
        //         if (data[i].countyfips === fips && data[i].population_year === year) {
        //             return (Number(data[i].births) - Number(data[i].deaths));
        //         }
        //     }
        //     return 0;
        // }


        // this.retrieveCountyNatIncRate = function(fips, year) {
        //     for (let i = 0; i < data.length; i++) {
        //         if (data[i].countyfips === fips && data[i].population_year === year) {
        //             return ((Number(data[i].births) - Number(data[i].deaths)) / Number(data[i].totaljobs));
        //         }
        //     }
        //     return 0;
        // }

        // this.retrieveNatIncrease = function(fips) {
        //     return (this.retrieveTtlBirths(fips) - this.retrieveTtlDeaths(fips));
        // }

        // this.getMaxNatIncrease = function() {
        //     var max_value = -Infinity;
        //     for (let i = 0; i < fips_array.length; i++) {
        //         var current_county = this.retrieveNatIncrease(fips_array[i]);
        //         if (current_county > max_value) {
        //             max_value = current_county;
        //         }
        //     }
        //     return max_value;
        // }

        // this.getMinNatIncrease = function() {
        //     var min_value = Infinity;
        //     for (let i = 0; i < fips_array.length; i++) {
        //         var current_county = this.retrieveNatIncrease(fips_array[i]);
        //         if (current_county < min_value) {
        //             min_value = current_county;
        //         }
        //     }
        //     return min_value;
        // }


        // this.retrieveRateNaturalIncrease = function(fips) {
        //     var running_total = 0;
        //     for (let j = (first_year + 1); j < (last_year + 1); j++) {
        //         running_total += this.retrieveCountyNatIncRate(fips, j);
        //     }
        //     return ((running_total / number_of_years) * 100).toFixed(2);
        // }

        // this.getMaxRateNaturalIncrease = function() {
        //     var max_value = -Infinity;
        //     for (let i = 0; i < fips_array.length; i++) {
        //         var current_county = parseFloat(this.retrieveRateNaturalIncrease(fips_array[i]));
        //         if (current_county > max_value) {
        //             max_value = current_county;
        //         }
        //     }
        //     return max_value;
        // }

        // this.getMinRateNaturalIncrease = function() {
        //     var min_value = Infinity;
        //     for (let i = 0; i < fips_array.length; i++) {
        //         var current_county = parseFloat(this.retrieveRateNaturalIncrease(fips_array[i]));
        //         if (current_county < min_value) {
        //             min_value = current_county;
        //         }
        //     }
        //     return min_value;
        // }


        // /* MIGRATION */

        // this.retrieveCountyMigration = function(fips, year) {
        //     for (let i = 0; i < data.length; i++) {
        //         if (data[i].countyfips === fips && data[i].population_year === year) {
        //             return Number(data[i].netmig);
        //         }
        //     }
        //     return 0;
        // }

        // this.retrieveCountyMigrationRate = function(fips, year) {
        //     for (let i = 0; i < data.length; i++) {
        //         if (data[i].countyfips === fips && data[i].population_year === year) {
        //             return (Number(data[i].netmig) / Number(data[i].totaljobs)) * 1000;
        //         }
        //     }
        //     return 0;
        // }

        // this.retrieveTtlMigration = function(fips) {
        //     var running_total_migration = 0;
        //     for (let j = (first_year + 1); j < (last_year + 1); j++) {
        //         running_total_migration += this.retrieveCountyMigration(fips, j);
        //     }
        //     return running_total_migration;
        // }

        // this.getMaxTtlMigration = function() {
        //     var max_value = -Infinity;
        //     for (let i = 0; i < fips_array.length; i++) {
        //         var current_county = this.retrieveTtlMigration(fips_array[i]);
        //         if (current_county > max_value) {
        //             max_value = current_county;
        //         }
        //     }
        //     return max_value;
        // }

        // this.getMinTtlMigration = function() {
        //     var min_value = Infinity;
        //     for (let i = 0; i < fips_array.length; i++) {
        //         var current_county = this.retrieveTtlMigration(fips_array[i]);
        //         if (current_county < min_value) {
        //             min_value = current_county;
        //         }
        //     }
        //     return min_value;
        // }


        // this.retrieveMigrationRate = function(fips) {
        //     var running_total = 0;
        //     for (let j = (first_year + 1); j < (last_year + 1); j++) {
        //         running_total += this.retrieveCountyMigrationRate(fips, j);
        //     }
        //     return (running_total / number_of_years).toFixed(2);
        // }

        // this.getMaxMigrationRate = function() {
        //     var max_value = -Infinity;
        //     for (let i = 0; i < fips_array.length; i++) {
        //         var current_county = parseFloat(this.retrieveMigrationRate(fips_array[i]));
        //         if (current_county > max_value) {
        //             max_value = current_county;
        //         }
        //     }
        //     return max_value;
        // }

        // this.getMinMigrationRate = function() {
        //     var min_value = Infinity;
        //     for (let i = 0; i < fips_array.length; i++) {
        //         var current_county = parseFloat(this.retrieveMigrationRate(fips_array[i]));
        //         if (current_county < min_value) {
        //             min_value = current_county;
        //         }
        //     }
        //     return min_value;
        // }



    }



    return CMap; // return constructor function

}
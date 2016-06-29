/* eslint-disable */

var fetchJSONFile = require("../fetch_json.js");


onmessage = function(e) {

        console.log('Message received from main script: ' + e.data);

        fetchJSONFile('https://gis.dola.colorado.gov/lookups/componentYRS', function(yrs) {

            var queriedYears = "";

            for (let i = 0; i < yrs.length; i++) {
                if (i !== 0) {
                    queriedYears += ",";
                }
                queriedYears += yrs[i].year;
            }


            fetchJSONFile('https://gis.dola.colorado.gov/lookups/components?year=' + queriedYears + '&county=1,3,5,7,9,11,13,14,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125', function(data) {


                console.log('Posting message back to main script');
              
                postMessage([data, yrs]);
                close(); //worker is finished

            });

        });



    } //end onmessage
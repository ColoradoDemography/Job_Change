module.exports = function(min, max, num, breaks) {


    var sig_dig = 0;
    var scaler = 1;
    var offset = 1;

    if (max < 100) {
        sig_dig = 1;
        scaler = 10;
        offset = 0.1;
    }
    if (max < 10) {
        sig_dig = 2;
        scaler = 100;
        offset = 0.01;
    }
    if (max < 1) {
        sig_dig = 3;
        scaler = 1000;
        offset = 0.001;
    }

    var add_pct = "";

    if (num === "1" || num === "3" || num === "7") {
        add_pct = "%";
    }



    //[{rgb_string, lowtext, operator, hightext}]
    var legend_components = [];
    legend_components.push({
        rgb_string: "rgba(49, 54, 149, 0.5)",
        lowtext: "",
        operator: "<=",
        hightext: ((breaks[0]).toLocaleString(undefined, {
            maximumFractionDigits: sig_dig
        })) + add_pct
    });
    legend_components.push({
        rgb_string: "rgba(69, 117, 180, 0.5)",
        lowtext: (((Math.round((breaks[0]) * scaler) / scaler) + offset).toLocaleString(undefined, {
            maximumFractionDigits: sig_dig
        })) + add_pct,
        operator: "to",
        hightext: ((breaks[1]).toLocaleString(undefined, {
            maximumFractionDigits: sig_dig
        })) + add_pct
    });
    legend_components.push({
        rgb_string: "rgba(116, 173, 209, 0.5)",
        lowtext: (((Math.round((breaks[1]) * scaler) / scaler) + offset).toLocaleString(undefined, {
            maximumFractionDigits: sig_dig
        })) + add_pct,
        operator: "to",
        hightext: ((breaks[2]).toLocaleString(undefined, {
            maximumFractionDigits: sig_dig
        })) + add_pct
    });
    legend_components.push({
        rgb_string: "rgba(171, 217, 233, 0.5)",
        lowtext: (((Math.round((breaks[2]) * scaler) / scaler) + offset).toLocaleString(undefined, {
            maximumFractionDigits: sig_dig
        })) + add_pct,
        operator: "to",
        hightext: ((breaks[3]).toLocaleString(undefined, {
            maximumFractionDigits: sig_dig
        })) + add_pct
    });
    legend_components.push({
        rgb_string: "rgba(224, 243, 248, 0.5)",
        lowtext: (((Math.round((breaks[3]) * scaler) / scaler) + offset).toLocaleString(undefined, {
            maximumFractionDigits: sig_dig
        })) + add_pct,
        operator: "to",
        hightext: breaks[4] + add_pct
    });
    legend_components.push({
        rgb_string: "rgba(255, 255, 191, 0.5)",
        lowtext: (breaks[4] + offset) + add_pct,
        operator: "to",
        hightext: ((breaks[5]).toLocaleString(undefined, {
            maximumFractionDigits: sig_dig
        })) + add_pct
    });
    legend_components.push({
        rgb_string: "rgba(254, 224, 144, 0.5)",
        lowtext: (((Math.round((breaks[5]) * scaler) / scaler) + offset).toLocaleString(undefined, {
            maximumFractionDigits: sig_dig
        })) + add_pct,
        operator: "to",
        hightext: ((breaks[6]).toLocaleString(undefined, {
            maximumFractionDigits: sig_dig
        })) + add_pct
    });
    legend_components.push({
        rgb_string: "rgba(253, 174, 97, 0.5)",
        lowtext: (((Math.round((breaks[6]) * scaler) / scaler) + offset).toLocaleString(undefined, {
            maximumFractionDigits: sig_dig
        })) + add_pct,
        operator: "to",
        hightext: ((breaks[7]).toLocaleString(undefined, {
            maximumFractionDigits: sig_dig
        })) + add_pct
    });
    legend_components.push({
        rgb_string: "rgba(244, 109, 67, 0.5)",
        lowtext: (((Math.round((breaks[7]) * scaler) / scaler) + offset).toLocaleString(undefined, {
            maximumFractionDigits: sig_dig
        })) + add_pct,
        operator: "to",
        hightext: ((breaks[8]).toLocaleString(undefined, {
            maximumFractionDigits: sig_dig
        })) + add_pct
    });
    legend_components.push({
        rgb_string: "rgba(215, 48, 39, 0.5)",
        lowtext: (((Math.round((breaks[8]) * scaler) / scaler) + offset).toLocaleString(undefined, {
            maximumFractionDigits: sig_dig
        })) + add_pct,
        operator: "to",
        hightext: ((breaks[9]).toLocaleString(undefined, {
            maximumFractionDigits: sig_dig
        })) + add_pct
    });
    legend_components.push({
        rgb_string: "rgba(165, 0, 38, 0.5)",
        lowtext: (((Math.round((breaks[9]) * scaler) / scaler) + offset).toLocaleString(undefined, {
            maximumFractionDigits: sig_dig
        })) + add_pct,
        operator: "+",
        hightext: ""
    });

    var htmlstring = "<table style='border-style: none; line-height:12px;'>";

    for (let i = 0; i < legend_components.length; i++) {
        htmlstring += "<tr><td style='text-align: center;'><span style='color: " + legend_components[i].rgb_string + "'>&block;</span></td><td style='text-align: right;'>" + legend_components[i].lowtext + "</td><td style='text-align: center;'>" + legend_components[i].operator + "</td><td style='text-align: left;'>" + legend_components[i].hightext + "</td></tr>";
    }

    htmlstring += "</table>";

    var legend = document.getElementById('legend-control');
    legend.innerHTML = htmlstring;


}
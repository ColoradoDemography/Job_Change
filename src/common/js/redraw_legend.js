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
        hightext: commafy((breaks[0]).toFixed(sig_dig)) + add_pct
    });
    legend_components.push({
        rgb_string: "rgba(69, 117, 180, 0.5)",
        lowtext: commafy(((Math.round((breaks[0]) * scaler) / scaler) + offset).toFixed(sig_dig)) + add_pct,
        operator: "to",
        hightext: commafy((breaks[1]).toFixed(sig_dig)) + add_pct
    });
    legend_components.push({
        rgb_string: "rgba(116, 173, 209, 0.5)",
        lowtext: commafy(((Math.round((breaks[1]) * scaler) / scaler) + offset).toFixed(sig_dig)) + add_pct,
        operator: "to",
        hightext: commafy((breaks[2]).toFixed(sig_dig)) + add_pct
    });
    legend_components.push({
        rgb_string: "rgba(171, 217, 233, 0.5)",
        lowtext: commafy(((Math.round((breaks[2]) * scaler) / scaler) + offset).toFixed(sig_dig)) + add_pct,
        operator: "to",
        hightext: commafy((breaks[3]).toFixed(sig_dig)) + add_pct
    });
    legend_components.push({
        rgb_string: "rgba(224, 243, 248, 0.5)",
        lowtext: commafy(((Math.round((breaks[3]) * scaler) / scaler) + offset).toFixed(sig_dig)) + add_pct,
        operator: "to",
        hightext: commafy((breaks[4]).toFixed(sig_dig)) + add_pct
    });
    legend_components.push({
        rgb_string: "rgba(255, 255, 191, 0.5)",
        lowtext: commafy(((Math.round((breaks[4]) * scaler) / scaler) + offset).toFixed(sig_dig)) + add_pct,
        operator: "to",
        hightext: commafy((breaks[5]).toFixed(sig_dig)) + add_pct
    });
    legend_components.push({
        rgb_string: "rgba(254, 224, 144, 0.5)",
        lowtext: commafy(((Math.round((breaks[5]) * scaler) / scaler) + offset).toFixed(sig_dig)) + add_pct,
        operator: "to",
        hightext: commafy((breaks[6]).toFixed(sig_dig)) + add_pct
    });
    legend_components.push({
        rgb_string: "rgba(253, 174, 97, 0.5)",
        lowtext: commafy(((Math.round((breaks[6]) * scaler) / scaler) + offset).toFixed(sig_dig)) + add_pct,
        operator: "to",
        hightext: commafy((breaks[7]).toFixed(sig_dig)) + add_pct
    });
    legend_components.push({
        rgb_string: "rgba(244, 109, 67, 0.5)",
        lowtext: commafy(((Math.round((breaks[7]) * scaler) / scaler) + offset).toFixed(sig_dig)) + add_pct,
        operator: "to",
        hightext: commafy((breaks[8]).toFixed(sig_dig)) + add_pct
    });
    legend_components.push({
        rgb_string: "rgba(215, 48, 39, 0.5)",
        lowtext: commafy(((Math.round((breaks[8]) * scaler) / scaler) + offset).toFixed(sig_dig)) + add_pct,
        operator: "to",
        hightext: commafy((breaks[9]).toFixed(sig_dig)) + add_pct
    });
    legend_components.push({
        rgb_string: "rgba(165, 0, 38, 0.5)",
        lowtext: commafy(((Math.round((breaks[9]) * scaler) / scaler) + offset).toFixed(sig_dig)) + add_pct,
        operator: "+",
        hightext: ""
    });

    var htmlstring = "<table style='border: 0px solid #fff; box-shadow: none; background-color: #fff; line-height:12px;'>";

    for (let i = 0; i < legend_components.length; i++) {
        htmlstring += "<tr><td style='text-align: center;'><span style='color: " + legend_components[i].rgb_string + "'>&block;</span></td><td style='text-align: right;'>" + legend_components[i].lowtext + "</td><td style='text-align: center;'>" + legend_components[i].operator + "</td><td style='text-align: left;'>" + legend_components[i].hightext + "</td></tr>";
    }

    if (num === "2") {
        htmlstring += "<tr><td colspan='4'>Year to year change<br/>in total jobs</td></tr></table>";
    }
    if (num === "1") {
        htmlstring += "<tr><td colspan='4'>Percent change in jobs<br/>from year to year</td></tr></table>";
    }
    if (num === "4") {
        htmlstring += "<tr><td colspan='4'>Average change in population<br/>for each year selected</td></tr></table>";
    }
    if (num === "3") {
        htmlstring += "<tr><td colspan='4'>Average percent change<br/>in population<br/>for each year selected</td></tr></table>";
    }
    if (num === "5") {
        htmlstring += "<tr><td colspan='4'>Births per 1,000 people</td></tr></table>";
    }
    if (num === "6") {
        htmlstring += "<tr><td colspan='4'>Deaths per 1,000 people</td></tr></table>";
    }
    if (num === "7") {
        htmlstring += "<tr><td colspan='4'>Difference between births<br/>and deaths per 1,000 people</td></tr></table>";
    }
    if (num === "8") {
        htmlstring += "<tr><td colspan='4'>Change in population<br/>per 1,000 people<br/>due to migration</td></tr></table>";
    }
    if (num === "10") {
        htmlstring += "<tr><td colspan='4'>Total number of deaths</td></tr></table>";
    }
    if (num === "9") {
        htmlstring += "<tr><td colspan='4'>Total number of births</td></tr></table>";
    }
    if (num === "11") {
        htmlstring += "<tr><td colspan='4'>Total population change<br/>due to births and deaths</td></tr></table>";
    }
    if (num === "12") {
        htmlstring += "<tr><td colspan='4'>Total population change<br/>due to migration</td></tr></table>";
    }


    var legend = document.getElementById('legend-control');
    legend.innerHTML = htmlstring;

    //http://stackoverflow.com/questions/6784894/add-commas-or-spaces-to-group-every-three-digits
    function commafy(num) {
        var str = num.toString().split('.');
        if (str[0].length >= 4) {
            str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        }
        if (str[1] && str[1].length >= 4) {
            str[1] = str[1].replace(/(\d{3})/g, '$1 ');
        }
        return str.join('.');
    }
}
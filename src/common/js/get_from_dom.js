module.exports = function() {

    var stat_element = document.getElementById("stat");
    var from_element = document.getElementById("selfrom");
    var to_element = document.getElementById("selto");


    var first_year = parseInt(from_element.options[from_element.selectedIndex].value);
    var last_year = parseInt(to_element.options[to_element.selectedIndex].value);

    var yearset = "";

    for (let i = first_year; i <= last_year; i++) {
        if (i !== first_year) {
            yearset += ",";
        }
        yearset += i;
    }

    if (yearset === "") {
        yearset = String(first_year)
    }

    return [yearset, stat_element.options[stat_element.selectedIndex].value]

}
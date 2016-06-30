// @flow

var saveAs = require("../../lib/js/FileSaver.min.js").saveAs;

module.exports = function(tableid: string, name: string) {


    var csvstring: string = "";
    var i: number = 0;

    var oTable: any = document.getElementById(tableid);
    var rowLength = oTable.rows.length;
    for (i = 0; i < rowLength; i++) {
        var oCells = oTable.rows.item(i).cells;
        var cellLength = oCells.length;
        for (var j = 0; j < cellLength; j++) {
            /* get your cell info here */
            if (j === 0 && i > 0) {
                csvstring = csvstring + "\n";
            }
            csvstring = csvstring + '"' + oCells.item(j).innerHTML + '"';
            if (j < cellLength) {
                csvstring = csvstring + ",";
            }
        }
    }

    //replace &nbsp; spacing
    csvstring = csvstring.replace(/&nbsp;/g, '');

    var blob: Blob = new Blob([csvstring], {
        type: "text/csv;charset=utf-8"
    });
    saveAs(blob, name + ".csv");


}
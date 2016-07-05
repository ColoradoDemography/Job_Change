var saveTableAsCSV = require("./save_table.js");


module.exports = function(cMap, e) {

    document.getElementById('dlthis').addEventListener('click', function() {
        let nospacename = (e.target.feature.properties.NAME).replace(/\s/g, '');
        saveTableAsCSV('modaltable', nospacename + "_" + cMap.first_year + "_" + cMap.last_year);
    }, false);

    document.getElementById('dlall').addEventListener('click', function() {
        window.location.href = 'https://storage.googleapis.com/co-publicdata/components-change-county.csv';
    }, false);


    document.getElementById('t_download').addEventListener('click', function() {
        var svg_chart = document.getElementById('wf_chart');
        saveSvgAsPng(svg_chart, 'waterfall.png');
    }, false);

    document.getElementById('f_download').addEventListener('click', function() {
        var full_chart = document.getElementById('full_chart');
        saveSvgAsPng(full_chart, 'waterfall_lrg.png');
    }, false);


    document.getElementById('tab_table').addEventListener('click', function(evt) {
        openTab(evt, 'tablediv');
    }, false);

    document.getElementById('tab_chart').addEventListener('click', function(evt) {
        openTab(evt, 'chartdiv');
    }, false);


    //hacks to prevent 'ghosting' of tab menu on close of modal
    document.querySelector(".close").addEventListener('click', function() {
        closeModal();
    }, false);

    document.querySelector("div.modal").addEventListener('mousedown', function() {
        closeModal();
    }, false);


    function closeModal() {
        var element = document.querySelector('#tabbedbrowsing');
        element.style.display = 'none';
    }

    function openTab(evt, cityName) {
        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the link that opened the tab
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
    }



}
module.exports = function(cMap, fips) {


    var firstyear = cMap.first_year;
    var lastyear = cMap.last_year;

    var data = [];
    var numberformat = d3.format(",d");


    data.push({
        name: firstyear,
        class: 'total',
        value: Number(cMap.retrieveCountyPop(fips, firstyear))
    });


    var min_array = [];

    for (let i = firstyear; i < lastyear; i++) {

        min_array.push(Number(cMap.retrieveCountyPop(fips, i)));

        data.push({
            "name": i + .25,
            "value": Number(cMap.retrieveCountyBirths(fips, i + 1)),
            "class": 'birth',
            "title": i + ' Births: ' + numberformat(Number(cMap.retrieveCountyBirths(fips, i + 1)))
        });
        data.push({
            "name": i + .5,
            "value": -Number(cMap.retrieveCountyDeaths(fips, i + 1)),
            "class": 'death',
            "title": i + ' Deaths: ' + numberformat(Number(cMap.retrieveCountyDeaths(fips, i + 1)))
        });
        data.push({
            "name": i + .75,
            "value": Number(cMap.retrieveCountyMigration(fips, i + 1)),
            "class": 'migration',
            "title": i + ' Migration: ' + numberformat(Number(cMap.retrieveCountyMigration(fips, i + 1)))
        });
        data.push({
            "name": i + 1,
            "value": 0,
            "class": 'total'
        });
    }

    min_array.push(Number(cMap.retrieveCountyPop(fips, lastyear)));

    var dataset_min = Math.min(...min_array);

    //leave some room
    dataset_min = parseInt(dataset_min * 0.85, 10);



    // Transform data (i.e., finding cumulative values and total) for easier charting
    var cumulative = 0;
    for (var i = 0; i < data.length; i++) {
        data[i].start = cumulative;

        cumulative += data[i].value;
        data[i].end = cumulative;

        if (data[i].class === 'total') {
            console.log(data[i].end);
            console.log('hit');
            data[i].start = dataset_min;
            data[i].title = data[i].name + ' Population: ' + numberformat(parseInt(data[i].end));
        }

    }





    //chart needs:
    //   console.log(dataset_min);
    //   console.log(firstyear);  
    //   console.log(lastyear);
    //   console.log(data);

    var total_width = 570;
    var total_height = 300;

    var margin = {
            top: 20,
            right: 30,
            bottom: 40,
            left: 50
        },
        width = total_width - margin.left - margin.right,
        height = total_height - margin.top - margin.bottom,
        padding = 0.9;

    var barwidth = width / ((((lastyear - firstyear) * 4) + 1));


    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom").ticks(lastyear - firstyear)
        .tickFormat(d3.format("d"));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var chart = d3.select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    x.domain([firstyear, lastyear + .25]);
    y.domain([dataset_min, d3.max(data, function(d) {
        return d.end;
    })]);

    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");


    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    var bar = chart.selectAll(".bar")
        .data(data)
        .enter().append("g")
        .attr("class", function(d) {
            return "bar " + d.class
        })
        .attr("transform", function(d) {
            return "translate(" + x(d.name) + ",0)";
        });


    bar.append("rect")
        .attr("y", function(d) {
            return y(Math.max(d.start, d.end));
        })
        .attr("height", function(d) {
            return Math.abs(y(d.start) - y(d.end));
        })
        .attr("width", barwidth * padding)
        .append("svg:title")
        .text(function(d) {
            return d.title;
        });





    //       bar.filter(function(d) { return d.class != "sdfsdf" }).append("line")
    //           .attr("class", "connector")
    //           .attr("x1", function(d){
    //         console.log('d: ' + d.name); 
    //         console.log('x.d: ' + x(d.name)); 
    //         return (x(d.name)); 
    //       })
    //           .attr("y1", function(d) { return y(d.end); } )
    //           .attr("y2", function(d) { return y(d.end); } )
    //           .attr("x2", function(d){ return (x(d.name+0.25)); } );




}
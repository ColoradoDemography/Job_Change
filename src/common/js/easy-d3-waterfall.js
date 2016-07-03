module.exports = function(selector, data, options) {

    return function() {

        var total_width = options.total_width || 550;
        var total_height = options.total_height || 300;

        var margin = options.margin || {
            top: 20,
            right: 20,
            bottom: 40,
            left: 60
        };

        var padding = options.padding || 0.9;

        var firstyear = options.firstyear;
        var lastyear = options.lastyear;
        var dataset_min = options.dataset_min;

        var width = total_width - margin.left - margin.right;
        var height = total_height - margin.top - margin.bottom;


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

        d3.select(selector)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "#fff");
        //add white background

        var chart = d3.select(selector).append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("class", "white_bg");


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


    }


}
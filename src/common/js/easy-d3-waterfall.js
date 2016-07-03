module.exports = function(selector, data, options) {

    return function() {

        var total_width = options.total_width || 550;
        var total_height = options.total_height || 300;

        var title_height = options.title_height || 0;

        var margin = options.margin || {
            top: 20,
            right: 20,
            bottom: 40,
            left: 60
        };

        margin.top = margin.top + title_height;

        var padding = options.padding || 0.9;

        var firstyear = options.firstyear;
        var lastyear = options.lastyear;
        var dataset_min = options.dataset_min;

        var width = total_width - margin.left - margin.right;
        var height = total_height - margin.top - margin.bottom;

        var legend_height = options.legend_height || 0;

        var barwidth = width / ((((lastyear - firstyear) * 4) + 1));
        var title_string = options.title_string || "";


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
            .attr("height", height + margin.top + margin.bottom + legend_height)
            .append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "#fff");

        var chart = d3.select(selector).append("g")
            .attr("transform", "translate(" + margin.left + "," + (margin.top) + ")");

        x.domain([firstyear, lastyear + .25]); //remove magic number
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
            .style("fill", function(d) {
                var ret_val = "grey"; //as default
                for (let i = 0; i < options.legend.length; i++) {
                    if (d.class === options.legend[i].class) {
                        ret_val = options.legend[i].fill;
                    }
                }
                return ret_val;
            })
            .style("fill-opacity", function(d) {
                var ret_val = 0.2; //as default
                for (let i = 0; i < options.legend.length; i++) {
                    if (d.class === options.legend[i].class) {
                        ret_val = options.legend[i].fill_opacity;
                    }
                }
                return ret_val;
            })
            .style("stroke-width", function(d) {
                var ret_val = 1; //as default
                for (let i = 0; i < options.legend.length; i++) {
                    if (d.class === options.legend[i].class) {
                        ret_val = options.legend[i].stroke_width;
                    }
                }
                return ret_val;
            })
            .style("stroke", function(d) {
                var ret_val = "grey"; //as default
                for (let i = 0; i < options.legend.length; i++) {
                    if (d.class === options.legend[i].class) {
                        ret_val = options.legend[i].stroke;
                    }
                }
                return ret_val;
            })
            .style("stroke-opacity", function(d) {
                var ret_val = 1; //as default
                for (let i = 0; i < options.legend.length; i++) {
                    if (d.class === options.legend[i].class) {
                        ret_val = options.legend[i].stroke_opacity;
                    }
                }
                return ret_val;
            })
            .append("svg:title")
            .text(function(d) {
                return d.title || "";
            });


        //legend is optional
        if (options.legend && options.legend !== []) {

            var legend = chart.selectAll(".legend")
                .data(options.legend)
                .enter().append("g")
                .attr("class", "legend");

            legend.append("rect")
                .attr("x", function(d, i) {
                    return (i * (width / options.legend.length));
                })
                .attr("y", height + 50)
                .attr("width", 12)
                .attr("height", 12)
                .style("fill", function(d) {
                    return d.fill;
                })
                .style("fill-opacity", function(d) {
                    return d.fill_opacity;
                })
                .style("stroke", function(d) {
                    return d.stroke;
                })
                .style("stroke-opacity", function(d) {
                    return d.stroke_opacity;
                })
                .style("stroke-width", function(d) {
                    return d.stroke_width;
                });

            legend.append("text")
                .attr("x", function(d, i) {
                    return 20 + (i * (width / options.legend.length));
                })
                .attr("y", height + 57)
                .attr("dy", ".35em")
                .style("text-anchor", "left")
                .text(function(d) {
                    return d.label;
                });

        }

        //title is optional
        if (title_string !== "") {

            d3.select(selector).append("text")
                .attr("x", width / 2)
                .attr("y", (title_height / 2) + 15)
                .attr("dy", ".35em")
                .style("text-anchor", "center")
                .style("font-size", "20px")
                .style("font-weight", "900")
                .text(title_string);
        }


    }


}
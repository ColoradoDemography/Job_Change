module.exports = function(selector, data, options) {

    return function() {

        var chart_width = options.chart.width || 520;
        var chart_height = options.chart.height || 350;
        var chart_font_family = options.chart.font_family || "sans-serif";
        var chart_bar_padding = options.chart.bar_padding || 0.9;

        var margin_top = options.margin.top || 50;
        var margin_right = options.margin.right || 10;
        var margin_bottom = options.margin.bottom || 90;
        var margin_left = options.margin.left || 80;

        var title_text = options.title.text || "";
        var title_font_size = options.title.font_size || 20;
        var title_font_weight = options.title.font_weight || 500;

        var x_label_text = options.x_label.text || "";
        var x_label_font_size = options.x_label.font_size || 14;
        var x_label_font_weight = options.x_label.font_weight || 500;

        var y_label_text = options.y_label.text || "";
        var y_label_font_size = options.y_label.font_size || 14;
        var y_label_font_weight = options.y_label.font_weight || 500;

        var legend_class = options.legend || [];

        var firstyear = data[0].x;
        var lastyear = data[data.length - 1].x;

        var dataset_min = d3.min(data, function(d) {
            return d.end;
        });
        dataset_min = parseInt(dataset_min * 0.85, 10); // start y-axis at 85% of minimum value (rather than at 0).

        var width = chart_width - margin_left - margin_right;
        var height = chart_height - margin_top - margin_bottom;

        var barwidth = width / ((((lastyear - firstyear) * 4) + 1));


        //chart


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

        var rect = d3.select(selector)
            .attr("width", width + margin_left + margin_right)
            .attr("height", height + margin_top + margin_bottom)
            .append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "#fff");

        var chart = d3.select(selector).append("g")
            .attr("transform", "translate(" + margin_left + "," + (margin_top) + ")");


        x.domain([firstyear, lastyear + .25]); //remove magic number
        y.domain([dataset_min, d3.max(data, function(d) {
            return d.end;
        })]);

        chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("y", 0) // ?
            .attr("x", 9) // ?
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start");


        chart.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        //customize style later
        chart.selectAll(".axis text")
            .style("font-size", "10px");


        //customize style later
        chart.selectAll(".axis path, .axis line")
            .style("fill", "none")
            .style("stroke", "#000")
            .attr("shape-rendering", "crispEdges");



        var bar = chart.selectAll(".bar")
            .data(data)
            .enter().append("g")
            .attr("class", function(d) {
                return "bar " + d.class
            })
            .attr("transform", function(d) {
                return "translate(" + x(d.x) + ",0)";
            });


        var bar_rect = bar.append("rect")
            .attr("y", function(d) {
                return y(Math.max(d.start, d.end));
            })
            .attr("height", function(d) {
                return Math.abs(y(d.start) - y(d.end));
            })
            .attr("width", barwidth * chart_bar_padding)
            .style("fill", function(d) {
                var ret_val = "grey"; //as default
                for (let i = 0; i < legend_class.length; i++) {
                    if (d.class === legend_class[i].class) {
                        ret_val = legend_class[i].fill;
                    }
                }
                return ret_val;
            })
            .style("fill-opacity", function(d) {
                var ret_val = 0.2; //as default
                for (let i = 0; i < legend_class.length; i++) {
                    if (d.class === legend_class[i].class) {
                        ret_val = legend_class[i].fill_opacity;
                    }
                }
                return ret_val;
            })
            .style("stroke-width", function(d) {
                var ret_val = 1; //as default
                for (let i = 0; i < legend_class.length; i++) {
                    if (d.class === legend_class[i].class) {
                        ret_val = legend_class[i].stroke_width;
                    }
                }
                return ret_val;
            })
            .style("stroke", function(d) {
                var ret_val = "grey"; //as default
                for (let i = 0; i < legend_class.length; i++) {
                    if (d.class === legend_class[i].class) {
                        ret_val = legend_class[i].stroke;
                    }
                }
                return ret_val;
            })
            .style("stroke-opacity", function(d) {
                var ret_val = 1; //as default
                for (let i = 0; i < legend_class.length; i++) {
                    if (d.class === legend_class[i].class) {
                        ret_val = legend_class[i].stroke_opacity;
                    }
                }
                return ret_val;
            })
            .on("mouseover", function() {
                d3.select(this).style("fill-opacity", 1);
            })
            .on("mouseout", function() {
                d3.select(this).style("fill-opacity", function(d) {
                    var ret_val = 0.2; //as default
                    for (let i = 0; i < legend_class.length; i++) {
                        if (d.class === legend_class[i].class) {
                            ret_val = legend_class[i].fill_opacity;
                        }
                    }
                    return ret_val;
                });
            });


        bar_rect.append("svg:title")
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
                    return (i * (width / legend_class.length));
                })
                .attr("y", height + 70) // magic number
                .attr("width", 12) // magic number
                .attr("height", 12) //magic number
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
                    return 20 + (i * (width / legend_class.length));
                })
                .attr("y", height + 77) // magic number
                .style("text-anchor", "left")
                .text(function(d) {
                    return d.label;
                });

        }

        //title is optional
        if (title_text !== "") {
            d3.select(selector).append("text")
                .attr("x", (width / 2) + margin_left)
                .attr("y", (margin_top / 2) + (title_font_size / 2))
                .style("text-anchor", "middle")
                .style("font-size", title_font_size + "px")
                .style("font-weight", title_font_weight)
                .text(title_text);
        }

        if (x_label_text !== "") {
            d3.select(selector).append("text")
                .attr("x", (width / 2) + margin_left)
                .attr("y", (height + margin_top + 50)) // magic number
                .style("text-anchor", "middle")
                .style("font-size", x_label_font_size)
                .style("font-weight", x_label_font_weight)
                .text(x_label_text);
        }

        if (y_label_text !== "") {
            d3.select(selector).append("text")
                .style("text-anchor", "middle")
                .style("font-size", y_label_font_size)
                .style("font-weight", y_label_font_weight)
                .attr("transform", "translate(20," + ((height / 2) + margin_top) + ") rotate(270)")
                .text(y_label_text);
        }

        chart.selectAll("text").style("font-family", chart_font_family).attr("text-rendering", "optimizeLegibility");

        rect.attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "#fff");

    }


}
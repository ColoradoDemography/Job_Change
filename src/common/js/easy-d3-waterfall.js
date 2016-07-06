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

        var max_barscale = d3.max(data, function(d) {
            return d.barscale;
        }) || 1;

        // calculate the starting and ending values of each bar
        var cumulative = 0;
        for (let i = 0; i < data.length; i++) {
            data[i].start = cumulative;
            cumulative += data[i].value;
            data[i].end = cumulative;
        }

        //calculate minimum value in dataset.  Use this so y-axis starts at this value, rather than 0
        var dataset_min = d3.min(data, function(d) {
            return d.end;
        });
        dataset_min = parseInt(dataset_min * 0.85, 10); // start y-axis at 85% of minimum value (rather than at 0).

        //we need to 'reset' the bar minimum value using dataset_min, else bars will be drawn starting below the x-axis
        for (let i = 0; i < data.length; i++) {
            if (data[i].class === 'total') {
                data[i].start = dataset_min;
            }
        }


        var width = chart_width - margin_left - margin_right;
        var height = chart_height - margin_top - margin_bottom;

        var barwidth = width / ((((lastyear - firstyear) * legend_class.length) + 1));


        d3.select(selector)
            .append('defs')
            .append('pattern')
            .attr('id', 'diagonalHatch')
            .attr('patternUnits', 'userSpaceOnUse')
            .attr('width', 4)
            .attr('height', 4)
            .append('path')
            .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
            .attr('stroke', 'rgb(70,70,70)')
            .attr('stroke-width', 0.4);

        var x = d3.scale.linear()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom").ticks(parseInt((lastyear - firstyear) / max_barscale))
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



        x.domain([firstyear, lastyear + ((1 / legend_class.length) * max_barscale)]); //remove magic number
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


        function value_from_legend_class(d, default_value, attribute_string) {
            var ret_val = default_value;
            for (let i = 0; i < legend_class.length; i++) {
                if (d.class === legend_class[i].class) {
                    ret_val = legend_class[i][attribute_string];
                }
            }
            return ret_val;
        }

        var bar_rect = bar.append("rect")
            .attr("y", function(d) {
                return y(Math.max(d.start, d.end));
            })
            .attr("height", function(d) {
                return Math.abs(y(d.start) - y(d.end));
            })
            .attr("width", function(d) {
                if (d.barscale) {
                    return ((barwidth * d.barscale) * chart_bar_padding);
                } else {
                    return barwidth * chart_bar_padding;
                }
            })
            .style("fill", function(d) {
                return value_from_legend_class(d, 'grey', 'fill');
            })
            .style("fill-opacity", function(d) {
                return value_from_legend_class(d, 0.2, 'fill_opacity');
            })
            .style("stroke-width", function(d) {
                return value_from_legend_class(d, 1, 'stroke_width');
            })
            .style("stroke", function(d) {
                return value_from_legend_class(d, 'grey', 'stroke');
            })
            .style("stroke-opacity", function(d) {
                return value_from_legend_class(d, 1, 'stroke_opacity');
            })
            .on("mouseover", function() {
                d3.select(this).style("fill-opacity", 1);
            })
            .on("mouseout", function() {
                d3.select(this).style("fill-opacity", function(d) {
                    return value_from_legend_class(d, 0.2, 'fill_opacity');
                });
            });


        bar.append("rect")
            .attr("y", function(d) {
                return y(Math.max(d.start, d.end));
            })
            .attr("height", function(d) {
                return Math.abs(y(d.start) - y(d.end));
            })
            .attr("width", function(d) {
                if (d.barscale) {
                    return ((barwidth * d.barscale) * chart_bar_padding);
                } else {
                    return barwidth * chart_bar_padding;
                }
            })
            .style("fill", function(d) {
                if (d.value < 0) {
                    return 'url(#diagonalHatch)';
                }
                return 'rgba(255,255,255,0)';
            })
            .style("pointer-events", "none");



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
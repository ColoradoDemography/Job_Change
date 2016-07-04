module.exports = function() {


    var WaterfallObj = function() {

        this.chart = {};
        this.chart.width = 520;
        this.chart.height = 350;
        this.chart.font_family = "'Source Sans Pro', sans-serif";
        this.chart.bar_padding = 0.9;

        this.margin = {};
        this.margin.top = 50;
        this.margin.right = 10;
        this.margin.bottom = 90;
        this.margin.left = 80;

        this.title = {};
        this.title.text = "";
        this.title.font_size = 20;
        this.title.font_weight = 500;

        this.x_label = {};
        this.x_label.text = "Year";
        this.x_label.font_size = 14;
        this.x_label.font_weight = 500;

        this.y_label = {};
        this.y_label.text = "Population";
        this.y_label.font_size = 14;
        this.y_label.font_weight = 500;

        //create legend
        this.legend = [{
            "class": "total",
            "fill": "steelblue",
            "fill_opacity": 0.3,
            "stroke": "steelblue",
            "stroke_opacity": 0.5,
            "stroke_width": 1,
            "label": "Totals"
        }, {
            "class": "birth",
            "fill": "darkolivegreen",
            "fill_opacity": 0.2,
            "stroke": "darkolivegreen",
            "stroke_opacity": 1,
            "stroke_width": 1,
            "label": "Births"
        }, {
            "class": "death",
            "fill": "crimson",
            "fill_opacity": 0.2,
            "stroke": "crimson",
            "stroke_opacity": 1,
            "stroke_width": 1,
            "label": "Deaths"
        }, {
            "class": "migration",
            "fill": "grey",
            "fill_opacity": 0.2,
            "stroke": "grey",
            "stroke_opacity": 1,
            "stroke_width": 1,
            "label": "Migration"
        }];


    }

    return WaterfallObj;

}
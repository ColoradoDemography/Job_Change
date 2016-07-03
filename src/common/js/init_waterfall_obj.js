module.exports = function() {

    var WaterfallObj = function(firstyear, lastyear, dataset_min) {

        this.total_width = 550;
        this.total_height = 350;

        this.margin = {
            top: 20,
            right: 20,
            bottom: 40,
            left: 60
        };

        this.padding = 0.9;

        this.firstyear = firstyear;
        this.lastyear = lastyear;
        this.dataset_min = dataset_min;


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

        this.legend_height = 50;
        this.title_height = 20;

        this.title_string = "Waterfall Chart";

    }

    return WaterfallObj;

}
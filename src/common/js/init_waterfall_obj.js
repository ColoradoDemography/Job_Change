module.exports = function() {

    var WaterfallObj = function(firstyear, lastyear, dataset_min) {

        this.total_width = 550;
        this.total_height = 300;

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

    }

    return WaterfallObj;

}
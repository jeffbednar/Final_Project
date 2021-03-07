// const route_api="http://127.0.0.1:5000/csv";

// d3.json('http://127.0.0.1:5000/csv/').then(function(data) {
function buildCharts(sample) {
    d3.json('/csv/').then(function (data) {
        console.log(data);

        var transposedata = [];
        var i;
        var rowdata = [];
        for(i=0; i < 438; i++) {
            for (element in data) {

                let columnvalue = data[element]
                rowdata.push(columnvalue[i]);
            }
            transposedata.push(rowdata);
            rowdata = [];
        }

        console.log(transposedata[0]);
        var filtereddata = transposedata.filter(x => x[1] == sample);

        // Grab values to build the plots
        var country = data.country;
        console.log(filtereddata);
        var date = [];
        for(var i=0; i<filtereddata.length; i++) {
            date.push(filtereddata[i][7]);
        }
        var people_fully_vaccinated = [];
        for(var i=0; i<filtereddata.length; i++) {
            people_fully_vaccinated.push(filtereddata[i][8]);
        }
        var total_cases = data.cumulative_total_cases;
        var cumulative_total_deaths = data.cumulative_total_deaths;

        var trace1 = [{
            type: "scatter",

            x: date,
            y: people_fully_vaccinated
            /*line: {
                color: "#17BECF"
            }*/
        }];

        var layout = {
            title: `Covid -- People Fully Vaccinated`,
            xaxis: {
                autorange: true,
                type: "date"
            },
            yaxis: {
                autorange: true,
                type: "linear"
            }
        };
        console.log(people_fully_vaccinated);

        Plotly.newPlot("plot_data", trace1);
    });


}



function optionChanged(newSample) {
    //Fetch new data each time a new sample is selected
    buildCharts(newSample);
}

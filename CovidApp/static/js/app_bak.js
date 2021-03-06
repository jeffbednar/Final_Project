
// Define data file
//const file = "Data/samples.json";
const file = "127.0.0.1:5000/csv/";
// Define function to build charts
function buildCharts(samplechoice) {
    d3.json('http://127.0.0.1:5000/csv/').then((data) => {
        // var sample = data.samples.filter(a => a.id==samplechoice);
        var sample = data.samples.filter(a => a.country==samplechoice);
        // var sampleotuids = sample[0].otu_ids;
        var sample_countries = sample[0].country;
        //console.log(sampleotuids);
        // Get data; define y ticks; put the otu_ids in descending order via reverse function
        var samplevalues = sample[0].sample_values;
        var yticks = sample_countries.slice(0,10).reverse().map(item => `country ${item}`);
    //     // Define trace for bar chart 
    //     var trace = [{
    //         type: 'bar',
    //         y: yticks,
    //         x: samplevalues.slice(0, 10).reverse(),
    //         orientation: 'h'
    //       }]; 
    //       // Define layout for bar chart
    //       var layout2 = {
    //         title: 'Top 10 Bacteria per Sample'   
    //         }
    //     Plotly.newPlot('bar', trace, layout2);
    //     });
    })
// Define function for collecting metadata information
function meta(samplechoice) {
    // Define selection of metadata
    var selector = d3.select("#sample-metadata");
    // Pull data from file
    d3.json('http://127.0.0.1:5000/csv/').then((data) => {
      var sample = data.metadata.filter(a => a.country==samplechoice);
      selector.html("");
      // Append information to appropriate country information
      selector.append("h5").text("Country: " + sample[0].country);
      selector.append("h5").text("Total Vaccinations: " + sample[0].total_vaccinations);
      selector.append("h5").text("People Vaccinated: " + sample[0].people_vaccinated);
      selector.append("h5").text("People Fully Vaccinated: " + sample[0].people_fully_vaccinated);
      selector.append("h5").text("Daily Vaccinations: " + sample[0].daily_vaccinations);
      selector.append("h5").text("Cumulative Total Cases: " + sample[0].cumulative_total_cases);
      selector.append("h5").text("Daily New Cases: " + sample[0].daily_new_cases);
      selector.append("h5").text("Cumulative Total Cases: " + sample[0].cumulative_total_cases);
      selector.append("h5").text("Daily New Cases: " + sample[0].daily_new_cases);
    //   console.log(sample[0]);
    //   var metadata = d3.select("#sample-metadata");
    });
}
// custom_names={
// Define function for selecting options
function optionChanged(samplechoice) {  
    buildCharts(samplechoice);
    meta(samplechoice);
}
// Define initialize function
function init() {
    alert('Initializing Init() function');
    d3.json('http://127.0.0.1:5000/csv/').then((data) => {    
    console.log(data);
        // var selector = d3.select("#selDataset");
        // let uniquecountries = [...new Set(data[sample_choice])];
        // // console.log([uniquecountries]);
        // data.names.forEach(element => {
        //     selector.append("option").text(element).property("value", element); 
        // });
    });
    // Define default chart and metadata
    // buildCharts(940);
    // meta(940);
}
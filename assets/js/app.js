// Setting up my svg dimensions
let svgWidth = 960;
let svgHeight = 500;

//Setting up the margins
let margins = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

let width = svgWidth - margins.left - margins.right;
let height = svgHeight - margins.top - margins.bottom;

//Making my svg wrapper 
let svg = d3
    .select("scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

//Appending a svg group to my html

let chartGroup = svg.append("g");

// Initial parameters 

chosenXaxis = "income";

d3.csv("./data/data.csv").then(function(stateData, err) {
    if (err) throw err;
});






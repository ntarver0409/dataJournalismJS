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
    .select(".scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

//Appending a svg group to my html

let chartGroup = svg.append("g")
    .attr("transform", `translate(${margins.left}, ${margins.top})`);

// Initial parameters 

chosenXaxis = "income";

d3.csv("assets/data/data.csv").then(function(stateData, err) {
    if (err) throw err;

    //parsing the data
    stateData.forEach(function(data){
        data.income = +data.income;
        data.obesity = +data.obesity;
        data.abbr = +data.abbr;
    });

    //Creating my scale functions
    let xLinearScale = d3.scaleLinear()
        .domain([20, d3.max(stateData, function(d){
            return d.income;
        })])
        .range([0, width]);

    let yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(stateData, function(d){
        return d.obesity;
    })])
    .range([height, 0]);

    //Appending Axes to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    
});






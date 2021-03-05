// Setting up my svg dimensions
let svgWidth = 1000;
let svgHeight = 500;

//Setting up the margins
let margins = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 80
};

let width = svgWidth - margins.left - margins.right;
let height = svgHeight - margins.top - margins.bottom;

//Making my svg wrapper 
let svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

//Appending a svg group to my html

let chartGroup = svg.append("g")
    .attr("transform", `translate(${margins.left}, ${margins.top})`);




d3.csv("assets/data/data.csv").then(function(stateData, err) {
    if (err) throw err;

    console.log(stateData);
    //parsing the data
    stateData.forEach(function(data){
    data.poverty = +data.poverty;
    data.healthcare= +data.healthcare;
    });


    //Creating my scale functions
    let xLinearScale = d3.scaleLinear()
        .domain([d3.min(stateData, d => d.poverty) * 0.5, 
            d3.max(stateData, d => d.poverty) * 1.1])
        .range([0, width]);

    let yLinearScale = d3.scaleLinear()
    .domain([d3.min(stateData, d => d.healthcare) * 0.5, 
        d3.max(stateData, d => d.healthcare) * 1.1])
    .range([height, 0]);

    //creating my axes
    let bottomAxis = d3.axisBottom(xLinearScale);
    let leftAxis = d3.axisLeft(yLinearScale);

    //Appending Axes to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    //Creating circles for my chart
    let circles = chartGroup.selectAll("circle")
        .data(stateData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "15")
        .classed("stateCircle", true);

    console.log(stateData);

        

    let text = chartGroup.selectAll("g circles")
        .data(stateData)
        .enter()
        .append("text")
        .attr("dx", d => xLinearScale(d.poverty))
        .attr("dy", d => yLinearScale(d.healthcare)+ 15/2.5)
        .text(function(d) {
            return d.abbr;
        })
        .classed("stateText", true);

    // Creating axes labels
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margins.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Percentage with Healthcare");

    chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margins.top + 30})`)
    .attr("class", "axisText")
    .text("Percentage in Poverty");
    }).catch(function(error) {
    console.log(error);
});






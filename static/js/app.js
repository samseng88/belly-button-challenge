// Use the D3 library to read in samples.json.
d3.json("samples.json").then(function createPlotly(data) {
  console.log(data);
  var testid = data.names;
  console.log(testid);

  // Create a dropdown menu
  d3.select("#selDataset")
    .selectAll("option")
    .data(testid)
    .enter()
    .append("option")
    .html(function(d) {
      return `<option>${d}</option`;
    });

  // Retrive the selected option and get index
  var dropDownMenu = d3.select("#selDataset");
  var dropDownValue = dropDownMenu.property("value");
  var index = testid.indexOf(dropDownValue);

// Create a bar graph using index
var bellyData = data.samples[index].sample_values
.slice(0, 10)
.reverse();
var DataSamples = data.samples[index].otu_ids.slice(0, 10).reverse();
var bar_labels = data.samples[index].otu_labels.slice(0, 10).reverse();
var yaxis = DataSamples.map(a => "OTU" + a);

var bardata = [
{
x: bellyData,
y: yaxis,
type: "bar",
orientation: "h",
text: bar_labels
}
];

var barLayout = {
title: "TOP 10 Sample Values",
xaxis: { title: "Sample Values" },
yaxis: { title: "OTU ID" }
};

Plotly.newPlot("bar", bardata, barLayout);

// Create bubble chart
var bubbleData = [
{
  x: data.samples[index].otu_ids,
  y: data.samples[index].sample_values,
  mode: "markers",
  text: data.samples[index].otu_labels,
  marker: {
    size: data.samples[index].sample_values,
    color: data.samples[index].otu_ids,
    colorscale: "Rainbow"
  }
}
];

var bubbleLabels = {
xaxis: { title: "OTU ID" },
yaxis: { title: "Sample Values" }
};

Plotly.newPlot("bubble", bubbleData, bubbleLabels);

// Create demographic info
d3.select("#sample-metadata").html("");
d3.select("#sample-metadata")
.selectAll("p")
.data(Object.entries(data.metadata[index]))
.enter()
.append("p")
.html(function(d) {
  return `${d[0]} : ${d[1]}`;
});

console.log(Object.entries(data.metadata[index]));

// Select different Data
d3.select("#selDataset").on("change", optionChanged);

function optionChanged() {
console.log("Different item was selected.");
var dropDownMenu = d3.select("#selDataset");
var dropDownValue = dropDownMenu.property("value");
console.log(`Currently test id ${dropDownValue} is shown on the page`);

// Update graph
createPlotly(data);
}
}
);
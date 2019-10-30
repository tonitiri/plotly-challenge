// Plot the default route once the page loads
/* data route */




function buildMetadata(sample) {
  d3.json(`/metadata/${sample}`).then((data) => {
    var metapanel = d3.select("#sample-metadata");
    metapanel.html("")
    Object.entries(data).forEach(([key, value]) => {
      metapanel.append("h6").text(`${key} : ${value}`)
    })

  });


  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  // Use d3 to select the panel with id of `#sample-metadata`

  // Use `.html("") to clear any existing metadata

  // Use `Object.entries` to add each key and value pair to the panel
  // Hint: Inside the loop, you will need to use d3 to append new
  // tags for each key-value in the metadata.

  // BONUS: Build the Gauge Chart
  // buildGauge(data.WFREQ);
}

function buildCharts(sample) {
  d3.json(`/samples/${sample}`).then((data) => {
    var otu_ids = data.otu_ids
    var sample_values = data.sample_values
    var otu_labels = data.otu_labels

    var trace = [{
      type: "pie",
      name: "Metadata Pie",
      labels: otu_ids.slice(0, 10),
      values: sample_values.slice(0, 10),
      hovertext: otu_labels.slice(0, 10)
    }]

    Plotly.newPlot("pie", trace);

    var trace1 = [{
      type: "scatter",
      mode: "markers",
      name: "Metadata Scatterplot",
      x: otu_ids,
      y: sample_values,
      hovertext: otu_labels,
      marker: {
        color: otu_ids,
        size: sample_values,

      },


    }]

    Plotly.newPlot("bubble", trace1);

  });

  // @TODO: Use `d3.json` to fetch the sample data for the plots

  // @TODO: Build a Bubble Chart using the sample data

  // @TODO: Build a Pie Chart
  // HINT: You will need to use slice() to grab the top 10 sample_values,
  // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

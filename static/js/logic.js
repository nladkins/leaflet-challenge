// Create map, giving it the topography to display on load.
var myMap = L.map("map", {
  center: [
    0, 0
  ],
  // Closest to Global view
  zoom: 2.5,
  layer: [street, topo]
});

// Create the base layers.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap);


// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

// Identifying colors for the Depth
function chooseColor(depth) {
  if (depth >= 100) return "red";
  else if (depth >= 50) return "orange";
  else if (depth >= 10) return "yellow";
  else return "green";
}

// Perform a GET request to the query URL
d3.json(queryUrl).then(function (data) {
  // Send the data.features object to the createFeatures function.
  L.geoJSON(data, {
    
    // Markers
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    
    // Styling
    style: function(feature, latlng) {
      return {
      // Add circles to the map.
      fillOpacity: 0.75,

      // Colors based on Depth as specified by the for loop above.
      fillColor: chooseColor([feature.geometry.coordinates[2]]),

      // Adjust the radius to be proportional to the magnitude of the earthquake
      radius: feature.properties.mag * 2.1,
      }
    },
    
    // Apply the Features.
    onEachFeature: function(feature, layer) {
      
      // Apply the Popup once the marker is clicked.
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>
      <h3>${new Date(feature.properties.time)}</h3>
      <h3>Magnitude: ${feature.properties.mag}</h3>
      <h3>Depth: ${feature.geometry.coordinates[2]}</h3>
      <p>More Info <br>${feature.properties.url}</p>`)
    }

  // Add all elements above to the map (myMap).
  }).addTo(myMap);

  // Set up the legend.
  var legend = L.control({
    position: "bottomright"
  });

  // Insert the html for the legend.
  legend.onAdd = function() {
    var div = L
      .DomUtil
      .create("div", "info legend");
   
    // Identify the depth categories which also reflect the for loop.
    var depth = [
    "Greater than or equal to 100km Depth", 
    "Greater than or equal to 50km Depth", 
    "Greater than or equal to 10km Depth", 
    "Less than 10km Depth"
    ];

    // Assign colors based on the depth categories.
    var colors = ["red", "orange", "yellow", "green"];

    // For loop to loop through the lists above for the legend.
    for (var i = 0; i < depth.length; i++) {
      div.innerHTML += '<i style="background:' + colors[i] + '"></i> ' +
        depth[i] + (depth[i + 1] ? "<br>": "");
    }
    // Returns this into the html.
    return div;
  };

  // Adding Legend to the map
  legend.addTo(myMap);
  
});
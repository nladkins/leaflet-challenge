// Create map, giving it the topography to display on load.
var myMap = L.map("map", {
  center: [
    0, 0
  ],
  zoom: 2.4,
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


function chooseColor(depth) {
  if (depth <= 10) return "light yellow";
  else if (depth <= 20) return "orange";
  else return"red";
}

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  L.geoJSON(data, {
    
    style: function(feature, latlng) {
      // Add circles to the map.
      L.circleMarker([feature.geometry.coordinates[0], feature.geometry.coordinates[1]], {
        fillOpacity: 0.75,
        color: "white",
        fillColor: chooseColor(feature.geometry.coordinates[2]),
        weight: feature.geometry.coordinates[2],
        // Adjust the radius.
        radius: feature.properties.mag * 100
      })
    },

    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    
    onEachFeature: function(feature, layer) {
      
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>
      <h3>${new Date(feature.properties.time)}</h3>
      <h3>Magnitude: ${feature.properties.mag}</h3>
      <p>More Info <br>${feature.properties.url}</p>`)
    }

  }).addTo(myMap);

});

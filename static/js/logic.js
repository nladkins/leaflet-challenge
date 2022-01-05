// Create map, giving it the topography to display on load.
var myMap = L.map("map", {
  center: [
    0, 0
  ],
  zoom: 2.4,
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


function chooseColor(mag) {
  if (mag <= 5) return "light yellow";
  else if (mag <= 6.5) return "orange";
  else return"red";
}

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  L.geoJSON(data, {
    
    style: function(feature) {
      // Add circles to the map.
      L.circle([data.features.geometry.coordinates[0], data.features.geometry.coordinates[1]], {
        fillOpacity: 0.75,
        color: "white",
        fillColor: chooseColor(feature.properties.mag),
        // Adjust the radius.
        radius: Math.sqrt(data.features.geometry.coordinates[2] * 1000)
      }).bindPopup(`<h3>${data.features.properties.place}</h3><hr>
      <h3>${new Date(data.features.properties.time)}</h3>
      <h3>Magnitude: ${data.features.properties.mag}</h3>
      <p>More Info <br>${data.features.properties.url}</p>`
      )
    },

    onEachFeature: function(feature, layer) {
      // Set the mouse events to change the map styling.
      // layer.on({
      //   // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
      //   mouseover: function(event) {
      //     layer = event.target;
      //     layer.setStyle({
      //       fillOpacity: 0.9
      //     });
      //   },
      //   // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
      //   mouseout: function(event) {
      //     layer = event.target;
      //     layer.setStyle({
      //       fillOpacity: 0.5
      //     });
      //   },
      //   // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
      //   // click: function(event) {
      //   //   myMap.fitBounds(event.target.getBounds());
      //   // }
      // });
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>
      <h3>${new Date(feature.properties.time)}</h3>
      <h3>Magnitude: ${feature.properties.mag}</h3>
      <p>More Info <br>${feature.properties.url}</p>`)
    }

  }).addTo(myMap);;
});

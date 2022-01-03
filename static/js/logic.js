// Store our API endpoint as queryUrl.
var queryUrl1 = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl1).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }
  
    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
    });
  
    // Send our earthquakes layer to the createMap function/
    createMap(earthquakes);
}




// Store our API endpoint as queryUrl.
var queryUrl2 = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

// Perform a GET request to the query URL/
d3.json(queryUrl2).then(function (plate) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(plate.features);
});





function markerSize(mag) {
    return Math.sqrt(mag) * 50;
  }
  
  // An array that contains all the information needed to create city and state markers
  var mag = data.features.mag
  var depth = data.features.geometry.coordinates[2]
  
  // Define arrays to hold the created city and state markers.
  var magMarkers = [];
  var plateMarkers = [];
  
  // Loop through locations, and create the city and state markers.
  for (var i = 0; i < plate.features.length; i++) {
    // Setting the marker radius for the state by passing population into the markerSize function
    plateMarkers.push(
      L.polyline(plate.features[i].geometry.coordinates, {
        stroke: false,
        fillOpacity: 0.75,
        color: "white",
        fillColor: "white",
        radius: markerSize(data.features[i].state.population)
      })
    );
  
    // Set the marker radius for the city by passing the population to the markerSize() function.
    magMarkers.push(
      L.circle(data.features[i].length, {
        stroke: false,
        fillOpacity: 0.75,
        color: "purple",
        fillColor: "purple",
        radius: markerSize(data.features[i].properties.mag)
      })
    );
  }
  
  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })
  
  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
  
  // Create two separate layer groups: one for the city markers and another for the state markers.
  var plates = L.layerGroup(stateMarkers);
  var mags = L.layerGroup(magMarkers);
  
  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };
  
  // Create an overlay object.
  var overlayMaps = {
    "State Population": states,
    "City Population": cities
  };
  
  // Define a map object.
  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [street, states, cities]
  });
  
  // Pass our map layers to our layer control.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }

    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
    });

    // Send our earthquakes layer to the createMap function/
    createMap(earthquakes);


    




// // Store our API endpoint as queryUrl.
// var queryUrl2 = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

// // Perform a GET request to the query URL/
// d3.json(queryUrl2).then(function (plates) {
//   // Once we get a response, send the data.features object to the createFeatures function.
//   createFeatures(plates.features);
//   function plateColor(name) {
//     if (name == "Africa") return "orange"
//     else if (name == "Antarctica") return "yellow"
//     else if (name == "Somalia") return "red"
//     else if (name == "India") return "pink"
//     else if (name == "Australia") return "pink"
//     else if (name == "Eurasia") return "pink"
//     else if (name == "North America") return "pink"
//     else if (name == "South America") return "pink"
//     else if (name == "Nazka") return "pink"
//     else if (name == "Pacific") return "pink"
//     else if (name == "Arabia") return "pink"
//     else if (name == "Sunda") return "pink"
//     else if (name == "Timor") return "pink"
//     else if (name == "Kermadec") return "pink"
//     else if (name == "Tonga") return "pink"
//     else if (name == "Woodlark") return "pink"
//     else if (name == "Maoke") return "pink"
//     else if (name == "South Bismarck") return "pink"
//     else if (name == "Solomon Sea") return "pink"
//     else if (name == "North Bismarck") return "pink"
//     else if (name == "New Hebrides") return "pink"
//     else if (name == "Caribbean") return "pink"
//     else if (name == "Cocos") return "pink"
//     else if (name == "Okhotsk") return "pink"
//     else if (name == "Juan de Fuca") return "pink"
//     else if (name == "Altiplano") return "pink"
//     else if (name == "North Andes") return "pink"
//     else if (name == "Okinawa") return "pink"
//     else if (name == "Philippine Sea") return "pink"
//     else if (name == "Amur") return "pink"
//     else if (name == "Caroline") return "pink"
//     else if (name == "Mariana") return "pink"
//     else if (name == "Futuna") return "pink"
//     else if (name == "Scotia") return "pink"
//     else if (name == "Shetland") return "pink"
//     else if (name == "Aegean Sea") return "pink"
//     else if (name == "Anatolia") return "pink"
//     else if (name == "Yangtze") return "pink"
//     else if (name == "Burma") return "pink"
//     else if (name == "Rivera") return "pink"
//     else if (name == "Birds Head") return "pink"
//     else if (name == "Molucca Sea") return "pink"
//     else if (name == "Banda Sea") return "pink"
//     else if (name == "Manus") return "pink"
//     else if (name == "Conway Reef") return "pink"
//     else if (name == "Balmoral Reef") return "pink"
//     else if (name == "Easter") return "pink"
//     else if (name == "Juan Fernandez") return "pink"
//     else if (name == "Galapagos") return "pink"
//     else if (name == "Sandwich") return "pink"
//     else if (name == "Panama") return "pink"
//     else return "purple"
//   }
// })

// function createFeatures(plateData) {

//   // Define a function that we want to run once for each feature in the features array.
//   // Give each feature a popup that describes the place and time of the earthquake.
//   function onEachFeature(feature, layer) {
//     layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
//   }

//   // Create a GeoJSON layer that contains the features array on the earthquakeData object.
//   // Run the onEachFeature function once for each piece of data in the array.
//   var earthquakes = L.geoJSON(earthquakeData, {
//     onEachFeature: onEachFeature
//   });

//   // Send our earthquakes layer to the createMap function/
//   createMap(earthquakes);
// }

function createMap(earthquakes) {

  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      0, 0
    ],
    zoom: 2.4,
    layers: [topo, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}



// // Create the tile layer that will be the background of our map.
// var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// });

// // Initialize all the LayerGroups that we'll use.
// var layers = {
//   MAGNITUDE: new L.LayerGroup(),
//   DEPTH: new L.LayerGroup(),
//   COORDINATES: new L.LayerGroup(),
//   PLATE_NAME: new L.LayerGroup()
// };

// // Create the map with our layers.
// var map = L.map("map-id", {
//   center: [40.73, -74.0059],
//   zoom: 12,
//   layers: [
//     layers.MAGNITUDE,
//     layers.DEPTH,
//     layers.COORDINATES,
//     layers.PLATE_NAME
//   ]
// });

// // Add our "streetmap" tile layer to the map.
// streetmap.addTo(map);

// // Create an overlays object to add to the layer control.
// var overlays = {
//     "Magnitude": layers.MAGNITUDE,
//     "Depth": layers.DEPTH,
//     "Coordinates": layers.COORDINATES,
//     "Plate Name": layers.PLATE_NAME
// };

// // Create a control for our layers, and add our overlays to it.
// L.control.layers(null, overlays).addTo(map);

// // Create a legend to display information about our map.
// var info = L.control({
//   position: "bottomright"
// });

// // When the layer control is added, insert a div with the class of "legend".
// info.onAdd = function() {
//     var div = L.DomUtil.create("div", "legend");
//     return div;
// };

// // Initialize an object that contains icons for each layer group.
// var icons = {
//     MAGNITUDE: L.ExtraMarkers.icon({
//       icon: "ion-settings",
//       iconColor: "white",
//       markerColor: "yellow",
//       shape: "star"
//     }),
//     DEPTH: L.ExtraMarkers.icon({
//       icon: "ion-android-bicycle",
//       iconColor: "white",
//       markerColor: "red",
//       shape: "circle"
//     }),
//     COORDINATES: L.ExtraMarkers.icon({
//       icon: "ion-minus-circled",
//       iconColor: "white",
//       markerColor: "blue-dark",
//       shape: "penta"
//     }),
//     PLATE_NAME: L.ExtraMarkers.icon({
//       icon: "ion-android-bicycle",
//       iconColor: "white",
//       markerColor: "orange",
//       shape: "circle"
//     }),
//     NORMAL: L.ExtraMarkers.icon({
//       icon: "ion-android-bicycle",
//       iconColor: "white",
//       markerColor: "green",
//       shape: "circle"
//     })
// };

// // Add the info legend to the map.
// info.addTo(map);

// // Store our API endpoint as queryUrl.
// var queryUrl1 = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";
// var queryUrl2 = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"

// // Perform an API call to the 4.5 earthquake information endpoint.
// d3.json(queryUrl1).then(function(earthquakes) {

//   // When the first API call completes, perform another call to the tectonic plates endpoint.
//     d3.json(queryUrl2).then(function(plates) {
//         var updatedAt = earthquakes.metadata.generated
//         var earthquakeInfo = earthquakes.features;
//         var plateInfo = plates.features;
//         var quakeLocation = earthquake.features.geometry;
//         var plateLocation = plates.features.geometry;

//     // Create an object to keep the number of markers in each layer.
//     var earthquakeData = {
//         MAGNITUDE: 0,
//         DEPTH: 0,
//         COORDINATES: 0,
//         PLATE_NAME: 0,
//         };
//     // Initialize Locations, which will be used as a key to access the appropriate layers, icons, and station count for the layer group.
//     var locations;

//     // Loop through the stations (they're the same size and have partially matching data).
//     for (var i = 0; i < quakeLocation.length; i++) {

//         var newMarker = L.marker([geometry.coordinates], {
//         icon: icons[locations]
//         });

//         // Add the new marker to the appropriate layer.
//         newMarker.addTo(layers[locations]);

//         // Bind a popup to the marker that will  display on being clicked. This will be rendered as HTML.
//         newMarker.bindPopup(features.properties.place + "<br> Plate: " + features.properties.PlateName + "<br>" + features.properties.mag + " Magnitude" + "<br>" + features.bbox[5] + "Depth");
//     }

//     // Call the updateLegend function, which will update the legend!
//     updateLegend(updatedAt, earthquakeData);
//     });
// })

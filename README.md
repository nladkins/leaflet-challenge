# Earthquakes across the Globe

## Background

Many earthquakes occur everyday that are often unfelt and/or unreported.  The United States Geolocial Survey (USGS) tracks data on earthquakes through the use of tools.  A variety of data is published by the USGS that can be used by the public.  THis wealth of data can be difficult to visualize, especially as it is a continuous set of growing data.  The purpose of this repository is to provide visualization of the last seven days worth of earthquake data for those that are at a magnitude of 4.5 on the rhicter scale or higher.

## Technology

The technology used by this repository include HTML, CSS for styling, and JavaScript, more specifically Leaflet.  Leaflet is a library that can support the visualization of geographic data.  In this case, Leaflet was used to plot the locations of earthquakes with a magnitude over 4.5 using circles.  The radius of each circle is based on the magnitude.  The highter the magnitude, the bigger the circle.  The color is assigned using a for loop based on the depth in kilometers (km).  Further, a legend has been applied to illustrate the meaning of the colors and the number of kilometers they reflect.  

## Additional Information

All code is commented for anyone interested in this repository.
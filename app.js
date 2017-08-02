require.config({
  // define paths to where all of our dependencies live
  paths: {
    'leaflet': 'node_modules/leaflet/dist/leaflet',
    'esri-leaflet': 'node_modules/esri-leaflet/dist/esri-leaflet',
    'esri-leaflet-geocoder': 'node_modules/esri-leaflet-geocoder/dist/esri-leaflet-geocoder',
    'proj4': 'https://unpkg.com/proj4@2.4.3/dist/proj4-src',
    'proj4leaflet': 'https://unpkg.com/proj4leaflet@1.0.1/lib/proj4'
  }
});

// require all dependencies, we still need to require our leaflet-heat and leaflet-markercluster modules so they load
require([
  'leaflet',
  'esri-leaflet',
  'esri-leaflet-geocoder',
  'proj4',
  'proj4leaflet'

], function (L, esri, geocoding, proj4, proj4leaflet) {

  // since leaflet is bundled into the npm package it won't be able to detect where the images
  // solution is to point it to where you host the the leaflet images yourself
  L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.1.0/dist/images/';

  // create map
  var map = L.map('map').setView([45.526, -122.667], 15);

  // add basemap
  esri.basemapLayer('Topographic').addTo(map);

  // add layer
  esri.featureLayer({
    url: 'https://services.arcgis.com/uCXeTVveQzP4IIcx/arcgis/rest/services/gisday/FeatureServer/0/'
  }).addTo(map);

  // add search control
  geocoding.geosearch({
    providers: [
      geocoding.arcgisOnlineProvider(),
      geocoding.featureLayerProvider({
        url: 'https://services.arcgis.com/uCXeTVveQzP4IIcx/arcgis/rest/services/gisday/FeatureServer/0/',
        searchFields: ['Name', 'Organization'],
        label: 'GIS Day Events',
        bufferRadius: 20000,
        formatSuggestion: function (feature) {
          return feature.properties.Name + ' - ' + feature.properties.Organization;
        }
      })
    ]
  }).addTo(map);

  console.log(proj4);
  console.log(proj4leaflet);
});

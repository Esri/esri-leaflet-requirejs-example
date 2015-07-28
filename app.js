require.config({
  // define paths to where all of our dependencies live
  paths: {
    'leaflet': 'node_modules/leaflet/dist/leaflet',
    'esri-leaflet': 'node_modules/esri-leaflet/dist/esri-leaflet',
    'esri-leaflet-geocoder': 'node_modules/esri-leaflet-geocoder/dist/esri-leaflet-geocoder'
  }
});

// require all dependencies, we still need to require our leaflet-heat and leaflet-markercluster modules so they load
require([
  'leaflet',
  'esri-leaflet',
  'esri-leaflet-geocoder'
], function (L, esri, geocoding) {

  // since leaflet is bundled into the npm package it won't be able to detect where the images
  // solution is to point it to where you host the the leaflet images yourself
  L.Icon.Default.imagePath = 'http://cdn.leafletjs.com/leaflet-0.7.3/images';

  // create map
  var map = L.map('map').setView([45.526, -122.667], 15);

  // add basemap
  esri.basemapLayer('Topographic').addTo(map);

  // add layer
  esri.featureLayer({
    url: '//services.arcgis.com/uCXeTVveQzP4IIcx/arcgis/rest/services/gisday/FeatureServer/0/'
  }).addTo(map);

  // add search control
  geocoding.geosearch({
    providers: [
      geocoding.arcgisOnlineProvider(),
      geocoding.featureLayerProvider({
        url: '//services.arcgis.com/uCXeTVveQzP4IIcx/arcgis/rest/services/gisday/FeatureServer/0/',
        searchFields: ['Name', 'Organization'],
        label: 'GIS Day Events',
        bufferRadius: 20000,
        formatSuggestion: function (feature) {
          return feature.properties.Name + ' - ' + feature.properties.Organization;
        }
      })
    ]
  }).addTo(map);
});

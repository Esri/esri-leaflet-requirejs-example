require.config({
  // define paths to where all of our dependencies live
  paths: {
    'leaflet': 'node_modules/leaflet/dist/leaflet',
    'esri-leaflet': 'node_modules/esri-leaflet/dist/esri-leaflet',
    'esri-leaflet-clustered-feature-layer': 'node_modules/esri-leaflet-clustered-feature-layer/dist/esri-leaflet-clustered-feature-layer-src',
    'esri-leaflet-heatmap-feature-layer': 'node_modules/esri-leaflet-heatmap-feature-layer/dist/esri-leaflet-heatmap-feature-layer-src',
    'leaflet-heat': 'node_modules/leaflet.heat/dist/leaflet-heat',
    'leaflet-markercluster': 'node_modules/leaflet.markercluster/dist/leaflet.markercluster'
  },

  // since Leaflet.heat and Leaflet.markercluster are not wrapped for AMD we need to use a shim config
  // see http://requirejs.org/docs/api.html#config-shim for more info
  shim: {
    'leaflet': {
      exports: 'L'
    },
    'leaflet-heat': {
      deps: ['leaflet'],
    },
    'leaflet-markercluster': {
      deps: ['leaflet'],
    }
  }
});

// require all dependencies, we still need to require our leaflet-heat and leaflet-markercluster modules so they load
require([
  'leaflet',
  'esri-leaflet',
  'esri-leaflet-clustered-feature-layer',
  'esri-leaflet-heatmap-feature-layer',
  'leaflet-heat',
  'leaflet-markercluster'
], function (L, Esri, ClusteredFeatureLayer, HeatmapFeatureLayer) {

  // start coding!
  var map = L.map('map').setView([45.526, -122.667], 15);
  var tiles = new Esri.BasemapLayer('Topographic').addTo(map);

  var features = new Esri.FeatureLayer('http://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Trimet_Transit_Stops/FeatureServer/0').addTo(map);
  // var clusters = new ClusteredFeatureLayer('http://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Trimet_Transit_Stops/FeatureServer/0').addTo(map);
  // var heatmap = new HeatmapFeatureLayer('http://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Trimet_Transit_Stops/FeatureServer/0').addTo(map);
});
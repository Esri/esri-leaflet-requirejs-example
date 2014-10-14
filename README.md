# Esri Leaflet Browserify Example

Example of using [Leaflet](http://leafletjs.com) and [Esri Leaflet](http://esri.github.io/esri-leaflet/) with [Browserify](http://browserify.org/)!

1. [Fork and clone this repo](https://help.github.com/articles/fork-a-repo)
2. `cd` into `esri-leaflet-browserify-example`
3. Install dependencies with `npm install`
4. Open `index.html` in your browser.

*Note*: Shim configs may or may not work with the r.js build optimizer. So you will not be able to build this project with r.js. See "Important notes for "shim" config" in http://requirejs.org/docs/api.html#config-shim. In order to support r.js all dependant modules need to properly handle the fact that browser globals may not exist.
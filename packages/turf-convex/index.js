var each = require('turf-meta').coordEach,
    convexHull = require('convex-hull'),
    polygon = require('turf-helpers').polygon;

/**
 * Takes a set of {@link Point|points} and returns a
 * [convex hull](http://en.wikipedia.org/wiki/Convex_hull) polygon.
 *
 * Internally this uses
 * the [convex-hull](https://github.com/mikolalysenko/convex-hull) module that
 * implements a [monotone chain hull](http://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain).
 *
 * @module turf/convex
 * @category transformation
 * @param {FeatureCollection<Point>} input input points
 * @returns {Feature<Polygon>} a convex hull
 * @example
 * var points = {
 *   "type": "FeatureCollection",
 *   "features": [
 *     {
 *       "type": "Feature",
 *       "properties": {},
 *       "geometry": {
 *         "type": "Point",
 *         "coordinates": [10.195312, 43.755225]
 *       }
 *     }, {
 *       "type": "Feature",
 *       "properties": {},
 *       "geometry": {
 *         "type": "Point",
 *         "coordinates": [10.404052, 43.8424511]
 *       }
 *     }, {
 *       "type": "Feature",
 *       "properties": {},
 *       "geometry": {
 *         "type": "Point",
 *         "coordinates": [10.579833, 43.659924]
 *       }
 *     }, {
 *       "type": "Feature",
 *       "properties": {},
 *       "geometry": {
 *         "type": "Point",
 *         "coordinates": [10.360107, 43.516688]
 *       }
 *     }, {
 *       "type": "Feature",
 *       "properties": {},
 *       "geometry": {
 *         "type": "Point",
 *         "coordinates": [10.14038, 43.588348]
 *       }
 *     }, {
 *       "type": "Feature",
 *       "properties": {},
 *       "geometry": {
 *         "type": "Point",
 *         "coordinates": [10.195312, 43.755225]
 *       }
 *     }
 *   ]
 * };
 *
 * var hull = turf.convex(points);
 *
 * var resultFeatures = points.features.concat(hull);
 * var result = {
 *   "type": "FeatureCollection",
 *   "features": resultFeatures
 * };
 *
 * //=result
 */
module.exports = function (fc) {
    var points = [];
    each(fc, function (coord) { points.push(coord); });
    var hull = convexHull(points);
    if (hull.length > 0) {
        var ring = [];
        for (var i = 0; i < hull.length; i++) {
            ring.push(points[hull[i][0]]);
        }
        ring.push(points[hull[hull.length - 1][1]]);
        return polygon([ring]);
    }
    return undefined;
};

module.exports = {
    /* Source code adapted from: http://www.movable-type.co.uk/scripts/latlong.html */

/**
 * Compute the distance in km between 2 positions on the sphere
 * @param {number} lat1 - The latitude of the first position.
 * @param {number} lon1 - The longitude of the first position.
 * @param {number} lat2 - The latitude of the second position.
 * @param {number} lon2 - The longitude of the second position.
 * @return {number} The distance in km between the 2 positions.
 */
     getDistanceFromLatLonInKm : function(lat1, lon1, lat2, lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2 - lat1); // deg2rad below
    let dLon = deg2rad(lon2 - lon1);
    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
    }
}
/**
 * Convert degrees into radians.
 * @param {number} deg - degree to convert.
 * @return {number} converted value in radian.
 */
 function deg2rad(deg) {
    return deg * (Math.PI / 180)

};


/**
 * Calculates the position of a point on the circumference of a circle given the circle center and radius.
 * 
 * @param {number} angle angle in radians
 * @param {number} radius radius in pixels
 * @param {Object} center coordinates of the center
 * 
 * @returns {Object} x and y coordinates of the calculated point
 */
export function angleToCoords(angle, radius, center) {

    // Move the angle 90° left; this effectively means that we interpret an angle of 0
    // as indicating the topmost point on the circle, not the rightmost one.
    angle -= Math.PI / 2;

    return {
        x: radius * Math.cos(angle) + center.x,
        y: radius * Math.sin(angle) + center.y
    };
}
export const DEFAULT_HEADER_TYPE = 'h2';   // Default type of the chart title element

export const LABEL_POSITION = 0.75;        // 0 = pie center; 1 = outer edge

export const INACTIVE_SLICE_SIZE = 0.9;    // Relative to full radius

export const LEADING_COLOR = '#6A5ACD';    // Note: can be overriden

export const MAX_LIGHTEN_STRENGTH = 0.5;   // Max strength of the lightening filter applied to the leading color

export const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

/* Note: these could be anything, really, as the resulting <svg> can be easily resized in CSS */
export const VIEWBOX_SIZE = 100;            // Make it slightly bigger than the radius to accommodate for bouncy transition effects

export const PIE_CENTER = {
    x: 50,
    y: 50
};

const PIE_RADIUS = 48;              // Base radius of the pie chart (relative to the view box)

export default {
    LABEL_POSITION,
    INACTIVE_SLICE_SIZE,
    LEADING_COLOR,
    MAX_LIGHTEN_STRENGTH,
    SVG_NAMESPACE,
    VIEWBOX_SIZE,
    PIE_CENTER,
    PIE_RADIUS
}
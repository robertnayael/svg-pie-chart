import Color from 'Color';
import random from 'lodash.random';
import round from 'lodash.round';

import PieSlice from './PieSlice';
import elements from './elementFactory';
import {
    LABEL_POSITION,
    LEADING_COLOR,
    INACTIVE_SLICE_SIZE,
    MAX_LIGHTEN_STRENGTH,
    PIE_RADIUS
} from './settings';


export default function PieChart(parentNode) {

    const svg = elements.svg();
    const details = elements.detailsWrapper();
    const style = getStyle();

    parentNode.appendChild(svg);
    parentNode.appendChild(details);

    this.title;
    this.slices = [];

    this.loadData = function( { title, title_element, data = {}, leading_color = LEADING_COLOR } ) {
        const valueTotal = Object.values(data)
            .reduce( (total, current) => total + current, 0);

        this.clearElements();

        const colors = getColorDictionary(data, leading_color);

        this.slices = createSlices(
            Object.entries(data)
                .map( ( [name, value] ) => ({
                    name,
                    value: {
                        absolute: value,
                        proportional: value / valueTotal
                    },
                    color: colors[name]
                }) )
        );

        this.title = elements.title(title, title_element);
        this.addTitle();
        addSlices(this.slices);
        attachListeners(this.slices);
    }

    this.clearElements = function() {
        const removeChildren = parent => { while (parent.firstChild) parent.removeChild(parent.firstChild) };

        if (this.title) parentNode.removeChild(this.title);
        removeChildren(svg);
        removeChildren(details);
    }

    this.addTitle = function() {
        parentNode.insertBefore(this.title, svg);
    }

    function getStyle() {
        const style = getComputedStyle(svg);
        return {
            labelPosition: style.getPropertyValue('--chart-label-position') || LABEL_POSITION,
            leadingColor: style.getPropertyValue('--chart-leading-color') || LEADING_COLOR,
            inactiveSliceSize: style.getPropertyValue('--chart-inactive-slice-size') || INACTIVE_SLICE_SIZE,
        };
    }

    function createSlices(data) {
        const radius = {
            expanded: PIE_RADIUS,
            reduced: PIE_RADIUS * style.inactiveSliceSize,
        };
        let startAngle = 0;

        return data.map(slice => {
            const sliceAngle = slice.value.proportional * Math.PI * 2;
            const pieSlice = new PieSlice({
                sliceAngle,
                startAngle,
                radius,
                labelPosition: style.labelPosition,
                ...slice
            });
            startAngle += sliceAngle;
            return pieSlice;
        });
    }

    /**
     * Assigns unique colors to all data slices based on their value:
     *     the higher the value, the closer its color is to the base leading color;
     *     the lower the value, the lighter the leading color becomes.
     * The slice with the highest value receives the unmodified leading color.
     * 
     * @param {Object} data pie chart slices
     * @param {string} leadingColor leading color in hex notation
     * 
     * @return {Object} dictionary of slice names and their colors
     */
    function getColorDictionary(data, leadingColor) {
        const itemCount = Object.keys(data).length;
        const brightnessStep = MAX_LIGHTEN_STRENGTH / (itemCount - 1);

        return Object.entries(data)
            .map( ( [item, value] ) => ({item, value}) )
            .sort( (a, b) => a.value < b.value )
            .reduce ( (dictionary, {item}, index) => {
                dictionary[item] = index > 0
                    ? Color(leadingColor)
                        .lighten(index * brightnessStep)
                        .saturate(index * brightnessStep)
                        .hexString()
                    : leadingColor;
                return dictionary;
            }, {});
    }

    function addSlices(slices) {
        slices.forEach(slice => {
            svg.appendChild(slice.path);
            svg.appendChild(slice.label);
            details.appendChild(slice.tooltip);
        });
    }

    function attachListeners(slices) {
        slices.forEach(slice => {
            slice.path.addEventListener('mouseout', () => {
                slice.contractPath();
                slice.hideDetails();
                slices.filter(otherSlice => otherSlice !== slice)
                    .forEach(otherSlice => otherSlice.undimPath());
            });

            slice.path.addEventListener('mouseenter', () => {
                slice.expandPath();
                slice.showDetails();
                slices.filter(otherSlice => otherSlice !== slice)
                    .forEach(otherSlice => otherSlice.dimPath());
            });
        });
    }

}





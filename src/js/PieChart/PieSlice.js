import elements from './elementFactory';
import { angleToCoords } from './helpers';
import { PIE_CENTER } from './settings';

export default class PieSlice {
    
    constructor( {name, color, value, sliceAngle, startAngle, radius, labelPosition } ) {
        this.props = arguments[0];

        this.path = elements.slicePath();
        this.label = elements.sliceLabel({
            value,
            position: angleToCoords(startAngle + 0.5 * sliceAngle, radius.reduced * labelPosition, PIE_CENTER)
        });
        this.tooltip = elements.sliceDetails( {name, color, value} );

        this.contractPath();

    }

    /**
     * Plots the path element in its full version (slightly larger than the others)
     */
    expandPath() {
        this.plotPath(this.props.radius.expanded);
    };

    /**
     * Plots the path element in a smaller version.
     */
    contractPath() {
        this.plotPath(this.props.radius.reduced);
        this.path.setAttribute('fill', this.props.color);
    };

    /**
     * Applies the 'is-dimmed' modifier class to the path element.
     */
    dimPath() {
        this.path.classList.add('is-dimmed');
    }

    /**
     * Removes the 'is-dimmed' modifier class from the path element.
     */
    undimPath() {
        this.path.classList.remove('is-dimmed');
    }

    showDetails() {
        this.tooltip.classList.add('is-active');
    }

    hideDetails() {
        this.tooltip.classList.remove('is-active');
    }

    /**
     * Plots the slice path as an arc of a circle with the specified radius.
     * @param {number} radius radius of the circle
     */
    plotPath(radius) {

        const { sliceAngle, startAngle } = this.props;
    
        if (sliceAngle >= Math.PI * 2) console.log('this is a full circle!');

        const arcStart = angleToCoords(startAngle, radius, PIE_CENTER);
        const arcEnd = angleToCoords(startAngle + sliceAngle, radius, PIE_CENTER);
    
        // As per https://www.w3.org/TR/SVG11/paths.html#PathDataEllipticalArcCommands
        const arc = {
            rx: arcStart.x,
            ry: arcStart.y,
            xAxisRotation: 0,
            largeArcFlag: Number(sliceAngle > Math.PI), 
            sweepFlag: 1,
            x: arcEnd.x,
            y: arcEnd.y
        };

        this.path.setAttribute('d',
            `M${arc.rx} ${arc.ry}
            A ${radius} ${radius} ${arc.xAxisRotation} ${arc.largeArcFlag} ${arc.sweepFlag} ${arc.x} ${arc.y}
            L ${PIE_CENTER.x} ${PIE_CENTER.y} ZZ`
        );
    }

}
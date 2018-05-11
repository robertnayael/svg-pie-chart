import round from 'lodash.round';
import { SVG_NAMESPACE } from '../settings';

export default function sliceLabel( { position, value } ) {
    const label = document.createElementNS(SVG_NAMESPACE, 'text');
    label.classList.add('chart__label');

    label.setAttribute('x', position.x);
    label.setAttribute('y', position.y);
    label.setAttribute('fill', '#000');
    label.textContent = `${round(value.proportional * 100, 1)}%`;

    return label;
}
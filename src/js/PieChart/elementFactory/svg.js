import { SVG_NAMESPACE, VIEWBOX_SIZE } from '../settings';

export default function svg() {

    const svg = document.createElementNS(SVG_NAMESPACE, 'svg');
    svg.setAttribute('viewBox', `0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`);
    svg.setAttribute('width', VIEWBOX_SIZE);
    svg.setAttribute('height', VIEWBOX_SIZE);
    svg.classList.add('chart__pie');

    // Chart data is available inside tooltips anyway,
    // so no need to describe the SVG and its contents for screenreaders.
    svg.setAttribute('aria-hidden', true);

    return svg;
}
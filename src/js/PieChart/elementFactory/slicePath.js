import { SVG_NAMESPACE } from '../settings';

export default function slicePath() {
    const path = document.createElementNS(SVG_NAMESPACE, 'path');
    path.classList.add('chart__slice');
    return path;
}
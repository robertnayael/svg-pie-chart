import round from 'lodash.round';

export default function sliceDetails( { name, color, value } ) {
    const tooltip = document.createElement('div');
    tooltip.classList.add('chart__tooltip', 'tooltip');
    tooltip.innerHTML = `
        <dt class="tooltip__name">${name}</dt>
        <dd class="tooltip__description-item tooltip__color" style="background-color: ${color}" aria-hidden="true"></dd>
        <dd class="tooltip__description-item tooltip__percent-value">${round(value.proportional * 100, 1)}%</dd>
        <dd class="tooltip__description-item tooltip__absolute-value">${value.absolute}</dd>
    `;
    return tooltip;
}
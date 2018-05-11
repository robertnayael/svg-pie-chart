import { DEFAULT_HEADER_TYPE } from '../settings';

export default function title(content, headerType = DEFAULT_HEADER_TYPE) {
    const title = document.createElement(headerType);
    title.classList.add('chart__title');
    title.innerHTML = content;
    return title;
}
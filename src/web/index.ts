import { SvghubIconElement } from './icon-element.js';

export { SvghubIconElement };

const TAG_NAME = 'svghub-icon';

export function register(tagName: string = TAG_NAME): void {
  if (typeof customElements === 'undefined') return;
  if (!customElements.get(tagName)) {
    customElements.define(tagName, SvghubIconElement);
  }
}

register();

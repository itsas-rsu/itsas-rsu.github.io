import { RrlElement, html, css } from '../../js/rrl-element.mjs';

import '../icon/icon.mjs'

customElements.define('aside-button', class AsideButton extends RrlElement {
    static get properties() {
        return {
            _useInfo: { type: Boolean, default: true },
            name: { type: String, default: '', isIcon: true },
            back: { type: String, default: '#fdfdfd' },
            size: { type: Number, default: 24 },
        }
    }

    static get styles() {
        return css`
            :host {
                display: inline-block;
                vertical-align: middle;
                margin: 1px;
                user-select: none;
            }
            .rrl-btn {
                display: flex;
                align-items: center;
                cursor: pointer;
            }
            .rrl-btn:hover {
               fill: red;
            }
            .rrl-btn:active {
                transition: .1s;
                filter: brightness(85%);
            }
        `;
    }

    get #icon() {
        return html`<rrl-icon name="${this.name}" size="${this.size}"></rrl-icon>`;
    }
    render() {
        return html`
            <div id="rrl-btn" class="rrl-btn"  tabindex="0">
                ${this.#icon}
            </div>
        `;
    }
});

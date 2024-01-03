import { ITSASElement, html, css } from '../../js/itsas-element.mjs';

import '../icon/icon.mjs'

customElements.define('aside-button', class AsideButton extends ITSASElement {
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
            .itsas-btn {
                display: flex;
                align-items: center;
                cursor: pointer;
            }
            .itsas-btn:hover {
               fill: red;
            }
            .itsas-btn:active {
                transition: .1s;
                filter: brightness(85%);
            }
        `;
    }

    get #icon() {
        return html`<itsas-icon name="${this.name}" size="${this.size}"></itsas-icon>`;
    }
    render() {
        return html`
            <div id="itsas-btn" class="itsas-btn"  tabindex="0">
                ${this.#icon}
            </div>
        `;
    }
});

import { RrlElement, html, css, nothing } from '../../js/rrl-element.mjs';

import '../icon/icon.mjs'
import '../button/button.mjs'

import styles from './input-css.mjs'

class RrlEMail extends RrlElement {
    static get properties() {
        return {
            type: { type: String, default: 'text'},
            required: { type: Boolean, default: false},
            label: { type: String, default: '' },
            _useInfo: { type: Boolean, default: true },
            textAlign: { type: String, default: 'center' },
            name: { type: String, default: '', isIcon: true },
            fill: { type: String, default: '' },
            color: { type: String, default: 'gray' },
            borderColor: { type: String, default: '' },
            back: { type: String, default: '#fdfdfd' },
            size: { type: Number, default: 24 },
            width: { type: String, default: '' },
            height: { type: String, default: '' },
            swh: { type: String, default: '' },
            border: { type: String, default: '1px' },
            radius: { type: String, default: '2px' },
            br: { type: String, default: '' },
            scale: { type: String, default: '0.9' },
            rotate: { type: Number, default: 0 },
            speed: { type: Number, default: 0 },
            blink: { type: Number, default: 0 },
            blval: { type: String, default: '1;0;0;1' },
            padding: { type: String, default: '' },
            toggledClass: { type: String, default: 'none' },
            notoggledClass: { type: String, default: 'notoggled' },
            toggled: { type: Boolean, default: false, reflect: true },
            path: { type: String, default: '' },
            icon: { type: Object, default: undefined },
            buttonName: { type: String, default: '' },
            placeholder: { type: String, default: '' },
        }
    }

    static get styles() {
        return [
            styles,
            css`
                :host {
                    display: inline-block;
                    width: 100%;
                    user-select: none;
                }
            `
        ]
    }

    firstUpdated(setPath = false) {
        super.firstUpdated();
        if (this.br) {
            let arr = this.br.split(':');
            this.border = arr[0] || this.border;
            this.radius = arr[1] || this.radius;
        }
        if (this.swh) {
            let arr = this.swh.split(':');
            this.size = arr[0] || this.size;
            this.width = arr[1] || this.width;
            this.height = arr[2] || this.height;
        }
    }

    get #label() {
        return html`
            <span class="label">${this.label}</span>
        `
    }

    get #icon() {
        return html`
            <rrl-icon class="icon" icon="{}" name="${this.name}" fill="${this.fill}" size="${this.size}" scale="1" rotate="0" speed="0" blink="0" blval="1;0;0;1" path=""></rrl-icon>
        `
    }

    get value() {
        return this.renderRoot?.querySelector('#input1')?.value ?? null;
    }

    get #button() {
        return html`
            <rrl-icon class="button" icon="{}" name=${this.buttonName || nothing} fill="${this.fill}" size="${this.size}" scale="1" rotate="0" speed="0" blink="0" blval="1;0;0;1" path="" @click=${this.updateLoginValue}></rrl-icon>
        `
    }

    render() {
        return html`
            ${this.label ? this.#label : ''}
            <div class="input-group">
                <input type=${this.type}
                    id="input"
                    placeholder=${this.placeholder || nothing}
                    ${this.required ? 'required' : ''}
                    class=""
                    .value=${this.login || nothing} @change=${this.updateLoginValue}
                >
                ${this.name ? this.#icon : ''}
                ${this.buttonName ? this.#button : ''}
            </div>
        `;
    }

    get value() {
        return this.renderRoot?.querySelector('#input')?.value ?? null;
    }

    set value(value) {
        const input = this.renderRoot?.querySelector('#input');
        if (input) {
            input.value= value;
        }
    }
};

customElements.define("rrl-email", RrlEMail);
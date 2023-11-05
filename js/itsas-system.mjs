import { ITSASElement, html, css } from './itsas-element.mjs'

import '../components/button/button.mjs';
import '../components/icon/icon.mjs';
import '../components/forms/login-form.mjs';
import '../components/forms/sign-up-form.mjs';
import '../components/forms/game-find-form.mjs';

import './itsas-system-header.mjs';
import './itsas-system-sidebar.mjs';

import { itsasSystemStyles } from './itsas-system-css.mjs';

class ITSASSystem extends ITSASElement {
    static get properties() {
        return {
            row: { type: Number, default: 8, save: true, category: 'settings' },
            column: { type: Number, default: 8, save: true, category: 'settings' },
            autoClose: { type: Boolean, default: true, category: 'settings' },
            timeToClose: { type: Number, default: 750, category: 'settings' },
            fontSize: { type: Number, default: 32 },
            isOk: { type: Number, default: 0 },
            isError: { type: Number, default: 0 },
            isInit: { type: Boolean, default: true, category: 'settings' },
            step: { type: Number, default: 0 },
            cards: { type: Array },
            card1: { type: Object },
            card2: { type: Object },
            solved: { type: Array, default: [] },
            end: { type: Boolean },
            version: { type: String, default: '1.0.0', save: true, category: 'settings' },
            squares: {type: Array}
        }
    }

    static get styles() {
        return [
            itsasSystemStyles,
            css`
                :host {
                    position: relative;
                    display: flex;
                    flex-direction: column;cur
                    justify-content: center;
                    height: 100%;
                    box-sizing: border-box;
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }
            `
        ]
    }

    constructor() {
        super();
        this.version = "1.0.0";
    }

    render() {
        return html`
            <itsas-system-header></itsas-system-header>
            <itsas-system-sidebar></itsas-system-sidebar>
            <!-- <login-form></login-form> -->
            <!-- <sign-up-form></sign-up-form>-->
            <!-- <game-find-form></game-find-form>-->
            <itsas-system-main></itsas-system-main>
            <itsas-system-footer></itsas-system-footer>
        `;
    }

    firstUpdated() {
        super.firstUpdated();
    }


    gameFind() {
        this.renderRoot.querySelector("game-find-form").open();
    }
    login() {
        this.renderRoot.querySelector("login-form").open();
    }
    signUp() {
        this.renderRoot.querySelector("sign-up-form").open();
    }
}

customElements.define("itsas-system", ITSASSystem);
import { ITSASElement, html, css } from './itsas-element.mjs'

import '../../components/button/button.mjs';
import '../../components/icon/icon.mjs';

class ITSASSystemHeader extends ITSASElement {
    static get properties() {
        return {
            version: { type: String, default: '1.0.0', save: true},
        }
    }

    static get styles() {
        return [
            css`
            :host {
                position: relative;
                display: flex;
                justify-content: center;
                box-sizing: border-box;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }

            header {
                display: flex;
                position: relative;
                justify-content: space-between;
                height: 90px;
                width: 100%;
                padding: 20px 10px;
                box-sizing: border-box;
            }

            a {
                text-decoration: none;
                text-wrap: nowrap;
            }

            .logo {
                display: flex;
                align-items: center;
            }

            .logo a {
                text-weight: 700;
                color: black;
            }

            .logo > img {
                padding-right: 1rem;
                width: 100%;
                height: 100%;
            }

            h3 {
                margin: 0;
                font-family: var(--ubuntu-font-family);
                font-size: 18px;
                line-height: 24px;
            }

            nav {
                display: flex;
                font-family: serif;
            }

            nav {
                display: flex;
                align-items: center;
                margin: 0;
                padding: 0;
            }

            nav a {
                text-decoration: none;
                text-transform: uppercase;
                font-size: 1rem;
                font-weight: 500;
                line-height: 1rem;
                letter-spacing: normal;
                letter-spacing: normal;
                padding: 10px 20px;
                color: var(--nav-item-color);

            }

            nav a:hover {
                color: var(--nav-item-hover-color);
                background-color: var(--nav-item-hover-background-color) !important;
            }

            nav a[active] {
                color: var(--nav-item-active-color);
                background-color: var(--nav-item-active-background-color) !important;
            }

            nav a:not(nth-last) {
                margin-right: 2px;
            }

            .container {

            }

            .dropdown-menu > u {
                list-style: none;
            }

            .menu-collapse:not(.show) {
                display: none;
            }

            // @media (max-width: 991.98px) {
            //     portfolio-btn {
            //         display: block;
            //     }
            //     .menu-item {
            //         display: none;
            //     }
            // }
            itsas-button:not(.show) {
                display: none;
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
            <header>
                <div class="container">
                    <div class="logo">
                        <img src="images/logo-yellow.png" alt="" />
                        <h3 class="text">
                            <a href="#">Сайт</a>
                        </h3>
                    </div>
                    <nav>
                        <ul>
                            <li class="menu-item dropdown"><a href="my-pride.html" active>Home</a></li>
                            <li class="menu-item dropdown"><a class="menu-item" href="about-me.html">About</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        `;
    }

    firstUpdated() {
        super.firstUpdated();
    }
}

customElements.define("itsas-system-header", ITSASSystemHeader);
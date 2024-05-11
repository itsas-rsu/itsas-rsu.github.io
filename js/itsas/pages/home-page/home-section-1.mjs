import { BaseElement, html, css } from '../../../base-element.mjs'

import '../../../../components/buttons/link-button.mjs'

class HomeSection1 extends BaseElement {
    static get properties() {
        return {
            version: { type: String, default: '1.0.0', save: true },
        }
    }

    static get styles() {
        return [
            BaseElement.styles,
            css`
                :host {
                    display: flex;
                    height: 100%;
                    overflow: hidden;
                    gap: 20px;
                }

                .right-layout {
                    display: flex;
                    flex-basis: 50%;
                    align-items: center;
                }

                img {
                    width: 100%;
                }

                .left-layout {
                    display: flex;
                    flex-basis: 50%;
                    align-items: center;
                    margin-left: 40px;
                }

                h1 {
                    font-size: 55px;
                    line-height: 72px;
                    color: #3b3b3b;
                    font-weight: 700;
                    margin-bottom: 31px
                }

                h2 {
                    font-weight: 300;
                    line-height: 1.2;
                    font-size: 1.25rem;
                }

                p {
                    margin: 20px 207px 20px 0;
                    overflow-wrap: break-word;
                    font-size: 17px;
                    line-height: 32px;
                    font-family: 'Roboto', sans-serif;
                    color: #848484;
                }

                a {
                    display: inline-block;
                    text-transform: uppercase;
                    color: var(--native-color);
                    margin: 20px auto 0 0;
                    background-color: var(--background-green);
                    letter-spacing: 1px;
                    text-decoration: none;
                    white-space: nowrap;
                    padding: 10px 30px;
                    border-radius: 0;
                    font-weight: 600;
                }

                a:hover {
                    background-color: var(--button-hover-color);
                }
                // link-button {
                //     background: red;
                // }
            `
        ]
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <div class="left-layout">
                <div>
                    <h1>Data Analytics Techniques with <span style="color: #6377ee;">ITSAS</span> Systems.</h1>
                    <p>ITSAS's real-time data management technologies, global data marketplaces, and award-winning customer service make our unstacked data solutions.</p>
                    <link-button href="#my-pride">Learn More</link-button>
                </div>
            </div>
            <div class="right-layout">
                <img src="/images/home/banner-1.png" alt="robot">
            </div>
        `;
    }

    firstUpdated() {
        super.firstUpdated();
    }
}

customElements.define("home-section-1", HomeSection1);
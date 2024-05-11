
import { BaseElement, html, css } from '../../../base-element.mjs'

import '../../../../components/dialogs/confirm-dialog.mjs'
import '../../../../components/inputs/simple-input.mjs'
import '../../../../components/inputs/upload-input.mjs'
import '../../../../components/inputs/download-input.mjs'

class TariffPlansSection1 extends BaseElement {
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
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-gap: 20px;
                    max-width: 1200px;
                    margin: auto;
                    padding: 20px;
                    background: linear-gradient(180deg, var(--header-background-color) 0%, var(--gradient-background-color) 100%);
                }
    
                .container {
                    display: contents;
                }
    
                .plan {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                    box-shadow: 0 20px 50px 5px #e9eef7;
                    padding: 70px 50px 50px 50px;
                    transition: all 500ms ease;
                }
    
                .plan:hover {
                    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
                }
    
                .plan h3 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    text-transform: uppercase;
                }
    
                .plan ul {
                    list-style: none;
                    padding: 0;
                    font-size: 1.25rem;
                }
    
                .plan ul li {
                    padding: 10px 0;
                    border-bottom: 1px solid #eee;
                }
    
                .plan ul li:last-child {
                    border-bottom: none;
                }
    
                .plan button {
                    background-color: var(--background-green);
                    color: white;
                    padding: 10.5px 35px;
                    margin: 15px 0;
                    border-radius: 30px;
                    cursor: pointer;
                    border: none;
                    font-family: 'Poppins', sans-serif;
                    width: 100%;
                    font-size: 17px;
                    line-height: 30px;
                    font-weight: 500;
                }
    
                .plan button:hover {
                    background-color: var(--button-hover-color);
                }
            `
        ]
    }    

    render() {
        return html`
            <div class="container">
                <div class="plan">
                    <h3>Basic Plan</h3>
                    <ul>
                        <li>10 Projects</li>
                        <li>5GB Storage</li>
                        <li>Community Support</li>
                        <li>Email Reports</li>
                    </ul>
                    <button>Select Plan</button>
                </div>
                <div class="plan">
                    <h3>Pro Plan</h3>
                    <ul>
                        <li>Unlimited Projects</li>
                        <li>100GB Storage</li>
                        <li>Priority Support</li>
                        <li>Daily Reports</li>
                    </ul>
                    <button>Select Plan</button>
                </div>
                <div class="plan">
                    <h3>Enterprise Plan</h3>
                    <ul>
                        <li>Unlimited Projects</li>
                        <li>1TB Storage</li>
                        <li>Dedicated Support</li>
                        <li>Hourly Reports</li>
                    </ul>
                    <button>Select Plan</button>
                </div>
            </div>
        `;
    }
}

customElements.define("tariff-plans-section-1", TariffPlansSection1);

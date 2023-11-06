import { ITSASElement, html, css } from './itsas-element.mjs'

import '../components/button/button.mjs';
import '../components/icon/icon.mjs';

class ITSASSystemSidebar extends ITSASElement {
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

            .sidebar {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
                height: 100vh; /* Задаем полную высоту видимой области */
                position: fixed;
                top: 0;
                left: 0;
                gap: 10px; /* Если необходимо, добавьте промежуток между разделами */
                background: var(--turing-gray-80, #31323A);
            }
              
            .sidebar-section {
                /* Стили для секции с логотипом */
                display: flex;
                justify-content: center;
                align-items: center;
                width: 80px;
                height: 80px;
            }
              
            .sidebar-button {
                /* Стили для индивидуальных кнопок */
                display: flex;
                width: 80px;
                height: 80px;
                justify-content: center;
                align-items: center;
                background: none;
                color: #646470;
                padding-block: 0px;
                padding-inline: 0px;
                border-width: 0px;
            }

            .sidebar-button:hover {
                background: var(--turing-gray-70, #484852);
                color: white;
              }
              
            .itsas-icon {
                display: block;
                width: 100%;
                text-align: center;
                font-size: 24px; /* Или другой размер, который вы предпочитаете */
            }  
              
            .menu-section {
                flex-direction: column;
                height: auto;
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
            <aside class="sidebar">
                <!-- Секция логотипа, всегда наверху -->
                <div class="sidebar-section">
                    <img src="./images/logo.png" alt="ITSAS Logo" height="60" />
                </div>
        
                <!-- Секция основных кнопок -->
                <div class="sidebar-section menu-section">
                    <button class="sidebar-button">
                        <itsas-icon name="home"></itsas-icon>
                    </button>  
                    <button class="sidebar-button">
                        <itsas-icon name="credit-card"></itsas-icon>
                    </button>  
                </div>
                
                <!-- Секция выхода, всегда внизу -->
                <div class="sidebar-section">
                    <button class="sidebar-button">
                        <itsas-icon name="exit-to-app"></itsas-icon>
                    </button>  
                </div>
            </aside>        
        `;
    }

    firstUpdated() {
        super.firstUpdated();
    }
}

customElements.define("itsas-system-sidebar", ITSASSystemSidebar);
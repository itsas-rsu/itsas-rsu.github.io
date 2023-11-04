import { ITSASElement, html, css } from './itsas-element.mjs'

import '../components/button/button.mjs';
import '../components/icon/icon.mjs';

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
                align-items: center;
                height: 80px;
                width: 100%;
                box-sizing: border-box;
                border-bottom: 1px solid var(--turing-gray-70, #484852);
                background: var(--turing-gray-80, #31323A);
                box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
            }
            
            .logo {
                display: flex;
                align-items: center;
            }

            .logo img {
                padding-right: 1rem;
                width: auto; /* Ширина логотипа будет определяться автоматически */
                height: 80px;
                max-height: 100%; /* Убеждаемся, что логотип не выходит за пределы своего контейнера */
            }

            .logo a {
                font-weight: 700;
                color: white; /* белый текст для логотипа */
                text-decoration: none;
            }

            h3 {
                margin: 0;
                font-family: 'Ubuntu', sans-serif;
                color: var(--turing-gray-white, #FFF);
                font-size: 30px;
                font-style: normal;
                font-weight: 700;
                line-height: 38px; /* 126.667% */
                letter-spacing: 3px;
                text-transform: uppercase;
            }

            .container {
                display: flex;
                justify-content: space-between; /* Элементы в контейнере будут распределены по обеим сторонам */
                align-items: center; /* Элементы выровнены по вертикали */
                width: 100%; /* Установим ширину контейнера, чтобы он занимал всю ширину header */
                height: 80px; /* Высота контейнера соответствует высоте header */
                padding: 0 20px;
                background: var(--turing-gray-90, #1F1F26); /* Установка черного фона для контейнера */
            }
            
            .user-menu {
                display: flex;
                align-items: center;
                gap: 10px;
                height: 100%; /* Устанавливаем высоту, равную высоте контейнера */
                background: var(--turing-gray-90, #1F1F26);
                padding: 0 16px;
            }
            
            .user-avatar {
                display: flex;
                width: 48px;
                height: 48px;
                justify-content: center;
                align-items: center;
                object-fit: cover; /* изображение заполняет элемент, сохраняя свои пропорции */
            }            
            
            .user-name {
                font-family: Roboto Condensed;
                font-size: 20px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
                letter-spacing: -0.4px;
                color: white; /* Цвет текста для контраста на черном фоне */
            }

            .user-actions {
                display: flex;
                align-items: center;
                color: #646470;
                margin-right: 10px; /* Расстояние между иконками и информацией о пользователе */
            }
            
            .icon-button {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0;
                margin-left: 10px;
                color: #FFF;
                font-size: 20px;
                transition: color 0.3s ease; /* Плавный переход для изменения цвета */
            }
            
            .icon-button:hover,
            .icon-button:focus {
                color: #BBB; /* цвет иконки при наведении, можно настроить */
            }     
            
            .settings-icon,
            .notifications-icon {
                color: #646470;
                margin: 12px;
            }

            .user-actions {
                display: flex;
                align-items: center;
                height: 100%; /* чтобы высота контейнера совпадала с высотой header */
                margin-left: auto; /* это отодвинет user-actions к правому краю */
                margin-right: 24px;
            }   

            .user-info {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 4px;
            }
            
            .user-status {
                color: var(--turing-gray-30, #C5C5C8);
                font-family: Chakra Petch;
                font-size: 10px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
                letter-spacing: 1px;
                text-transform: uppercase;
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
                <div class="logo">
                    <img src="./images/logo.png" alt="ITSAS Logo" height="60" />
                    <a href="#">
                        <h3>ITSAS</h3>
                    </a>
                </div>
                <div class="user-actions">
                    <itsas-icon name="camera" class="icon-button settings-icon"></itsas-icon>
                    <itsas-icon name="bell" class="icon-button notifications-icon"></itsas-icon>
                </div>
                <div class="user-menu">
                    <img src="./images/avatar.png" alt="Аватар пользователя" class="user-avatar">
                    <div class="user-info">
                        <div class="user-name">Даниил Зацепин</div>  
                        <div class="user-status">Pro Member</div>  
                    </div>
                    <button class="icon-button" aria-label="Открыть меню пользователя">
                        <itsas-icon name="arrow-menu"></itsas-icon>
                    </button>  
                </div>
            </header>
        `;
    }

    firstUpdated() {
        super.firstUpdated();
    }
}

customElements.define("itsas-system-header", ITSASSystemHeader);
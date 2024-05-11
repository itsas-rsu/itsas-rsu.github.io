import { BaseElement, html, css } from '../base-element.mjs'

import './itsas-header.mjs';
import './itsas-footer.mjs';
import './itsas-left-aside.mjs';

import './pages/home-page/home-page.mjs'

class ItsasElement extends BaseElement {
    static get properties() {
        return {
            version: { type: String, default: '1.0.0', save: true, category: 'settings' },
            successUserIn: { type: Boolean, default: false, attribute: 'auth', reflect: true, local: true},
        }
    }

    static get styles() {
        return [
            BaseElement.styles,
            css`
                :host {
                    height: 1vh;
                    display: grid;
                    grid-template-columns: 0px 1fr;
                    grid-template-areas:
                      "header header"
                      "aside content";

                    // flex-direction: column;
                    // justify-content: center;
                    position: relative;
                }
                :host([auth]) {
                    grid-template-columns: 50px 3fr;
                }
                main {
                    grid-area: content;
                    height: calc(100vh - 60px);
                    background: --header-background-color;
                    box-sizing: border-box;
                }
                itsas-header {
                    grid-area: header;
                }
                itsas-aside {
                    grid-area: aside;
                }
                itsas-footer {
                    grid-area: footer;
                }
            `
        ]
    }

    constructor() {
        super();
        this.version = "1.0.0";
        this.successUserIn = this.isAuth();
        addEventListener("project-status", (e) => {
            console.log(e)
        });

        addEventListener("hashchange", () => {this.requestUpdate()});
        // this.lazyLoad = {};
        // this.lazyLoad[Symbol.iterator] = function* () {
        //     var index = 0;
        //     while (true) {
        //         console.log(index);
        //         yield index++;
        //     }
        // }
    }

    get pageName() {
        return location.hash.startsWith('#') ? location.hash.slice(1) : location.hash || 'home-page';
    }

    * lazyLoad() {
        // const lazyPages=['about-me', 'my-pride', 'my-stack', 'catch-me'];
        const lazyPages=[];
        for (const pageName of lazyPages) {
            import(`./pages/${pageName}/${pageName}.mjs`);
            yield pageName;
        }
    }

    isAuth() {
        if (localStorage.getItem('rememberMe')) {
            return localStorage.getItem('accessUserToken')
        }
        else {
            return sessionStorage.getItem('accessUserToken')
        }
    }

    leftAside() {
        return html`<itsas-left-aside></itsas-left-aside>`
    }

    render() {
        // const pagesPath = isAuth ? './pages/profile' : './pages'
        const pagesRootPath = './pages'
        if (!window.customElements.get(this.pageName)) {
            import(`./pages/${this.pageName}/${this.pageName}.mjs`);
        }
        const page = document.createElement(this.pageName);
        return html`
            <itsas-header active-page="${this.pageName}"></itsas-header>
            ${this.successUserIn ? this.leftAside() : ""}
            <main>
                ${page}
            </main>
        `;
    }

    isAuth(){
        return localStorage.getItem('rememberMe') ?
            'accessUserToken' in localStorage :
            'accessUserToken' in sessionStorage;
    }

    firstUpdated() {
        super.firstUpdated();
        const lazyIterator = this.lazyLoad();
        const lazyInterval = setInterval(() => lazyIterator.next().done ? clearInterval(lazyInterval) : '', 2000);
    }
}

customElements.define("itsas-element", ItsasElement);
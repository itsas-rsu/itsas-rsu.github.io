
import { ITSASElement, html, css } from '../../js/itsas-element.mjs';

import { formStyles } from './form-css.mjs'

//import { default as wsClient, sendMessage, setDialog, repairDialog, setForm} from '../../js/ws-client.mjs'

import '../dialogs/modal-dialog.mjs';

import '../input/input.mjs';

class LoginForm extends ITSASElement {
    static get properties() {
        return {
            version: { type: String, default: '1.0.0', save: true, category: 'settings' },
            opened: { type: Boolean, default: false, category: 'settings' },
            login: { type: String, default: ''},
            password: {type: String, default: ''}
        }
    }

    static get styles() {
        return [
            formStyles,
            css`
                :host {
                    user-select: none;
                }
                .icon-font-2.user {
                    color: red;
                    font-family: FontAwesome;
                }
                .icon-font-2.user::before {
                    font-family: FontAwesome;
                    content:"\f001";
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
           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
           <div id="form-background" class="form-background" style="${this.opened ? 'display: block' : ''}">
            <modal-dialog></modal-dialog>
            <cancel-dialog></cancel-dialog>
            <close-dialog></close-dialog>
            <form class="form animate" method="post" id="form">
                <div class="form-header">
                    <div class="form-tabs no-select">
                        <div class="form-tab" selected>
                            <span id="db-tab" class="form-tab-link select">Sing in</span>
                        </div>
                    </div>
                    <span id="close" class="close-button no-select" title="Закрыть"  @click=${()=>this.close()}>&times;</span>
                </div>

                <div class="form-body">
                    <div id="db-tab-section" class="form-tab-section selected">
                        <label for="uname"><b>Пользователь</b></label>
                        <input type="text" placeholder="Логин" name="username" .value=${this.login} @change=${this.updateLoginValue} required>

                        <label for="password"><b>Password</b></label>
                        <input type="password" placeholder="Пароль" name="password" .value=${this.password} @change=${this.updatePasswordValue} required>

                        <label for="host"><b>Хост</b></label>
                        <input type="text" placeholder="http://example.com" name="host" required>

                        <span class="icon-font-2 user">аволыаволаыв</span>
                        <!-- <i class="fa fa-user" aria-hidden="true"></i> -->
                        <itsas-icon class="notoggled" icon="{}" name="face" fill="gray" size="28" scale="0.9" rotate="0" speed="0" blink="0" blval="1;0;0;1" path=""></itsas-icon>

                        <itsas-input type="text" placeholder="Логин" label="Пользователь" class="notoggled" icon="{}" name="face" fill="gray" size="28" scale="0.9" rotate="0" speed="0" blink="0" blval="1;0;0;1" path=""></itsas-input>

                        <div class="user-input-group-component">
                            <input type="email" id="username" name="_username" required="required" form-error-clear="" class="ui_v5-input-component ui_v5-input-group-space-left login-input" placeholder="Username or Email" autofocus="" aria-label="Username or Email" autocomplete="email">
                            <itsas-icon class="notoggled itsas-icon ev-f-person-add" icon="{}" name="face" fill="gray" size="28" scale="0.9" rotate="0" speed="0" blink="0" blval="1;0;0;1" path=""></itsas-icon>
                            <itsas-icon class="notoggled itsas-icon remove-red-eye" icon="{}" name="remove-red-eye" fill="gray" size="28" scale="0.9" rotate="0" speed="0" blink="0" blval="1;0;0;1" path=""></itsas-icon>
                        </div>

                        <div class="login-options">
                            <div class="checkbox-remember">
                                <input type="checkbox" name="remember">
                                <label for="remember"><b>Remember me</b></label>
                            </div>
                            <a href="http://localhost/forgot" class="forgot-password" title="Forgot Password?">Forgot Password?</a>
                        </div>

                        <label for="port"><b>Порт</b></label>
                        <input type="text" placeholder="Порт: 5984" name="port" required>

                        <button type="button" @click=${()=>this.sendLogin()}>Login</button>
                    </div>
                </div>

                <div class="form-footer no-select">
                    <div id="db-tab-buttons" class="footer-buttons-section">
                        <div class="footer-buttons">
                            <button type="button" name="clear" class="footer-button cancel-button">Очистить</button>
                            <button type="button" name="delete" class="footer-button">Удалить</button>
                            <button type="button" name="compact" class="footer-button">Сжать</button>
                            <button type="button" name="download" class="footer-button">Скачать</button>
                            <button type="button" name="upload" class="footer-button">Загрузить</button>
                            <button type="button" name="close" class="footer-button">Закрыть</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        `;
    }

    firstUpdated() {
        super.firstUpdated();
    }

    neuroClick() {
        // let cells = this.renderRoot.querySelectorAll(".cell");
        // const id = Math.floor(Math.random() * cells.length);
        // if (id != this.odd)
        //     cells[id].dispatchEvent(new CustomEvent("click", { bubbles: true, composed: true}));
    }
    open() {
        this.opened = true;
        setDialog(this.renderRoot.querySelector('modal-dialog'))
        setForm(this);
    }
    close() {
        this.opened = false
        repairDialog()
    }

    sendLogin() {
        sendMessage("login", {login: this.login, password: this.password})
    }

    async authOk(message) {
        console.log(JSON.stringify(message))
        const dialog =  this.renderRoot.querySelector('modal-dialog');
        let modalResult = await dialog.show(message.text);
        if (modalResult === "Ok") {
            this.close();
        }
    }

    async modalDialogShow() {
        const dialog =  this.renderRoot.querySelector('modal-dialog');
        let modalResult = await dialog.show("Подключение прошло удачно");
        if (modalResult === "Ok") {
            this.close();
        }
    }

    updateLoginValue (e) {
        this.login = e.target.value
        console.log(this.login)
    }

    updatePasswordValue (e) {
        this.password = e.target.value
        console.log(this.password)
    }
}

customElements.define("login-form", LoginForm);

import { RrlElement, html, css } from '../../js/rrl-element.mjs';

import { formStyles } from './form-css.mjs'

//import { default as wsClient, sendMessage, setDialog, repairDialog, setForm} from '../../js/ws-client.mjs'

import '../dialogs/modal-dialog.mjs';

import '../input/input.mjs';
import '../input/email.mjs';
import '../input/password.mjs';
import '../button/close-button.mjs';

class SignInForm extends RrlElement {
    static get properties() {
        return {
            version: { type: String, default: '1.0.0', save: true, category: 'settings' },
            opened: { type: Boolean, default: false, category: 'settings' },
            login: { type: String, default: ''},
            password: {type: String, default: ''},
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
                .form-footer {
                    display: flex;
                    justify-content: right;
                }
            `
        ]
    }

    constructor() {
        super();
        this.version = "1.0.0";
    }

    // <span id="close" class="close-button no-select" title="Закрыть"  @click=${()=>this.close('CANCEL')}>&times;</span>
    render() {
        return html`
           <div id="form-background" class="form-background" style="${this.opened ? 'display: block' : ''}">
            <modal-dialog></modal-dialog>
            <cancel-dialog></cancel-dialog>
            <close-dialog></close-dialog>
            <form class="form animate" method="post" id="form">
                <div class="form-header">
                    <div class="form-tabs no-select">
                        <div class="form-tab" selected>
                            <span id="db-tab" class="form-tab-link select">Sign In</span>
                        </div>
                    </div>
                    <close-button class="close-button no-select" name="times" @click=${()=>this.close('CANCEL')}></close-button>
                </div>

                <div class="form-body">
                    <div id="db-tab-section" class="form-tab-section selected">
                        <rrl-input id="login" type="text" name="user" placeholder="Логин" label="Пользователь" icon="{}" class="notoggled" fill="gray" size="28" scale="0.9" rotate="0" speed="0" blink="0" blval="1;0;0;1" path=""></rrl-input>
                        <rrl-password id="password" type="password" label="Пароль" visibleIcon="eye-slash-regular" invisibleIcon="eye-regular" class="notoggled" icon="{}" name="lock" fill="gray" size="28" scale="0.9" rotate="0" speed="0" blink="0" blval="1;0;0;1" path=""></rrl-password>

                        <div class="login-options">
                            <div class="checkbox-remember">
                                <label for="remember"><b>Remember me</b></label>
                                <input type="checkbox" id="remember" name="remember" @click=${this.RememberMe}>
                            </div>
                            <a href="http://localhost/forgot" class="forgot-password" title="Forgot Password?">Forgot Password?</a>
                        </div>

                        <button type="button" @click=${()=>this.sendSimpleUser()}>Log In</button>
                        <div id="google"></div>
                    </div>
                </div>

                <div class="form-footer">
                    <a class="sign-up-link" title="Sign Up" @click=${this.signUpClick}>Sign Up if you New user!</a>
                </div>
            </div>
            </form>
        </div>
        `;
    }

    sendToken(res) {
        console.log(res)
        const token = { token: res.credential, type: 'google'}
        console.log(JSON.stringify(token))
        let response = fetch('http://localhost:7000/api/sign-in', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(token)
          })
        .then(response => response.json())
        .then(json => {
            if (json.error) {
                throw Error(json.error)
            }
            this.saveToken(json.token)
            return json.token
        })
        .then(token => this.getSimpleUserInfo(token))
        .catch(err => {console.error(err.message)});
      }


    createGoogleButton() {
        google.accounts.id.initialize({
            client_id: '152529125992-enoddnchd7n8mug7he2juk5fh3fhevqe.apps.googleusercontent.com',
            callback: res => this.sendToken(res)
        });
        google.accounts.id.renderButton(
            this.renderRoot.querySelector('#google'),
            { theme: 'outline', size: 'large'}
        );
    }

    firstUpdated() {
        super.firstUpdated();
        this.createGoogleButton();
    }

    open() {
        this.opened = true;
        // setDialog(this.renderRoot.querySelector('modal-dialog'))
        // setForm(this);
        return new Promise((res, rej) => {
            this.resolveForm = res
            this.rejectFrom = rej
        })
    }

    close(modalResult) {
        this.opened = false
        this.#login = ''
        this.#password = ''
        this.#rememberMe = ''
        if (modalResult == 'Ok')
            this.resolveForm(modalResult)
        else
            this.rejectFrom(modalResult)
        // repairDialog()
    }

    signUpClick() {
        this.opened = false;
        this.#signUpForm.open().then(modalResult => {
            if (modalResult == "SINGIN") {
                this.opened = false;
            }
            else {
                this.close(modalResult)
            }
        }, modalResult => this.close(modalResult));
    }


    get #signUpForm() {
        return this.parentElement.querySelector('sign-up-form') ?? null;
    }
    get #login() {
        return this.renderRoot?.querySelector('#login')?.value ?? null;
    }

    set #login(value) {
        if (this.renderRoot?.querySelector('#login')) {
            this.renderRoot.querySelector('#login').value = value;
        }
    }

    get #password() {
        return this.renderRoot?.querySelector('#password')?.value ?? null;
    }

    set #password(value) {
        if (this.renderRoot?.querySelector('#password')) {
            this.renderRoot.querySelector('#password').value = value;
        }
    }

    get #rememberMe() {
        return this.renderRoot?.querySelector('#remember')?.checked ?? null;
    }

    set #rememberMe(value) {
        if (this.renderRoot?.querySelector('#remember')) {
            this.renderRoot.querySelector('#remember').checked = value;
        }
    }

    sendSimpleUser() {
        const user = { username: this.#login, password: this.#password, type: 'simple'}
        console.log(JSON.stringify(user))
        let response = fetch('http://localhost:7000/api/sign-in', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(json => {
            if (json.error) {
                throw Error(json.error)
            }
            this.saveToken(json.token)
            return json.token
        })
        .then(token => this.getSimpleUserInfo(token))
        .catch(err => {console.error(err.message)});
    }

    async saveToken(token) {
        if (localStorage.getItem('rememberMe')) {
            localStorage.setItem('accessUserToken', token)
        }
        else {
            sessionStorage.setItem('accessUserToken', token)
        }
    }

    getSimpleUserInfo(token) {
        return fetch('http://localhost:7000/api/user?info=fle', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(json => {
            if (json.error) {
                throw Error(json.error)
            }
            return json.user;
        })
        .then(user => this.saveUserInfo(JSON.stringify(user)))
        .then(() => this.modalDialogShow())
        .catch(err => {console.error(err.message)});
    }

    saveUserInfo(userInfo) {
        if (localStorage.getItem('rememberMe')) {
            localStorage.setItem('userInfo', userInfo)
        }
        else {
            sessionStorage.setItem('userInfo', userInfo)
        }
    }

    RememberMe(){
        if (this.#rememberMe) {
            localStorage.setItem('rememberMe', this.#rememberMe)
        }
        else {
            localStorage.removeItem('rememberMe')
        }
    }

    async authOk(message) {
        console.log(JSON.stringify(message))
        const dialog =  this.renderRoot.querySelector('modal-dialog');
        let modalResult = await dialog.show(message.text);
        if (modalResult === "Ok") {
            this.close(modalResult);
        }
    }

    async modalDialogShow() {
        const dialog =  this.renderRoot.querySelector('modal-dialog');
        let modalResult = await dialog.show("Подключение прошло успешно");
        if (modalResult === "Ok") {
            this.close(modalResult);
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

customElements.define("sign-in-form", SignInForm);
import { BaseElement, html, css } from '../../../base-element.mjs'

import '../../../../components/dialogs/confirm-dialog.mjs'
import '../../../../components/inputs/simple-input.mjs'
import '../../../../components/inputs/upload-input.mjs'
import '../../../../components/inputs/download-input.mjs'
import '../../../../components/notifications/my-notification.mjs'

class MyNotificationsSection1 extends BaseElement {
        static get properties() {
            return {
                version: { type: String, default: '1.0.0', save: true },
                dataSet: {type: Array, default: []},
                currentProject: {type: String, default: ""},
                isModified: {type: Boolean, default: ""},
                isReady: {type: Boolean, default: true},
                notificationCurrentOffset: { type: String, default: '', local: true },
            }
        }

        static get styles() {
            return [
                BaseElement.styles,
                css`
                    :host {
                        display: grid;
                        width: 100%;
                        padding-left: 20px;
                        grid-template-columns: 1fr;
                        grid-template-rows: 50px 1fr;
                        grid-template-areas:
                            "header"
                            "sidebar";
                        gap: 0 20px;
                        background: #f7faff;
                    }

                    header{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    #project-header{
                        grid-area: header;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    #project-header p {
                        width: 100%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        font-size: 1rem;
                        margin: 0;
                        font-family: 'Poppins', sans-serif;
                        font-weight: 600;
                    }

                    .left-layout {
                        grid-area: sidebar;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        overflow-y: auto;
                        overflow-x: hidden;
                        background: rgba(255, 255, 255, 0.1);
                    }

                    .left-layout simple-button {
                        width: 100%;
                        height: 40px;
                    }

                    img {
                        width: 100%;
                    }

                    .right-layout {
                        grid-area: content;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-right: 20px;
                        background: rgba(255, 255, 255, 0.1);
                    }

                    h1 {
                        font-size: 3.4375rem;
                        font-weight: 700;
                        text-transform: uppercase;
                        margin: 20px 0 0;
                    }

                    h2 {
                        font-weight: 300;
                        line-height: 1.2;
                        font-size: 1.25rem;
                    }

                    p {
                        font-size: 1.25rem;
                        margin: 20px 207px 20px 0;
                        overflow-wrap: break-word;
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

                    footer {
                        grid-area: footer;
                        display: flex;
                        align-items: center;
                        justify-content: end;
                        margin-right: 20px;
                        gap: 10px;
                    }

                    footer simple-button {
                        height: 40px;
                    }
                    #drop_zone {
                        border: 5px solid blue;
                        width: 200px;
                        height: 100px;
                    }
                    /* width */
                    ::-webkit-scrollbar {
                      width: 10px;
                    }

                    /* Track */
                    ::-webkit-scrollbar-track {
                      box-shadow: inset 0 0 5px grey;
                      border-radius: 5px;
                    }

                    /* Handle */
                    ::-webkit-scrollbar-thumb {
                      background: red;
                      border-radius: 5px;
                    }
                `
            ]
        }

        constructor() {
            super();
        }

        update(changedProps) {
            super.update(changedProps);
            if (!changedProps) return;
            console.log(changedProps)
            if (changedProps.has('notificationCurrentOffset') && this.notificationCurrentOffset) {
                BASE.debounce('notificationCurrentOffset', () => this.sendOffset(), 1000)
            }
        }

        async sendOffset() {
                const token = await this.getToken();
                const obj = {
                    offset: this.notificationCurrentOffset
                }
                return fetch(`https://cs.rsu.edu.ru:4500/api/notification-offset`, {
                    method: "PUT",
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                })
                .then(response => response.json())
                .then(json => {
                    if (json.error) {
                        throw Error(json.error)
                    }
                    return json;
                })
                .catch(err => {console.error(err)});
        }

        render() {
            return html`
                <header id="project-header"><p>My Notifications</p></header>
                <div class="left-layout">
                    ${this.dataSet.map((notification, index, notifications) => {
                        if (index !== 0) {
                            if ((new Date(notifications[index - 1].timestamp)).toDateString() !==
                                (new Date(notification.timestamp)).toDateString()) {
                                notification.isFirst = true;
                            }
                        }
                        else {
                            notification.isFirst = true;
                        }
                        return html`
                            <my-notification .notification=${notification}></my-notification>
                        `
                        })}
                </div>
            `;
        }

        async getToken() {
            return localStorage.getItem('rememberMe') ?
                localStorage.getItem('accessUserToken') :
                sessionStorage.getItem('accessUserToken')
        }

        async getNotificationList() {
            const token = await this.getToken();
            return fetch('https://cs.rsu.edu.ru:4500/api/notifications', {
                headers: {
                  'Authorization': `Bearer ${token}`
                }

            })
            .then(response => {
                if (response.status === 419){
                    return this.refreshToken().then( token =>
                        fetch('https://cs.rsu.edu.ru:4500/api/notifications', {
                            headers: {
                            'Authorization': `Bearer ${token}`
                            }

                        }).then(response => response.json())
                    )
                }
                else {
                    return response.json()
                }
            })
            .then(json => {
                if (json.error) {
                    throw Error(json.error)
                }
                return json.rows;
            })
            .then(notifications => this.saveDataSet(notifications))
            .catch(err => {console.error(err.message)});
        }

        async saveDataSet(notifications) {
            if (notifications.length === 0)
                return;
            this.dataSet = notifications.map( notification => notification.doc)
                .sort( (a, b) => b.timestamp - a.timestamp )
        }

        refreshToken() {
            return fetch('https://cs.rsu.edu.ru:4500/api/refresh-token', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: "include",
            })
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    throw Error(json.error)
                }
                return json.token
            })
            .then(token => this.saveToken(token))
            .catch(err => {console.error(err.message)});
        }

        async saveToken(token) {
            if (localStorage.getItem('rememberMe')) {
                localStorage.setItem('accessUserToken', token)
            }
            else {
                sessionStorage.setItem('accessUserToken', token)
            }
            return token;
        }

        async firstUpdated() {
            super.firstUpdated();
            await this.getNotificationList();
        }
}

customElements.define("my-notifications-section-1", MyNotificationsSection1);
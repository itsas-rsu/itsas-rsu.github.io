import { css } from 'https://unpkg.com/lit@2.0.0/index.js?module';

const styles = css`

.label {
    color: var(--form-color);
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 8px;
    font-weight: bold;
}

.input-group {
    display: flex;
    width: 100%;
    align-items: center;
    position: relative;
}

input[type="text"],
input[type="password"],
input[type="mail"],
input[type="number"] {
    display: inline-block;
    width: 100%;
    margin: 8px 0px;
    padding: 12px 20px 12px 40px;
    border: 1px solid rgb(204, 204, 204);
    border-radius: 10px;
    box-sizing: border-box;
    outline-color: var(--form-outline-color);
    color: var(--form-color);
    font-size: 14px;
}

[placeholder] {
    text-overflow: ellipsis;
}

.icon {
    display: inline-block;
    position: absolute;
    left: 8px
}

.button {
    display: inline-block;
    position: absolute;
    cursor: pointer;
    right: 5px
}

`;

export default styles
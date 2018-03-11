import '../scss/index.scss';

import bg from 'Static/images/bg.png';
import { listData } from './module/data';
import { h, app } from 'hyperapp';

import { List } from './module/list';
const state = {
    bg: bg,
    list: listData,
    free_count: 5924,
    name: '',
    phone: '',
    code: '',
    showDialog: false,
    dialog_qrcode: '',
    mpid: ''
};

const actions = {
    diagnosis: item => state => {
        return {
            showDialog: true,
            dialog_qrcode: item.qrcode,
            mpid: item.mpid
        };
    },
    nameInput: ({ value }) => ({
        name: value
    }),
    phoneInput: ({ value }) => ({
        phone: value
    }),
    codeInput: ({ value }) => ({
        code: value
    }),
    close: e => state => {
        return e.target.className === 'dialog' ? {
            showDialog: false
        } : {};
    }
};

const view = (state, actions) => (
    <div class='container'>
        <header class='header'>
            <img src={state.bg} />
        </header>
        <main class='main'>
            <ul class='main-list'>
                <List arr={state.list} event={actions.diagnosis} />
            </ul>
        </main>
        <footer class='footer'>
            <p class='foot-title'>已超过<span>{state.free_count}位</span>获得免费诊断</p>
            <div class='input-item'>
                <span class='input-label'>姓名:</span>
                < input type = "text" class='input-form'
                    oninput = {e => actions.nameInput({ value: e.target.value})}
                    value = {state.name} />
            </div>
            <div class='input-item'>
                <span class='input-label'>手机号:</span>
                < input type="text" class='input-form'
                    oninput={e => actions.phoneInput({ value: e.target.value })}
                    value={state.phone} />
            </div>
            <div class='input-item'>
                <span class='input-label'>验证码:</span>
                < input type="text" class='special-input'
                    oninput={e => actions.codeInput({ value: e.target.value })}
                    value={state.code} />
                <button class='input-btn'>获取验证码</button>
            </div>
            <button class='footer-btn'>获取更多专家免费诊断</button>
        </footer>
        <div class='dialog'
            onclick={(e) => actions.close(e)}
            style={{
                display: state.showDialog ? 'flex' : 'none'
            }}>
            <div class='dialog-content'>
                <div onclick={(e) => actions.close(e)}></div>
                <p class='dialog-title'>免费诊断牛股</p>
                <p class='dialog-title'>微信扫一扫</p>
                <img src={state.dialog_qrcode} class='dialog-qrcode' />
                <p class='dialog-desc'>或手动添加微信号</p>
                <p class='dialog-mpid'>{state.mpid}</p>
            </div>
        </div>
    </div>
);
app(state, actions, view, document.body);


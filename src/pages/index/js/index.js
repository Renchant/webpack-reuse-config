import '../style/index.scss';

import bg from 'Static/images/bg.png';
import { listData } from './module/data';
import { h, app } from 'hyperapp';

import { List } from './module/list';
console.log(listData);

const state = {
    bg: bg,
    list: listData,
    free_count: 5924,
    name: '',
    phone: '',
    code: ''
};

const actions = {
    diagnosis: item => state => {
        console.log(item);
    },
    nameInput: ({ value }) => ({
        name: value
    }),
    phoneInput: ({ value }) => ({
        phone: value
    }),
    codeInput: ({ value }) => ({
        code: value
    })
}

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
                < input type="text" class='input-form'
                    oninput={e => actions.codeInput({ value: e.target.value })}
                    value={state.code} />
                <button class='input-btn'>获取验证码</button>
            </div>
            <button class='footer-btn'>获取更多专家免费诊断</button>
        </footer>
    </div>
);
app(state, actions, view, document.body);


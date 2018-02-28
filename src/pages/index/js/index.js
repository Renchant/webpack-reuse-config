import '../style/index.scss';

import bg from 'Static/images/bg.png';
import { h, app } from 'hyperapp';

const state = {
    bg: bg
};

const actions = {
    down: value => state => ({ count: state.count - value }),
    up: value => state => ({ count: state.count + value })
};
const view = (state, actions) => (
    <div class='container'>
        <header class='header'>
            <img src={state.bg} />
        </header>
    </div>
);
app(state, actions, view, document.body);


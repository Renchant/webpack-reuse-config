import '../style/index.scss';
import { h, app } from 'hyperapp';
import BtnGroup from './components/btn-group';
import DollWrapper from './components/doll-wrapper';

const state = {
    count: 0
};

const actions = {
    down: () => state => ({ count: state.count - 1 }),
    up: () => state => ({ count: state.count + 1 })
};

const view = (state, actions) => (
    <div id="db-content">
        <BtnGroup></BtnGroup>
        <DollWrapper></DollWrapper>
        <div class="guide">
            <span class="arrow"></span>
            <span class="arrow"></span>
            <span class="arrow"></span>
            <span class="finger"></span>
        </div>
        <div id="game-cover"></div>
    </div>
);

app(state, actions, view, document.body);

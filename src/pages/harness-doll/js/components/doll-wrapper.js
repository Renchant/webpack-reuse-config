
import { h } from 'hyperapp';

const states = {
    dollLength: 8
};

const actions = {
    toggleModal() {
        console.log('a');
    },
    toggleRule() {
        console.log('rule');
    },
    toggleRecord() {
        console.log('record');
    }
};

export default () => (
    <div id="doll-wrapper">
        {
            Array(states.dollLength).fill(0).map((i, idx) => (
                <span class="doll-item doll-l" data-index={idx + 1}></span>
            ))
        }
        <span id="needCredits"></span>
        <span class="circle top"></span>
        <span class="circle bottom"></span>
    </div>
);

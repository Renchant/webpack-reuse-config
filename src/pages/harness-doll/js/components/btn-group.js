
import { h } from 'hyperapp';

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
    <div id="btn-group">
        <a href="javascript:;" id="prizes-modal" class="prizes" onclick={actions.toggleModal}></a>
        <a href="javascript:;" class="rule" onclick={actions.toggleRule}></a>
        <a href="javascript:;" class="record" onclick={actions.toggleRecord}></a>
    </div>
);

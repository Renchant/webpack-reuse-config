import '../style/index.scss';

import 'Common/js/act-base';

import 'Common/js/plugin-common';
import 'Common/js/h5-discern-simulator';
import './activity';


Promise.all([
    import('Common/js/common'),
    import('Common/style/common.scss')
])
    .then(() => {
        loaderAsyncCallback();
    });

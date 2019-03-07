import {
    genAction,
    debounce,
} from './helpers'

import './tagElement.js'

let screenshot = {
    usePageDiff: false, // 是否截屏对比
    delayTime: 0.5, // 延迟delayTime截屏
};

export default (recordAction) => {
    ['click', 'dbclick'].forEach((event) => {
        document.addEventListener(event, (e)=> {
            recordAction(genAction(e, { ...screenshot }));
        }, true);
    });
    ['input'].forEach((event) => {
        document.addEventListener(event, debounce(function(e) {
            let event = {};
            let { target } = e;
            if (target.tagName.toLowerCase() === 'select') {
                event.type = 'select';
                event.path = e.path;
                event.srcElement = e.srcElement;
                event.target = Object.assign({}, {
                    innerText: Array.prototype.map.call(target.selectedOptions, (opt) => opt.value)
                });
            } else {
                event = e;
            }
            recordAction(genAction(event, { ...screenshot }));
        }, 300), true);
    });
}
import {
    getSelector
} from './util'
import {
    Gen
} from './gen.js'
import isMobile from './isMobile';

/**
 * delegate function, when event is triggled, record it.
 * @param {*} e 
 */
export const genAction = function (e, opts) {
    // console.log(Date.now(), e, getSelector(e.srcElement));
    var target = e.target,
        srcElement = e.srcElement,
        tagName = srcElement.tagName && srcElement.tagName.toLowerCase() || '';

    //  actions.push('click::' + getSelector(target) + '::' + (+new Date()));

    return {
        url: window.location.href,
        title: target.title,
        id: srcElement.getAttribute('_id_'),
        className: srcElement.getAttribute('_class_'),
        selector: getSelector(srcElement),
        tagName,
        innerText: target.innerText || target.value,
        event: e.type,
        target: srcElement,
        _options: opts
    }
};

export const getFootprint = (actionPaths, initDeviceInfo)=>{
    let generator = new Gen(actionPaths[0].url, navigator.userAgent, initDeviceInfo);
    actionPaths.forEach((action) => {
        action.reload ? generator.goto(action.url) : generator.add(action);
    });

    return generator.dest();
}

export function debounce(fn, delay) {
    // 定时器，用来 setTimeout
    let timer;

    // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
    return function () {
        // 保存函数调用时的上下文和参数，传递给 fn
        let context = this;
        let args = arguments;

        // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
        clearTimeout(timer);

        // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
        // 再过 delay 毫秒就执行 fn
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}

export let collectDeviceInfo = function (userAgent, window, screen) {
    let ismobile = isMobile(userAgent);
    return {
        devicePixelRatio: window.devicePixelRatio,
        orientation: screen.orientation || screen.mozOrientation || screen.msOrientation,
        deviceWidth: (window.innerWidth > 0) ? window.innerWidth : screen.width,
        deviceHeight: (window.innerHeight > 0) ? window.innerHeight : screen.height,
        isMobileDevice: ismobile.phone || ismobile.tablet,
        isMobile: ismobile
    }
}
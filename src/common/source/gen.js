import {
    collectDeviceInfo,
    stringify
} from './util'

class EventPackage {
    constructor(a) {
        this.action = a;
    }
    dbclick() {
        // puppeteer不支持dbclick
        return '';
    }
    click(usePageDiff = false, waitTime = 500) {
        return `.click(${stringify(this.action.selector)},{ usePageDiff: ${usePageDiff}, waitTime: ${waitTime} })`
    }
    input(usePageDiff = false, waitTime = 500) {
        return `.type(${stringify(this.action.selector)}, ${stringify(this.action.innerText)}, { usePageDiff: ${usePageDiff}, waitTime: ${waitTime} })`
    }
    select(usePageDiff = false, waitTime = 500) {
        return `.select(${stringify(this.action.selector)}, ${stringify(this.action.innerText)}, { usePageDiff: ${usePageDiff}, waitTime: ${waitTime} })`
    }
}

class Gen {
    constructor(url, userAgent, deviceInfo) {
        // 暂时不采用单例
        // if (Gen.prototype._instance) return Gen.prototype._instance;
        // Gen.prototype._instance = this;
        this.actionPath = [];
        this.userAgent = userAgent;
        this.baseUrl = url;
        this.create(this.baseUrl);
        this.setViewPort(deviceInfo);
        this.wait(1000);
        this.goto(this.baseUrl);
    }

    add(action) {
        let { event, _options, deviceInfo} = action;
        let usePageDiff = _options.usePageDiff,
            delayTime = _options.delayTime * 1000;

        if (event !== 'resize') {
            let ep = new EventPackage(action);
            let codeStr = ep[event] ? ep[event](usePageDiff, delayTime) : '';
            this.actionPath.push(codeStr);
        } else {
            this.setViewPort(deviceInfo, usePageDiff, delayTime);
            this.wait(2000);
        }
    }

    create(url) {
        let str = `createAction('${url}')`;
        this.actionPath.push(str)
    }

    setViewPort(deviceInfo, usePageDiff = false, waitTime = 500) {
        let {
            deviceWidth,
            deviceHeight,
            devicePixelRatio,
            orientation,
            isMobileDevice
        } = deviceInfo;

        let isLandscape = /^landscape.*/.test(orientation.type);

        let viewport = {
            width: deviceWidth,
            height: deviceHeight,
            deviceScaleFactor: devicePixelRatio,
            isLandscape,
            isMobile: isMobileDevice,
            hasTouch: isMobileDevice
        }
        let str = `.setViewport(${stringify(viewport)})`;

        this.actionPath.push(str);
    }

    goto(url) {
        return this.actionPath.push(`.goto(${stringify(url)})`);
    }

    wait(duration) {
        let str = `.wait(${duration})`;
        this.actionPath.push(str);
    }

    end() {
        let str = `.end(end)`;
        this.actionPath.push(str);
    }

    dest() {
        this.end();
        return this.actionPath.join('\n');
    }
}

export {
    Gen
}
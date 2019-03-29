class Play{
    constructor(delay){
        this.currentEle = null;
        this.executeArr = [];
        this.delay = delay || 0;
    }
    async run(paths = [], cb) {
        this.lastTimeStamp = 0;
        this.parser(paths);
        let promiseAll = [];
        this.executeArr.forEach((item) => {
            promiseAll.push(item.execute)
        });
        
        for (let i = 0; i < promiseAll.length; i++) {
            let item = await promiseAll[i]();
            this.lastTimeStamp = item.timeStamp
        }
        cb && cb();
    }
    parser(paths) {
        this.executeArr = paths.map(item => {
            let {event, selector} = item;
            let _self = this;
            return {
                execute() {
                    return _self[event](selector, item);
                }
            }
        });
    }
    click(selector, item) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('delay',this.adaptDelay(item), selector)
                this.getEle(selector).click();
                resolve(item);
            }, this.adaptDelay(item))
        })
    }
    contextmenu(selector, item) {
        return this.click(selector, item);
    }
    input(selector, item) {
        new Promise((resolve) => {
            setTimeout(() => {
                console.log('delay',this.adaptDelay(item))
                this.getEle(selector).value = item.innerText;
                resolve(item);
            }, this.adaptDelay(item))
        })
    }
    adaptDelay(item) {
        if (this.delay) {
            return this.delay;
        }
        if (this.lastTimeStamp) {
            return item.timeStamp - this.lastTimeStamp;
        }
        return 0;
    }
    getEle(name) {
        return document.body.querySelector(name);
    }

}

export default Play;

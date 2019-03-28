class Play{
    constructor(delay){
        this.currentEle = null;
        this.executeArr = [];
        this.delay = delay || 300;
    }
    async run(paths = []) {
        this.parser(paths);
        let promiseAll = [];
        this.executeArr.forEach((item) => {
            promiseAll.push(item.execute)
        });
        
        for (let i = 0; i < promiseAll.length; i++) {
            await promiseAll[i]();
        }
    }
    parser(paths) {
        this.executeArr = paths.map(item => {
            let {event, selector, innerText} = item;
            let ele = this.getEle(selector);
            let _self = this;
            return {
                execute() {
                    return _self[event](selector, innerText, item);
                }
            }
        });
    }
    click(selector) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.getEle(selector).click();
                resolve();
            }, this.delay)
        })
    }
    input(selector, text) {
        new Promise((resolve) => {
            setTimeout(() => {
                this.getEle(selector).value = text;
                resolve();
            }, this.delay)
        })
    }
    getEle(name) {
        return document.body.querySelector(name);
    }

}

export default Play;

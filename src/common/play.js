class Play{
    constructor(){
        this.currentEle = null;
        this.executeArr = [];
    }
    run(paths = []) {
        this.parser(paths);
        this.executeArr.forEach((item) => item.execute())
    }
    parser(paths) {
        this.executeArr = paths.map(item => {
            let {event, selector, innerText} = item;
            let ele = this.getEle(selector);
            let _self = this;
            return {
                execute() {
                    _self[event](ele, innerText);
                }
            }
        });
    }
    click(ele) {
        ele.click();
    }
    input(ele, text) {
        ele.value = text;
    }
    getEle(name) {
        return document.body.querySelector(name);
    }

}

export default Play;
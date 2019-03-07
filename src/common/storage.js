

class Storage {
    constructor(url) {
        this.url = url;
    }
    @decoErrFn
    async set(name, obj) {
        let data = await this.get();
        if (!data) {
            data = {};
        }
        return new Promise((resove) => {
            chrome.storage.sync.set({
                [this.url]: Object.assign(data, {
                    [name]: obj
                })
            }, () => {
                if (chrome.runtime.lastError) {
                    reject()
                } else {
                    resove();
                }
            })
        })
    }
    @decoErrFn
    get(name) {
        return new Promise((resove) => {
            chrome.storage.sync.get(
                [this.url]
            , data => {
                let result = {};
                if (data[this.url]) {
                    result = data[this.url];
                }
                resove(name ? result[name] : result[this.url]);
            })
        })
    }
}

function decoErrFn(target, name, descriptor) {
    let fn = descriptor.value;
    descriptor.value = function() {
        return fn.apply(this, arguments).catch(e => {
            console.error('chrome storage error:' + e);
        })
    }
}

export default new Storage(location.origin);
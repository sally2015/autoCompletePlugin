

class Storage {
    constructor(url) {
        this.url = url;
    }
    // @decoErrFn
    set(name, obj) {
        let data = this.get();
        let result = {}
        if (name) {
            obj.forEach((item) => delete item.target);
            result = Object.assign({}, data, {
                [name+'']: obj
            })
        } else {
            result = obj;
        }
        localStorage.setItem(this.url,
            JSON.stringify(result))
    }
    @decoErrFn
    get(name) {
        let data = JSON.parse(localStorage.getItem(this.url)) || {}
        return name ? data[name] : data
    }
    @decoErrFn
    remove(names) {
        let data = this.get();
        if(Array.isArray(names)) {
            names.forEach(name => {
                delete data[name];
            })
        } else {
            delete data[names];
        }
        this.set(null, data);

    }
}

function decoErrFn(target, name, descriptor) {
    let fn = descriptor.value;
    descriptor.value = function() {
        try {
            return fn.apply(this, arguments)
        } catch(e) {
            console.error('stroage error' + e)
        }
    }
}

export default new Storage(location.origin);
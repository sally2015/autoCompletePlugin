export let isIgnoreElement = function (type, target) {
    if (!target || !type) {
        return false;
    }
    const ignoreMap = {
        'click': ['textarea', 'select', 'option'],
    }
    let tar = ignoreMap[type];
    if(tar) {
        return tar.indexOf(target.tagName.toLowerCase()) !== -1;
    } else {
        return false;
    }
}

let _getSelector_ = function (element) {
    if (!element) {
        return;
    }

    if (typeof element === 'string') {
        return element;
    }

    var tagName = element.tagName && element.tagName.toLowerCase() || '';

    if (!tagName) {
        return '';
    }

    function trim(string) {
        return string && string.toString().replace(/^\s+|\s+$/, '') || string;
    }

    // 去掉一些使用时间戳作为ID的元素
    var id = element.getAttribute('_id_');
    if (id && !(/\d{3,13}/).test(id) && !(/^\d+$/).test(id)) {
        // 如果这个ID在页面上是唯一的，那么就返回该ID，否则再继续往上层父元素添加selector
        if (document.querySelectorAll('#' + id).length === 1) {
            return '#' + id;
        }
    }

    if (element == document || element == document.documentElement) {
        return 'html';
    }

    if (element == document.body) {
        return 'html > ' + element.tagName.toLowerCase();
    }


    if (!element.parentNode) {
        return element.tagName.toLowerCase();
    }

    var ix = 0,
        siblings = element.parentNode.childNodes,
        elementTagLength = 0,
        classname = trim(element.getAttribute('_class_'));

    // 判断该className是否在整个文档中是唯一的
    if (classname && document.querySelectorAll('.' + classname.replace(/\s+/g, '.')).length === 1) {
        return '.' + classname.replace(/\s+/g, '.');
    }

    for (let i = 0, l = siblings.length; i < l; i++) {
        if (classname) {
            if (siblings[i].nodeType === 1 && (trim(siblings[i].getAttribute('_class_')) === classname)) {
                ++elementTagLength;
            }
        } else {
            if ((siblings[i].nodeType == 1) && (siblings[i].tagName === element.tagName)) {
                ++elementTagLength;
            }
        }
    }

    for (let i = 0, l = siblings.length; i < l; i++) {
        var sibling = siblings[i];
        if (sibling === element) {
            return getSelector(element.parentNode) + ' > ' + (classname ? '.' + classname.replace(/\s+/g, '.') : element.tagName.toLowerCase()) + ((!ix && elementTagLength === 1) ? '' : ':nth-child(' + (ix + 1) + ')');
        } else if (sibling.nodeType == 1) {
            ix++;
        }
    }
};

export let getSelector = function (element) {
    var selector = _getSelector_(element);
    element = document.querySelector(selector);
    var selectors = selector.split('>'),
        length = selectors.length,
        preSelector = selector;

    for (var i = 1; i < length; i++) {
        var css = selectors.slice(i, length).join('>');
        if (document.querySelector(css) !== element) {
            break;
        }
        preSelector = css;
    }

    return preSelector.trim();
}

export let stringify = function(obj){
    return JSON.stringify(obj);
}
var tagIdAndClass = function (element) {
    if (element && element.id) {
        element.setAttribute('_id_', element.id);
    }

    if (element && element.className) {
        element.setAttribute('_class_', element.className);
    }

    var childNodes = element.childNodes;
    if (childNodes.length) {
        for (var i = 0, len = childNodes.length; i < len; i++) {
            tagIdAndClass(childNodes[i]);
        }
    }
}

tagIdAndClass(document.body);
// DOM结构有变化的时候，重新将新增的元素的id和class储存起来
document.addEventListener('DOMNodeInserted', function (e) {
    var elem = e.target;

    tagIdAndClass(elem);
});
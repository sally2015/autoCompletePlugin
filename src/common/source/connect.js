import eventTrigger from './event.js';
import './index.js'
let random = Math.random();
let port = chrome.runtime.connect({ name: location.href + 'content_script' });

port.onMessage.addListener(function (args) {
    eventTrigger.trigger(args.type, args);
});
['contentExcuted', 'getPaths'].forEach((item) => {
    eventTrigger.on(item, (args) => {
        port.postMessage({
            type: item,
            ...args
        });
    })
})

eventTrigger.on('disconnect', (args) => {
    port.postMessage(Object.assign(args, {
        type: 'disconnect'
    }));
    port.disconnect();
})
eventTrigger.trigger('contentExcuted');

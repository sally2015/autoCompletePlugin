
import { info } from './log';


export function sendMessage(event, data, response) {
  let d = data;
  let r = response;
  if (typeof data === 'function' && !r) {
    d = {};
    r = data;
  }

  info('[sendMessage] ', event);
  chrome.runtime.sendMessage('', event, d, (responseMsg) => {
    info('[sendMessageBack]', event, responseMsg);
    r(responseMsg);
  });
}

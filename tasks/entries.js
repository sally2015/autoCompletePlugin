const path = require('path');
const fs = require('fs');

let getTime = function() {
    let now = new Date();
    let h = ('0' + now.getHours()).substr(-2, 2);
    let m = ('0' + now.getMinutes()).substr(-2, 2);
    let s = ('0' + now.getSeconds()).substr(-2, 2);
    return `[${h}:${m}:${s}]`;
  };
  
function entries(config) {
    const bizDir = path.resolve(__dirname, '../src/scripts/');
    const allBiz = fs.readdirSync(bizDir);
    let entrys = {};
    let entryName = [];
    
    allBiz.forEach((b) => {
      let bp = path.resolve(bizDir, b);
      if (fs.statSync(bp).isDirectory()) {
        try {
          fs.openSync(path.resolve(bp, 'index.js'), 'r');
        } catch(e) {
          return;
        }
        entryName.push(b);
        entrys[b] = [path.resolve(bp, 'index.js')];
      }
    });
    console.log(`${getTime()} 添加入口： ${entryName}`);
    entrys['background'] = config.entry.background;
    config.entry = entrys;
}
module.exports = entries
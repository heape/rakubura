const electron = require('electron').remote, util = electron.getGlobal('util');
window.electron = electron;
window.util = util;
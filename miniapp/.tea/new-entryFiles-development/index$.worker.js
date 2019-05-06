
require('./config$.js?appxworker=1');
require('./importScripts$.js?appxworker=1');
function success() {
require('../..//app.js?appxworker=1');
require('../../components/header/header.js?appxworker=1');
require('../../components/middle/middle.js?appxworker=1');
require('../../components/bottom/bottom.js?appxworker=1');
require('../../pages/index/index.js?appxworker=1');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();

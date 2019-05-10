if(!self.__appxInited) {
self.__appxInited = 1;
require('@alipay/appx-compiler/lib/sjsEnvInit');

require('./config$');
require('./importScripts$');

var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;

if(AFAppX.compilerConfig){ AFAppX.compilerConfig.component2 = true; }
function success() {
require('../..//app');
require('../../components/header/header');
require('../../components/middle/middle');
require('../../components/bottom/bottom');
require('../../pages/index/index');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}
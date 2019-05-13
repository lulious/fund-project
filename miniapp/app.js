App({
  onLaunch(){
   if(!my.canIUse('component')){
     my.alert({
      title: `当前支付宝版本过低，请升级app后再来使用`,
    });
   }
  }
});

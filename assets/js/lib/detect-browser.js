function detectBrowser() {
  if(document.documentMode) {
    return 'ie';
  }else if (typeof InstallTrigger !== 'undefined'){
    return 'firefox'
  }else {
    return 'chrome-safari'
  }
}
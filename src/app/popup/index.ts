console.log('popup')
// open dashboard page
if (Chrome.runtime.openOptionsPage) {
  Chrome.runtime.openOptionsPage()
} else {
  window.open(Chrome.runtime.getURL('options.html'))
}

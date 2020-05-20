// open dashboard page
if (chrome.runtime.openOptionsPage) {
  chrome.runtime.openOptionsPage()
} else {
  window.open(chrome.runtime.getURL('./options/dashboard.html'))
}

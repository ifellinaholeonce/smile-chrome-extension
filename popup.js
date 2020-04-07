const setList = msg => {
  document.getElementById("smileDiv").innerText = msg.smileDiv
  document.getElementById("smileJS").innerText = msg.smileJS
  document.getElementById("smileUI").innerText = msg.smileUI
  if (Object.keys(msg).every((k) => !!msg[k])) {
    if (document.getElementById("smileUIBtn")) {
      return
    } else {
      let footerEl = document.createElement("div")
      footerEl.className = "footer"
      let btnEl = document.createElement("span")
      btnEl.className = "smileUIBtn"
      btnEl.id = "openPanel"
      btnEl.innerText = "Open Panel"
      footerEl.appendChild(btnEl)
      document.body.appendChild(footerEl)
      document.getElementById("openPanel").addEventListener("click", openPanel);
    }
  }
};

window.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: 'getList' },
      setList);
  });
});

const openPanel = () => {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: 'openPanel' });
  });
}

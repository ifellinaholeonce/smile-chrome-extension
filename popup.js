// Update the relevant fields with the new data.
const setList = msg => {
  document.getElementById("smileDiv").innerText = msg.smileDiv
  document.getElementById("smileJS").innerText = msg.smileJS
  document.getElementById("smileUI").innerText = msg.smileUI
  if (Object.keys(msg).every((k) => !!msg[k])) {
    document.getElementById("smileUI").innerHTML = '<button id="openPanel">Test</button>'
    document.getElementById('openPanel').addEventListener('click', openPanel);
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

function openPanel() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: 'openPanel' });
  });
}

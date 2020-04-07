const setList = msg => {
  document.getElementById("smileDiv").innerText = mapValue(msg.smileDiv)
  document.getElementById("smileDiv").classList += mapValue(msg.smileDiv)
  document.getElementById("smileJS").innerText = mapValue(msg.smileJS)
  document.getElementById("smileJS").classList += mapValue(msg.smileJS)
  document.getElementById("smileUI").innerText = mapValue(msg.smileUI)
  document.getElementById("smileUI").classList += mapValue(msg.smileUI)
  if (msg.data.account) {
    addInternalLink(msg.data.account)
  }
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
      if (msg.data.display_setting) {
        footerEl.style.backgroundColor = msg.data.display_setting.primary_color
        btnEl.style.backgroundColor = msg.data.display_setting.primary_color
      }
      footerEl.appendChild(btnEl)
      document.body.appendChild(footerEl)
      document.getElementById("openPanel").addEventListener("click", openPanel);
    }
  }
};

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

const mapValue = (value) => {
  let text = value
  switch (value) {
    case true:
      text = "Available"
      break;
    case false:
      text = "Unavailable"
      break;
    default:
      text = "Unavailable"
  }
  return text
}

const addInternalLink = account => {
  if (document.getElementById("internalLink")) {
    return
  } else {
    let link = document.createElement("a")
    link.id = "internalLink"
    link.innerText = "Open in Internal"
    link.href = `https://internal.smile.io/accounts/${account.id}`
    link.target = "_blank"
    document.getElementById("linkContainer").appendChild(link)
    document.getElementById("linkContainer").classList += "internal-link"
  }
}

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

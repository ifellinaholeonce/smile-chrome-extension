const options = {
  smileDiv: "Unavailable",
  smileJS: "Unavailable",
  smileUI: "Unavailable"
}

const main = async delay => {
  const smileDiv = document.getElementsByClassName("smile-shopify-init")[0]

  if (smileDiv != undefined) {
    if (smileDiv.dataset["channelKey"].length > 0) {
      updateValue("smileDiv", true)

      if (delay) { await new Promise(r => setTimeout(r, 2000)); }

      ({ Smile, SmileUI } = retrieveWindowVariables(["Smile", "SmileUI"]))

      if (Smile) {
        updateIcon(true)
        updateValue("smileJS", true)
      } else {
        updateIcon(false)
        updateValue("smileJS", false)
      }
      if (SmileUI) {
        updateIcon(true)
        updateValue("smileUI", true)
      } else {
        updateIcon(false)
        updateValue("smileUI", false)
      }
    } else {
      updateIcon(false)
      updateValue("smileDiv", false)
    }
  } else {
    updateIcon(false)
    updateValue("smileDiv", false)
  }
}

//retrieve varaibles from DOM using tmp attributes
const retrieveWindowVariables = variables => {
  var ret = {};

  var scriptContent = "";
  for (var i = 0; i < variables.length; i++) {
    var currVariable = variables[i];
    scriptContent += "if (typeof " + currVariable + " !== 'undefined') { document.body.setAttribute('tmp_" + currVariable + "', " + currVariable + ") };\n"
  }

  var script = document.createElement('script');
  script.id = 'tmpScript';
  script.appendChild(document.createTextNode(scriptContent));
  (document.body || document.head || document.documentElement).appendChild(script);

  for (var i = 0; i < variables.length; i++) {
    var currVariable = variables[i];
    ret[currVariable] = document.body.getAttribute("tmp_" + currVariable);
    document.body.removeAttribute("tmp_" + currVariable);
  }

  document.getElementById("tmpScript").remove();

  return ret;
}

const updateIcon = value => {
  chrome.runtime.sendMessage({
    action: 'updateIcon',
    value: value
  });
}

const updateValue = (element, value) => {
  options[element] = mapValue(value)
}

const mapValue = (value) => {
  let text = value
  switch(value) {
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

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.action === "getList") {
    main(false)
    response(options);
  }
  if (msg.action === 'openPanel') {
    document.dispatchEvent(evt)
  }
});

window.addEventListener("load", main(true), false);

// This event is used to open SmileUI Panel when it is available.
const evt = document.createEvent('Event');
evt.initEvent('smileExtensionTrigger', true, false);

document.addEventListener("smileExtensionTrigger", function () {
  window.location.href = "javascript:SmileUI.openPanel()"
})

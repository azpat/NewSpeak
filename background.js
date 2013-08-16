initialize();

function getObject(name){return JSON.parse(localStorage.getItem(name))}
function setObject(name, o){localStorage.setItem(name, JSON.stringify(o))}

function initialize(){
  console.log("initialize");
  var NS=getObject("NS");
  if (NS == undefined ) {
    // Set Defaults
    NS={
      DisplayPreference:'restore',
      Dictionary:[{ "newspeak": "enhanced interrogation", "oldspeak": "torture" },
                  { "newspeak": "targeted killing", "oldspeak": "assassination" },
                  { "newspeak": "detainee", "oldspeak": "prisoner" },
                  { "newspeak": "defense", "oldspeak": "military" }
                 ]};
    setObject("NS", NS);
  }  
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  console.log("background:onRequest");
  if (request.method == "getOptions") {
    //sendResponse({data: localStorage[request.key]});
	  //sendResponse({data: "Hello World"});
	  sendResponse({NS: getObject("NS")});
  }
  else {
    sendResponse({}); // snub them.
  }
});

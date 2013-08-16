//First get options  
  chrome.extension.sendRequest({method: "getOptions"}, 
    function(response){
    console.log("inject:sendRequest: " + "getOptions="+response.NS.DisplayPreference);
    NS=response.NS;
    redPill(NS);
    }
  );

    // ----------------------------------------------------------
    // This part of the script triggers when page is done loading
    console.log("RedPill returns newspeak to oldspeak.");
    // ----------------------------------------------------------
function redPill(NS) {
  var moksha = NS.Dictionary;
  for (var p in moksha) {
        //todo: http://blog.alexanderdickson.com/javascript-replacing-text
        if (NS.DisplayPreference=='restore')
        {
          document.body.innerHTML = document.body.innerHTML.replace(RegExp(moksha[p].newspeak, 'ig'), '<span title="OldSpeak restored by OldSpeak for Chrome"><del>' + moksha[p].newspeak + '</del><ins style="font-style:italic;">' + moksha[p].oldspeak + '</ins></span>');
        }
        else {
          document.body.innerHTML = document.body.innerHTML.replace(RegExp(moksha[p].newspeak, 'ig'), '<span title="NewSpeak revealed by NewSpeak for Chrome"><del>' + moksha[p].oldspeak + '</del><ins style="font-style:italic;">' + moksha[p].newspeak + '</ins></span>');
        }
        
  }
};
    

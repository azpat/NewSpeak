console.log("RedPill returns newspeak to oldspeak.");
var NS; //can NS be defined at this level?

//First get options  
chrome.extension.sendRequest({method: "getOptions"}, 
  function(response){
  console.log("inject:sendRequest: " + "getOptions="+response.NS.DisplayPreference);
  NS=response.NS;  
  walk(document.body);
  }
);

//This is the algorithm that Cloud-to-Butt uses, which seems to be better.
function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E

	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

// Cloud to butt doesn't add HTML, to get this to work I had to use advice from here: http://james.padolsey.com/javascript/replacing-text-in-the-dom-its-not-that-simple/
// TODO: use his new and improved library here: https://github.com/padolsey/findAndReplaceDOMText
function handleText(textNode) 
{
  var temp = document.createElement('div');
  var textReplaced = false;

  for (var p in NS.Dictionary) {
    if (RegExp(NS.Dictionary[p].newspeak, 'ig').test(textNode.nodeValue)) {
      textReplaced=true;
      if (NS.DisplayPreference=='restore') {
        temp.innerHTML = textNode.nodeValue.replace(RegExp(NS.Dictionary[p].newspeak, 'ig'), '<span title="OldSpeak restored by NewSpeak for Chrome"><del>' + NS.Dictionary[p].newspeak + '</del><ins style="font-style:italic;text-decoration:none;"> ' + NS.Dictionary[p].oldspeak + '</ins></span>');
      }
      else {
        temp.innerHTML = textNode.nodeValue.replace(RegExp(NS.Dictionary[p].newspeak, 'ig'), '<span title="NewSpeak revealed by NewSpeak for Chrome"><del>' + NS.Dictionary[p].oldspeak + '</del><ins style="font-style:italic;text-decoration:none;"> ' + NS.Dictionary[p].newspeak + '</ins></span>');
      }
    }
  }
  
  if (textReplaced){
    // Extract the newly produced nodes from temp element and insert them before the original textNode.
    while (temp.firstChild) {
      console.log(temp.firstChild);
      (textNode.parentNode).insertBefore(temp.firstChild, textNode);
    }
    // remove this text node
    textNode.parentNode.removeChild(textNode);
  }
}

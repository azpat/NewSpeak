function getObject(name){ return JSON.parse(localStorage.getItem(name))}
function setObject(name, o){ localStorage.setItem(name, JSON.stringify(o))}
var NS=getObject("NS");

function loadOptions(){
  if (NS.DisplayPreference == undefined || NS.DisplayPreference != "restore") {
    //select DisplayPreference option for 'reveal' and make that selected
    document.getElementById("reveal").checked="checked";
  }
  else {
    //select DisplayPreference option for 'restore' and make that selected
    document.getElementById("restore").checked="checked";    
  }
}

function saveOptions(){
  if (document.getElementById("restore").checked){NS.DisplayPreference='restore'};
  if (document.getElementById("reveal").checked){NS.DisplayPreference='reveal'};
  setObject("NS", NS);
}

function init()
{
  loadOptions();
  var submitButton = document.querySelector('button.save');
  submitButton.addEventListener('click', saveOptions);
  //resetButton.addEventListener('click', reset);
}

document.addEventListener('DOMContentLoaded', init);
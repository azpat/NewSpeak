    // ----------------------------------------------------------
    // This part of the script triggers when page is done loading
    console.log("RedPill returns newspeak to oldspeak.");
    // ----------------------------------------------------------
    redPill();

    function redPill() {
        var moksha = [
            { "newspeak": "enhanced interrogation", "oldspeak": "torture" },
            { "newspeak": "targeted killing", "oldspeak": "assassination" },
            { "newspeak": "detainee", "oldspeak": "prisoner" },
            { "newspeak": "defense", "oldspeak": "military" }
        ];
        
        for (var p in moksha) {
            document.body.innerHTML = document.body.innerHTML.replace(RegExp(moksha[p].newspeak, 'ig'), "<strike>" + moksha[p].newspeak + "</strike> " + "<i>" + moksha[p].oldspeak + "</i>");
        }
    }
   

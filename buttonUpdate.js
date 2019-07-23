var lightis;
var pumpis;
var fanis;
var robotis;

setInterval(readsens1, 500);
setInterval(readsens2, 550);
setInterval(readsens3, 600);

function readsens1() {
  $.getJSON("https://things.ubidots.com/api/v1.6/devices/demo/light/lv?token=A1E-##############################", function(data) { // paste your ubidots token here in place of ##############################
    lightis = data;
    lightbtnupdate(lightis);
  });
}
function readsens2() {
   $.getJSON("https://things.ubidots.com/api/v1.6/devices/demo/pump/lv?token=A1E-##############################", function(data){
    pumpis = data;
    pumpbtnupdate(pumpis);
   });
 }
 function readsens3() {
   $.getJSON("https://things.ubidots.com/api/v1.6/devices/demo/fan/lv?token=A1E-##############################", function(data){
    fanis = data;
    fanbtnupdate(fanis);
   });
}

function lightbtnupdate(state) {
  if (state == "1") {
     document.getElementById("light").checked = true; //on
  } else {
    document.getElementById("light").checked = false; //off
    }
  }

  function pumpbtnupdate(state) {
  if (state == "1") {
     document.getElementById("pump").checked = true; //on
  } else {
    document.getElementById("pump").checked = false; //off
    }
  }

  function fanbtnupdate(state) {
  if (state == "1") {
     document.getElementById("fan").checked = true; //on
  } else {
    document.getElementById("fan").checked = false; //off
    }
  }

function lighttog() {
  if (lightis == "1") {
    $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############&light=0'); // paste your thing http API key in place of #############
    lightbtnupdate("0");
  } 
  else{
    $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############&light=1');
    lightbtnupdate("1");
  }
}

function pumptog() {
  if (pumpis == "1") {
    $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############&pump=0');
    pumpbtnupdate("0");
  } else {
    $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############&pump=1');
    pumpbtnupdate("1");
  }
}

function fantog() {
  if (fanis == "1") {
    $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############&fan=0');
    fanbtnupdate("0");
  } else {
    $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############&fan=1');
    fanbtnupdate("1");
  }
}

function robottog() {
  if (document.getElementById("robot").checked == true) {
    $.post('https://things.ubidots.com/api/v1.6/devices/demo/robot/?token=A1E-##########################=1');
  } else {
    $.post('https://things.ubidots.com/api/v1.6/devices/demo/robot/?token=A1E-##########################=0');
  }
}
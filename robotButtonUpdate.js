function robottog() {

  $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#################&rc=1');
  document.getElementById("robot").checked = true;
  
  getDisease();
}

function readRC(){

  $.getJSON("https://things.ubidots.com/api/v1.6/devices/demo/rc/lv?token=A1E-#########################", function(data){
  
  if (data == "1") {
     document.getElementById("robot").checked = true; //on
  } else {
    document.getElementById("robot").checked = false; //off
 
  }});

  getDisease();
}

setInterval(readRC(),1000);

function getDisease(){

	$.getJSON("https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#################", function(data){
	var disease = data;
	document.getElementById("diseaseID").innerHTML = 'Your plant may be affect by : '+disease;
   });

}getDisease();

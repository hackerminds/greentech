var autois;
// All this jquery is just used for presentation. Not required at all for the radio buttons to work.
$( document ).ready(function(){
//  Hide the border by commenting out the variable below
    var $on = 'section';
    $($on).css({
      'background':'none',
      'border':'none',
      'box-shadow':'none'
    });
}); 


// call respective function on select 
function func (it, that, box) {

  var state = box.checked; //check for the auto or manual option
  
  if (state == true) {
  	document.getElementById(it).style.display = "block";
  	document.getElementById(that).style.display = "none";
    document.getElementById("descriptionList").style.display = "block";
    //send the value high to ubidots
    $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=################&auto=1'); //paste your thning HTTP url andAPI key in place of ################
  }
  if (state == false) {
  	document.getElementById(that).style.display = "block";
  	document.getElementById(it).style.display = "none";
    document.getElementById("descriptionList").style.display = "none";
    //send the value low to ubidots
    $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=################&auto=0'); //paste your thning HTTP url and API key in place of ################
  }
}

function defaultFunc (it, that) {
  
  $.getJSON("https://things.ubidots.com/api/v1.6/devices/****/auto/lv?token=A1E-################################", function(data) { // paste your Ubidots token and URL 
    
    autois = data;
    if(autois == "0"){
      console.log("Manual");
      document.getElementById("slideThree").checked = true; //on
      document.getElementById("slideThree").checked = false; //off
      document.getElementById(that).style.display = "block";
      document.getElementById(it).style.display = "none";
    }
    
    if(autois == "1")
    {
      console.log("Automatic");
      document.getElementById("slideThree").checked = true; //on
      document.getElementById(it).style.display = "block";
      document.getElementById(that).style.display = "none";
    }
    
  });
}


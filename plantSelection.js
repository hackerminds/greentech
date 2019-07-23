//  load specific settings for a crop
var crop;

function loadcrop(crop) {

    if (crop == 'Tomato') {
      $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############&maxtemp=30'); //maxTemp 30
      $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############&mintemp=28'); //minTemp 28
      $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############&minmoist=70'); //minMoist
      $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############&maxmoist=44'); //maxMoist
      $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############&mininten=52'); //minInten
      $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############&maxinten=53'); //maxInten
    }

    if (crop == "Brinjal") {
      $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############&maxtemp=32'); //maxTemp 30
      $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############&mintemp=28'); //minTemp 28
      $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############&minmoist=80'); //minMoist
      $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############&maxmoist=30'); //maxMoist
      $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############&mininten=52'); //minInten
      $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############W&maxinten=55') ;//maxInten
    }

    if (crop == "Capsicum") {
      $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############&maxtemp=28'); //maxTemp 30
      $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############&mintemp=25'); //minTemp 28
      $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############&minmoist=75'); //minMoist
      $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############&maxmoist=40'); //maxMoist
      $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############&mininten=55'); //minInten
      $.post('https://api.thingspeak.com/apps/thinghttp/send_request?api_key=#############&maxinten=50'); //maxInten
    }
  }

//Show or hide the plant descripton depending on the crop
var slctCrop;

function ShowHideDiv(slctCrop) {

    var slct = document.getElementById("slct");
    var hideShowTomato = document.getElementById("hideShowTomato");
    var hideShowBrinjal = document.getElementById("hideShowBrinjal");
    var hideShowCapsicum = document.getElementById("hideShowCapsicum");

    hideShowTomato.style.display = slct.value == "Tomato" ? "block" : "none";
    hideShowBrinjal.style.display = slct.value == "Brinjal" ? "block" : "none";
    hideShowCapsicum.style.display = slct.value == "Capsicum" ? "block" : "none";
}
var temperatureReading = 28;
var moistureReading = 30;
var humidityReading = 50;
var ambientlightReading = 50;

readSensor() // initial value
     
function readSensor(){
  $.getJSON("https://things.ubidots.com/api/v1.6/devices/demo/soil/lv?token=A1E-###########################",function(data){
    moistureReading = data;
    updates();
  });
  $.getJSON("https://things.ubidots.com/api/v1.6/devices/demo/temp/lv?token=A1E-###########################",function(data){
    temperatureReading = data;
    updates();
  });
  $.getJSON("https://things.ubidots.com/api/v1.6/devices/demo/humidity/lv?token=A1E-###########################",function(data){
    humidityReading = data;
    updates();
  });
  $.getJSON("https://things.ubidots.com/api/v1.6/devices/demo/ambientlight/lv?token=A1E-###########################",function(data){
    ambientlightReading = data;
    updates();
  });
}

setInterval(readSensor,100);

function updates(){
  var soilMoist = 100-parseInt(moistureReading*(100/1024));

  $("#PreviewGaugeMeter_1").gaugeMeter({text:soilMoist,percent:soilMoist});

  if (temperatureReading >100) { temperatureReading = 0;}
  $("#PreviewGaugeMeter_2").gaugeMeter({text:temperatureReading,percent:temperatureReading});

  if (humidityReading >=100) { humidityReading = 0;}
  $("#PreviewGaugeMeter_3").gaugeMeter({text:humidityReading,percent:humidityReading});

  var ambiLight = parseInt(ambientlightReading*(100/1024));

  $("#PreviewGaugeMeter_4").gaugeMeter({text:ambiLight,percent:ambiLight});
}

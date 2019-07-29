#include "UbidotsESPMQTT.h"

#define TOKEN "XXXXXXXX.........XXX" // Your Ubidots TOKEN
#define WIFINAME "SSID" //Your SSID
#define WIFIPASS "PASSWORD" // Your Wifi Pass

#define offset 4

#define Pump D0
#define Lights D1
#define Fan D2

String message = "";         // a String to hold incoming data

unsigned int light;
unsigned int fan;
unsigned int pump;
unsigned int Mode;
unsigned int maxTemp;
unsigned int minTemp;
unsigned int maxMoist;
unsigned int minMoist;
unsigned int maxInten;
unsigned int minInten;
unsigned int temperature;
unsigned int moisture;
unsigned int intensity;


Ubidots client(TOKEN);
//SoftwareSerial Serial(3,1); 

//callback function will run when any cloud variable changes or updates
void callback(char* topic, byte* payload, unsigned int length) 
{
  //show on node terminal and also push to arduino
  message = (topic+19);
  message += (':');
  for (int i=0;i<length;i++) 
  {
    message += ((char)payload[i]);
  }
  Serial.println(message);
}

void setup() {
  pinMode(Pump, OUTPUT);
  pinMode(Lights, OUTPUT);
  pinMode(Fan, OUTPUT);
  digitalWrite(Pump, HIGH);
  digitalWrite(Lights, HIGH);
  digitalWrite(Fan, HIGH);
   
  message.reserve(30);
  Serial.begin(9600);
  client.setDebug(true);
  client.wifiConnection(WIFINAME, WIFIPASS);
  client.begin(callback);
 
 //Insert the dataSource and Variable's Labels
   client.ubidotsSubscribe("demo","light");
   client.ubidotsSubscribe("demo","fan");
   client.ubidotsSubscribe("demo","pump");
   client.ubidotsSubscribe("demo","auto");
   client.ubidotsSubscribe("demo","ambientlight");
   client.ubidotsSubscribe("demo","soil");
   client.ubidotsSubscribe("demo","temperature");
   client.ubidotsSubscribe("demo","mintemp");
   client.ubidotsSubscribe("demo","maxtemp");
   client.ubidotsSubscribe("demo","minmoist");
   client.ubidotsSubscribe("demo","maxmoist");
   client.ubidotsSubscribe("demo","mininten");
   client.ubidotsSubscribe("demo","maxinten");
  }

void loop() {
  if(!client.connected())
  {
      client.reconnect();
      client.ubidotsSubscribe("demo","light");
      client.ubidotsSubscribe("demo","fan");
      client.ubidotsSubscribe("demo","pump");
      client.ubidotsSubscribe("demo","auto");
      client.ubidotsSubscribe("demo","ambientlight");
      client.ubidotsSubscribe("demo","Soil");
      client.ubidotsSubscribe("demo","Temperature");
      client.ubidotsSubscribe("demo","mintemp");
      client.ubidotsSubscribe("demo","maxtemp");
      client.ubidotsSubscribe("demo","minmoist");
      client.ubidotsSubscribe("demo","maxmoist");
      client.ubidotsSubscribe("demo","mininten");
      client.ubidotsSubscribe("demo","maxinten");
  }

  {
    if(message.substring(0,5)=="light")
      light = message.substring(5+offset).toInt();
    if(message.substring(0,3)=="fan")
      fan = message.substring(3+offset).toInt();
    if(message.substring(0,4)=="pump")
      pump = message.substring(4+offset).toInt();
    if(message.substring(0,4)=="auto")
      Mode = message.substring(4+offset).toInt();
    if(message.substring(0,11)=="temperature")
      temperature = message.substring(11+offset).toInt();
    if(message.substring(0,4)=="soil")
      moisture = message.substring(4+offset).toInt();
    if(message.substring(0,12)=="ambientlight")
      intensity = message.substring(12+offset).toInt();
    if(message.substring(0,7)=="mintemp")
      minTemp = message.substring(7+offset).toInt();
    if(message.substring(0,7)=="maxtemp")
      maxTemp = message.substring(4+offset).toInt();
    if(message.substring(0,8)=="minmoist")
      minMoist = message.substring(4+offset).toInt();
    if(message.substring(0,8)=="maxmoist")
      maxMoist = message.substring(4+offset).toInt();
    if(message.substring(0,8)=="mininten")
      minInten = message.substring(4+offset).toInt();
    if(message.substring(0,8)=="maxinten")
      maxInten = message.substring(4+offset).toInt();
    message = "";
   }

  if(light == 1)
    digitalWrite(Lights, LOW);
  if(light == 0)
    digitalWrite(Lights, HIGH);
  if(pump == 1)
    digitalWrite(Pump, LOW);
  if(pump == 0)
    digitalWrite(Pump, HIGH);
  if(fan == 1)
    digitalWrite(Fan, LOW);
  if(fan == 0)
    digitalWrite(Fan, HIGH);

  if(Mode == 1)
  {
    if(intensity < minInten)
      digitalWrite(Lights, LOW);
    if(intensity > maxInten)
      digitalWrite(Lights, HIGH);
    if(moisture > minMoist)
      digitalWrite(Pump, LOW);
    if(moisture < maxMoist)
      digitalWrite(Pump, HIGH);
    if(temperature > maxTemp)
      digitalWrite(Fan, LOW);
    if(temperature < minTemp)
    digitalWrite(Fan, HIGH);
  }
  client.loop();
}

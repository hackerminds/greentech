#include "UbidotsESPMQTT.h"

#define TOKEN "A1E-x3McHbMANDj9zdkdasXd6GrwtMGEH1" // Your Ubidots TOKEN
#define WIFINAME "Hrishi" //Your SSID
#define WIFIPASS "hrishi98" // Your Wifi Pass

String message = "";         // a String to hold incoming data
bool stringComplete = false;  // whether the string is complete
unsigned long oldtime = 0;
const long interval = 5000;

Ubidots client(TOKEN);

//callback function will run when any cloud variable changes or updates
void callback(char* topic, byte* payload, unsigned int length) 
{
  //show on node terminal and also push to arduino
  Serial.print(topic+19);
  Serial.print(':');
  for (int i=0;i<length;i++) 
  {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void setup() 
{
  message.reserve(30);
  Serial.begin(9600);
  client.setDebug(true);
  client.wifiConnection(WIFINAME, WIFIPASS);
  client.begin(callback);
}

void loop() 
{
  if(!client.connected())
    client.reconnect();
    
  if(stringComplete)
  {
    if(message.substring(0,4)=="temp")  
      client.add("temperature",((message.substring(5)).toFloat()));
    if(message.substring(0,4)=="humi")
      client.add("humidity",((message.substring(5)).toFloat()));
    if(message.substring(0,4)=="mois")
      client.add("soil",((message.substring(5)).toFloat()));
    if(message.substring(0,4)=="ambi")
      client.add("ambientlight",((message.substring(5)).toFloat()));
       
    client.ubidotsPublish("demo");//update var when new sensor value is recieved
    message = "";
    stringComplete = false;
    Serial.println("cleared string");
  }

  serialevent();
  client.loop();
}

void serialevent()
{
  while (Serial.available())
  {
    char inChar = Serial.read();
    message += inChar;
    if (inChar == '\n') 
    {
      stringComplete = true;
    }
  }
}

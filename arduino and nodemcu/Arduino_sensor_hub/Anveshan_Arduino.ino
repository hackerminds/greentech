#include <Wire.h>
#include<dht.h>

#define humiditySensor 3
#define lightSensor    15
#define moistureSensor 14

#define offset 4

dht DHT;

unsigned long oldtime = 0;
const long interval = 2000;
int count=0;

unsigned int temperature;
unsigned int moisture;
unsigned int intensity;

String inputString = "";

void setup() 
{
  Wire.begin();
  inputString.reserve(200);
  Serial.begin(9600); 
}

void loop() 
{
  unsigned long newtime = millis();
  if (newtime - oldtime >= interval)
  {
    oldtime = newtime;
    if(count==0)    //Temperature
    {
      Wire.beginTransmission(0x48);
      Wire.write(0x00);
      Wire.endTransmission(false);
      Wire.requestFrom(0x48,2);
      uint16_t Value;
      if(2 <= Wire.available())
      {
        Value = Wire.read();
        Value = Value << 8;
        Value |= Wire.read();
        Value = (Value >> 3);
        temperature = Value/16;
        Serial.print("temp:");
        Serial.println(temperature);
      }
    }
    if(count==1)
    {
      int chk = DHT.read11(humiditySensor);
      Serial.print("humi:");
      Serial.println(DHT.humidity, 2);
    }
    if(count==2)
    {
      Serial.print("mois:");
      moisture = analogRead(moistureSensor);
      Serial.println(moisture);
    }
    if(count==3)
    {
      Serial.print("ambi:");
      intensity = analogRead(lightSensor);
      Serial.println(intensity);
    }
    (count>=3)?count=0:count++;
  }   
}

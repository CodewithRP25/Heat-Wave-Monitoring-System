#include "DHT.h"

#define DHTPIN 4
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
}

void loop() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Sensor reading failed!");
    delay(2000);
    return;
  }

  Serial.println("{");
  Serial.println("  \"device_id\": \"ESP32_01\",");
  Serial.print("  \"temperature\": ");
  Serial.print(temperature);
  Serial.println(",");
  Serial.print("  \"humidity\": ");
  Serial.print(humidity);
  Serial.println(",");
  Serial.println("  \"timestamp\": \"not_set\"");
  Serial.println("}");

  delay(5000);
}
#include <Arduino.h>
#include <U8x8lib.h>
#ifdef U8X8_HAVE_HW_SPI
#include <SPI.h>
#endif

#include <WiFi.h>
#include <WiFiClient.h>
#include <WebServer.h>
#include <ESPmDNS.h>

U8X8_SSD1306_128X64_NONAME_SW_I2C u8x8(15, 4, 16);

uint8_t arrow[8] = {0, 24, 24, 24, 126, 60, 24, 0}; 
uint8_t arrowInv[8] = {255, 231, 231, 231, 129, 195, 231, 255}; 

void setup() {
  pinMode(10, OUTPUT);
  pinMode(9, OUTPUT);
  pinMode(0, INPUT);
  digitalWrite(10, 0);
  digitalWrite(9, 0);

  Serial.begin(115200);
  
  u8x8.begin();
  u8x8.setPowerSave(0);
  u8x8.setFont(u8x8_font_chroma48medium8_r);
  u8x8.drawString(0,0, "Connect:");
  u8x8.drawTile(0,1,1,arrow);
  for (int i = 2; i < 8; i++) {
    u8x8.drawTile(0,i,1,arrowInv);
  }

  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
}

void loop() {
  int n = WiFi.scanNetworks();
  if (n == 0) {
    u8x8.drawString(1,1,"No networks found.");
  } else {
    for (int i = 0; i < n; ++i) {
      u8x8.setCursor(1,i+1);
      u8x8.print(WiFi.SSID(i)[0]);
      u8x8.print((WiFi.encryptionType(i) == WIFI_AUTH_OPEN)?"":"*");
    }
  }

  delay(5000);
}

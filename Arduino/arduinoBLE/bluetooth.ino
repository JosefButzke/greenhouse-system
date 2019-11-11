#include <SoftwareSerial.h>
#include <DHT.h>
#include <Ultrasonic.h>
SoftwareSerial BTserial(2, 3); // RX | TX
// Connect the HC-05 TX to Arduino pin 2 RX.
// Connect the HC-05 RX to Arduino pin 3 TX through a voltage divider.

#define DHTPIN A0   // pino temp e hum
#define pinoSolo A1 // pino higrometro

#define DHTTYPE DHT22 // sensor DHT 22
DHT dht(DHTPIN, DHTTYPE);

#define pino_trigger 8
#define pino_echo 9
Ultrasonic ultrasonic(pino_trigger, pino_echo); // sensor ultrasonico

//DHT22 variaveis para envio ble
float temperatura;
float humidadeAr;

//LM393 valor captado
int humidadeSoloRaw;

//rele
int porta_rele_IN2 = 5;
int porta_rele_IN3 = 6;

//variaveis internas
String temperaturaSet = "25";
String humidadeArSet = "60";
String humidadeSoloSet = "60";

unsigned long period = 3600000; //intervalo de cada coleta de dados - 1hora
unsigned long time = 0;         // inicia tempo para calcular intervalo de 1 hora

void setup()
{
  pinMode(porta_rele_IN2, OUTPUT);    //rele
  digitalWrite(porta_rele_IN2, HIGH); //inicia desligado
  pinMode(porta_rele_IN3, OUTPUT);    //ventuinha

  Serial.begin(9600);
  Serial.println("Arduino is ready");

  //attachInterrupt(digitalPinToInterrupt(3), updateVariables, RISING);

  BTserial.begin(9600);
  dht.begin();
}

void loop()
{
  float hum = dht.readHumidity();
  float temp = dht.readTemperature();
  humidadeSoloRaw = analogRead(pinoSolo);
  int humidadeSolo = map(humidadeSoloRaw, 0, 1023, 100, 0);

  if (millis() > time + period)
  {
    float altura;
    long microsec = ultrasonic.timing();
    altura = ultrasonic.convert(microsec, Ultrasonic::CM);

    String response = String(temp) + ',' + String(hum) + ',' + String(humidadeSolo) + ',' + String(altura);

    if (altura > 4.0 && altura < 100.0)
      BTserial.print(response);
    time = millis();
  }

  if (humidadeSolo < humidadeSoloSet.toInt())
  {
    digitalWrite(porta_rele_IN2, LOW);
  }
  else
  {
    digitalWrite(porta_rele_IN2, HIGH);
  }

  if (temp > temperaturaSet.toFloat())
  {
    digitalWrite(porta_rele_IN3, LOW);
  }
  else
  {
    digitalWrite(porta_rele_IN3, HIGH);
  }

  if (BTserial.available())
  {
    String in = BTserial.readString();

    temperaturaSet = "";
    humidadeArSet = "";
    humidadeSoloSet = "";

    String per = "";

    temperaturaSet = temperaturaSet + char(in[0]) + char(in[1]);
    humidadeArSet = humidadeArSet + char(in[3]) + char(in[4]);
    humidadeSoloSet = humidadeSoloSet + char(in[6]) + char(in[7]);

    for (int i = 9; i < in.length(); i++)
    {
      per = per + char(in[i]);
    }

    period = atol(per.c_str());
    Serial.println(per);
  }
}

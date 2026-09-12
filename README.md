# niu-update

`update.json`-Dateien für den Manual-Update-Mod der gepatchten NIU-App 4.8.12
(https://files.catbox.moe/lxckb9.apk). Eingespielt wird die FOC-Firmware des Motor-Controllers,
je Modell in den drei Regionen DE, EU und US.

## URL zum Kopieren

```
https://github.com/Laufbursche42/niu-update/raw/main/MODELL/REGION/update.json
```

`REGION` ist `de`, `eu` oder `us`. Beispiel für den KQi 300X mit US-Firmware:

```
https://github.com/Laufbursche42/niu-update/raw/main/kqi-300x/us/update.json
```

Der Mod ruft die URL per GET ab. Falls eine Schreibweise nicht angenommen wird, liefert
`https://raw.githubusercontent.com/Laufbursche42/niu-update/main/MODELL/REGION/update.json`
denselben Inhalt.

## Verfügbare Firmware

| Modell | Ordner | Region | Version | Limit | Größe |
|---|---|---|---|---|---|
| KQi2 Pro | `kqi2-pro` | DE | K2E38J23 | 20 km/h | 27544 |
| KQi2 Pro | `kqi2-pro` | EU | K2E01J23 | 25 km/h | 27956 |
| KQi2 Pro | `kqi2-pro` | US | K2E13J23 | 28 km/h | 27956 |
| KQi3 Sport | `kqi3-sport` | DE | K3E38J23 | 20 km/h | 27456 |
| KQi3 Sport | `kqi3-sport` | EU | K3E01J23 | 25 km/h | 27836 |
| KQi3 Sport | `kqi3-sport` | US | K3E13J23 | 28 km/h | 27828 |
| KQi3 Pro | `kqi3-pro` | DE | K3E38J23 | 20 km/h | 27196 |
| KQi3 Pro | `kqi3-pro` | EU | K3E01J23 | 25 km/h | 27576 |
| KQi3 Pro | `kqi3-pro` | US | K3E13J23 | 32 km/h | 27608 |
| KQi3 Max | `kqi3-max` | DE | K3E38J23 | 21 km/h | 27412 |
| KQi3 Max | `kqi3-max` | EU | K3E01J23 | 25 km/h | 27820 |
| KQi3 Max | `kqi3-max` | US | K3E13J23 | 32 km/h | 27792 |
| KQi 300X | `kqi-300x` | DE | KBE38D05 | 21 km/h * | 29696 |
| KQi 300X | `kqi-300x` | EU | KBE01D03 | 25 km/h * | 29696 |
| KQi 300X | `kqi-300x` | US | KBE13D03 | 32 km/h * | 29696 |

Größe in Byte. Sie muss exakt stimmen, die App verwirft den Download sonst.

\* Beim 300X steht kein Limit im Dateinamen. Die Werte sind aus der Firmware ermittelt, nicht
offiziell angegeben.

Die Binaries liegen nicht in diesem Repo. Jede `update.json` verweist auf das Quell-Repo,
`scooterhacking/niu_scooters` für KQi2 und KQi3, `hjcday/KQi-300X-Firmware` für den 300X.

## In der App eintragen

1. App öffnen und auf **Einstellungen** -> **Über** gehen. Es öffnet sich der Bildschirm
   "Niu Manual Update"
2. Die URL in das Feld **Link to update json** einfügen
3. Den Knopf **Update** drücken. Der Toast muss die URL anzeigen. Kommt stattdessen die Meldung
   "You must provide a link to a json file", wurde sie nicht gespeichert
4. **Back to main app**
5. Mit dem E-Scooter verbinden und die Firmwareaktualisierung öffnen. Der Eintrag FOC muss als
   verfügbar angezeigt werden

Die `update.json` tritt an die Stelle der Serverantwort auf `v5/ota/checkupdate`. Es wird nur
das Bauteil FOC angeboten, damit nichts anderes angefasst wird.

## App-Daten löschen, falls kein Update angeboten wird

Die App merkt sich je Bauteil, welche Firmware-Version sie zuletzt erfolgreich eingespielt hat.
Steht dort bereits derselbe Wert den die `update.json` anbietet, wird das Update nicht mehr
angezeigt, obwohl es gar nicht auf dem E-Scooter ist. Der Abgleich ist ein reiner Textvergleich,
am Gerät wird nichts nachgeprüft.

Passieren kann das nur nach einem tatsächlich abgeschlossenen Flash. Ohne Root lässt sich der
Speicher so leeren:

1. Zuerst die Bluetooth-Schlüssel sichern. Im Bildschirm "Niu Manual Update" unter
   **BT Secrets!** auf **Copy to clipboard** drücken und die Zeichenkette dauerhaft ablegen,
   zum Beispiel per Mail an sich selbst. Ohne diese Schlüssel ist nach einer Kontosperrung keine
   Bluetooth-Verbindung mehr möglich
2. In Android **Einstellungen** -> **Apps** -> **NIU** -> **Speicher** -> **Daten löschen**.
   Bei manchen Herstellern heißt der Punkt "Speicher und Cache"
3. App neu starten, anmelden und den E-Scooter neu verbinden
4. Die URL wie oben beschrieben neu eintragen, sie wurde beim Löschen mit entfernt

Das Löschen entfernt auch Login und Bindung.

## Rechtlicher Hinweis

Mit der US-Firmware ist die Drossel aufgehoben. Die ABE erlischt und der Betrieb auf öffentlichen
Wegen ist damit nicht erlaubt. Gedacht für das eigene Gerät auf privatem Gelände.

Ein fehlgeschlagener Flash des FOC-Controllers kann den E-Scooter unbrauchbar machen.

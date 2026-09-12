# niu-update

`update.json`-Dateien für den Manual-Update-Mod der gepatchten NIU-App 4.8.12
(https://files.catbox.moe/lxckb9.apk). Eingespielt wird die FOC-Firmware des Motor-Controllers,
je Modell in den drei Regionen DE, EU und US.

**Webseite mit Filter und allen Links: https://laufbursche42.github.io/niu-update/**

## Quelle

Die Firmware stammt unverändert aus den beiden Community-Repos:

- KQi2 und KQi3: https://github.com/scooterhacking/niu_scooters
- KQi 300X: https://github.com/hjcday/KQi-300X-Firmware

Von dort übernommen sind nur die `update.json`. Da es Nutzer gab, die mit den `update.json` aus
diesen Repos Probleme hatten, wurden sie angepasst und werden hier neu bereitgestellt.

Die Binaries liegen nicht in diesem Repo. Jede `update.json` verweist auf das Quell-Repo.

## URLs

Fertige Links zum Kopieren, pro Modell und Region. Reihenfolge je Block: Region, Limit,
Version, Größe in Byte. Die Größe muss exakt stimmen, die App verwirft den Download sonst.

### KQi2 Pro

```
DE  20 km/h  K2E38J23  27544
https://github.com/Laufbursche42/niu-update/raw/main/kqi2-pro/de/update.json

EU  25 km/h  K2E01J23  27956
https://github.com/Laufbursche42/niu-update/raw/main/kqi2-pro/eu/update.json

US  28 km/h  K2E13J23  27956
https://github.com/Laufbursche42/niu-update/raw/main/kqi2-pro/us/update.json
```

### KQi3 Sport

```
DE  20 km/h  K3E38J23  27456
https://github.com/Laufbursche42/niu-update/raw/main/kqi3-sport/de/update.json

EU  25 km/h  K3E01J23  27836
https://github.com/Laufbursche42/niu-update/raw/main/kqi3-sport/eu/update.json

US  28 km/h  K3E13J23  27828
https://github.com/Laufbursche42/niu-update/raw/main/kqi3-sport/us/update.json
```

### KQi3 Pro

```
DE  20 km/h  K3E38J23  27196
https://github.com/Laufbursche42/niu-update/raw/main/kqi3-pro/de/update.json

EU  25 km/h  K3E01J23  27576
https://github.com/Laufbursche42/niu-update/raw/main/kqi3-pro/eu/update.json

US  32 km/h  K3E13J23  27608
https://github.com/Laufbursche42/niu-update/raw/main/kqi3-pro/us/update.json
```

### KQi3 Max

```
DE  21 km/h  K3E38J23  27412
https://github.com/Laufbursche42/niu-update/raw/main/kqi3-max/de/update.json

EU  25 km/h  K3E01J23  27820
https://github.com/Laufbursche42/niu-update/raw/main/kqi3-max/eu/update.json

US  32 km/h  K3E13J23  27792
https://github.com/Laufbursche42/niu-update/raw/main/kqi3-max/us/update.json
```

### KQi 300X

```
DE  21 km/h *  KBE38D05  29696
https://github.com/Laufbursche42/niu-update/raw/main/kqi-300x/de/update.json

EU  25 km/h *  KBE01D03  29696
https://github.com/Laufbursche42/niu-update/raw/main/kqi-300x/eu/update.json

US  32 km/h *  KBE13D03  29696
https://github.com/Laufbursche42/niu-update/raw/main/kqi-300x/us/update.json
```

\* Beim 300X steht kein Limit im Dateinamen. Die Werte sind aus der Firmware ermittelt, nicht
offiziell angegeben.

Falls eine URL nicht angenommen wird, liefert dieselbe Datei auch
`https://raw.githubusercontent.com/Laufbursche42/niu-update/main/MODELL/REGION/update.json`.

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

Das Löschen entfernt auch die Anmeldung, du musst dich neu einloggen. Die Bindung des E-Scooters
liegt auf dem NIU-Server und bleibt dabei erhalten.

## Rechtlicher Hinweis

Mit der US-Firmware ist die Drossel aufgehoben. Die ABE erlischt und der Betrieb auf öffentlichen
Wegen ist damit nicht erlaubt. Gedacht für das eigene Gerät auf privatem Gelände.

Ein fehlgeschlagener Flash des FOC-Controllers kann den E-Scooter unbrauchbar machen.

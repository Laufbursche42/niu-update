# niu-update

`update.json` für den Manual-Update-Mod der gepatchten NIU-App 4.8.12
(https://files.catbox.moe/lxckb9.apk). Eingespielt wird die US-Firmware für den FOC-Controller des
NIU KQi 300X.

Voraussetzung ist eine App, die den Bildschirm "Niu Manual Update" enthält. In der ungepatchten
App gibt es diesen Weg nicht.

## URL zum Kopieren

```
https://github.com/Laufbursche42/niu-update/raw/main/update.json
```

Genau diese URL eintragen. Die Variante mit `raw.githubusercontent.com` am Anfang funktioniert
nicht, und die URL muss `.json` enthalten, sonst wird sie verworfen.

## In der App eintragen

1. App öffnen und auf **Einstellungen** -> **Über** gehen. Es öffnet sich der Bildschirm
   "Niu Manual Update"
2. Die URL in das Feld **Link to update json** einfügen
3. Den Knopf **Update** drücken. Der Toast muss die URL anzeigen. Kommt stattdessen die Meldung
   "You must provide a link to a json file", wurde sie nicht gespeichert
4. **Back to main app**
5. Mit dem E-Scooter verbinden und die Firmwareaktualisierung öffnen. Der Eintrag FOC muss als
   verfügbar angezeigt werden

## Was eingespielt wird

| Feld | Wert |
|---|---|
| devicetype | FOC, der Motor-Controller |
| version | KBE13M02 |
| size | 29696 Byte |
| Image | `KBE13M02.bin` aus `hjcday/KQi-300X-Firmware`, US-Region |

Die `update.json` tritt an die Stelle der Serverantwort auf `v5/ota/checkupdate`. Der Mod ruft
sie per GET ab, deshalb reicht ein gewöhnlicher statischer Host.

## App-Daten löschen, falls kein Update angeboten wird

Die App merkt sich je Bauteil, welche Firmware-Version sie zuletzt erfolgreich eingespielt hat.
Steht dort bereits derselbe Wert den die `update.json` anbietet, wird das Update nicht mehr
angezeigt, obwohl es gar nicht auf dem E-Scooter ist. Der Abgleich ist ein reiner Textvergleich,
am Gerät wird nichts nachgeprüft.

Diese `update.json` benutzt deshalb absichtlich das Label `KBE13M02` statt der offiziellen
Versionsangabe `KBE13D03`. Der Vergleich kann damit nicht treffen und das Löschen der Daten ist
normalerweise nicht nötig. Das Label ist reine Anzeige, es ändert nichts an den Bytes die auf
den Controller gehen.

Falls es doch nötig wird, ohne Root:

1. Zuerst die Bluetooth-Schlüssel sichern. Im Bildschirm "Niu Manual Update" unter
   **BT Secrets!** auf **Copy to clipboard** drücken und die Zeichenkette dauerhaft ablegen,
   zum Beispiel per Mail an sich selbst. Ohne diese Schlüssel ist nach einer Kontosperrung keine
   Bluetooth-Verbindung mehr möglich
2. In Android **Einstellungen** -> **Apps** -> **NIU** -> **Speicher** -> **Daten löschen**.
   Bei manchen Herstellern heißt der Punkt "Speicher und Cache"
3. App neu starten, anmelden und den E-Scooter neu verbinden
4. Die URL wie oben beschrieben neu eintragen, sie wurde beim Löschen mit entfernt

Das Löschen entfernt auch Login und Bindung. Der E-Scooter muss danach neu verbunden werden.

## Rechtlicher Hinweis

Mit der US-Firmware ist die Drossel aufgehoben. Die ABE erlischt und der Betrieb auf öffentlichen
Wegen ist damit nicht erlaubt. Gedacht für das eigene Gerät auf privatem Gelände.

Ein fehlgeschlagener Flash des FOC-Controllers kann den E-Scooter unbrauchbar machen.

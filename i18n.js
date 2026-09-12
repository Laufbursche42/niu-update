'use strict';

// Jede sichtbare Zeichenkette der Seite in beiden Sprachen. Die Schlüssel passen zu den
// data-t-Attributen in index.html und zu den t()-Aufrufen in app.js. Deutsch ist Standard.
window.I18N = {
  de: {
    pageTitle: "Laufbursche NIU Firmware Updater",
    brandSub: "NIU Firmware Updater",
    langGroup: "Sprache",
    themeToLight: "Auf helle Darstellung umschalten",
    themeToDark: "Auf dunkle Darstellung umschalten",

    s1Title: "So fängst du an",
    sub: "Fertige update.json-Links für den Manual-Update-Mod der gepatchten NIU-App. Damit lädt die App eine Firmware für den FOC-Controller von einer eigenen URL statt vom NIU-Server. Modell und Region wählen, Link kopieren, in der App eintragen.",
    expWarn: "Machbarkeitsstudie: Diese Seite zeigt, was der OTA-Mechanismus eines NIU KQi technisch hergibt. Sie ist kein fertiges Produkt. Fehlerfreier Betrieb wird nicht versprochen, es gibt keinerlei Gewährleistung. Alles, was du hier tust, tust du auf eigenes Risiko. <a href=\"#\" data-open-disclaimer>Haftungsausschluss lesen</a>.",
    ownDevice: "Nur am eigenen Fahrzeug auf privatem Gelände. Mit einer Firmware aus einer anderen Region ist die Drossel aufgehoben, die ABE erlischt und der Betrieb auf öffentlichen Wegen ist dann nicht erlaubt.",

    appTitle: "Gepatchte App",
    appHint: "Gebraucht wird die gepatchte NIU-App 4.8.12 mit dem Bildschirm \"Niu Manual Update\". In der ungepatchten App gibt es diesen Weg nicht. Der Bildschirm öffnet sich in der App unter Einstellungen -> Über.",
    appApkLabel: "APK der gepatchten App 4.8.12",
    btnCopy: "Kopieren",
    copied: "Kopiert",
    copyFail: "Kopieren fehlgeschlagen, bitte die URL von Hand markieren",

    filterTitle: "Filter",
    allModels: "Alle Modelle",
    allRegions: "Alle Regionen",
    filterHint: "Modell und Region antippen. Die Liste unten zeigt nur die passenden Links, jeder Link hat einen eigenen Kopier-Knopf.",

    unitBytes: "Byte",
    inferredNote: "* Beim 300X steht kein Limit im Dateinamen. Die Werte sind aus der Firmware ermittelt, nicht offiziell angegeben.",

    stepsTitle: "Eintragen in der App",
    step1: "App öffnen und auf Einstellungen -> Über gehen. Es öffnet sich der Bildschirm \"Niu Manual Update\".",
    step2: "Den kopierten Link in das Feld \"Link to update json\" einfügen.",
    step3: "Den Knopf Update drücken. Der Toast muss die URL anzeigen. Kommt stattdessen \"You must provide a link to a json file\", wurde sie nicht gespeichert.",
    step4: "Back to main app drücken.",
    step5: "Mit dem E-Scooter verbinden und die Firmwareaktualisierung öffnen. Der Eintrag FOC muss als verfügbar angezeigt werden.",
    stepsNote: "Die App ruft den Link per GET ab, deshalb reicht ein gewöhnlicher statischer Host. Enthalten ist nur das Bauteil FOC, damit nichts anderes angefasst wird.",

    dataTitle: "App-Daten löschen",
    dataWhy: "Die App merkt sich je Bauteil, welche Firmware-Version sie zuletzt erfolgreich eingespielt hat. Steht dort bereits derselbe Wert den die update.json anbietet, wird das Update nicht mehr angezeigt, obwohl es gar nicht auf dem E-Scooter ist. Der Abgleich ist ein reiner Textvergleich, am Gerät wird nichts nachgeprüft. Passieren kann das nur nach einem tatsächlich abgeschlossenen Flash.",
    dataStep1: "Zuerst die Bluetooth-Schlüssel sichern. Im Bildschirm \"Niu Manual Update\" unter \"BT Secrets!\" auf \"Copy to clipboard\" drücken und die Zeichenkette dauerhaft ablegen, zum Beispiel per Mail an sich selbst. Ohne diese Schlüssel ist nach einer Kontosperrung keine Bluetooth-Verbindung mehr möglich.",
    dataStep2: "In Android Einstellungen -> Apps -> NIU -> Speicher -> Daten löschen. Bei manchen Herstellern heißt der Punkt \"Speicher und Cache\".",
    dataStep3: "App neu starten, anmelden und den E-Scooter neu verbinden.",
    dataStep4: "Den Link wie oben beschrieben neu eintragen, er wurde beim Löschen mit entfernt.",
    dataNote: "Das Löschen entfernt auch die Anmeldung, du musst dich neu einloggen. Die Bindung des E-Scooters liegt auf dem NIU-Server und bleibt dabei erhalten. Root wird dafür nicht gebraucht.",

    srcTitle: "Quelle",
    srcHint: "Die Firmware stammt unverändert aus den beiden Community-Repos. Von dort übernommen sind nur die update.json, dieses Repo verteilt keine Firmware.",
    srcFix: "Da es Nutzer gab, die mit den update.json aus diesen Repos Probleme hatten, wurden sie angepasst und werden hier neu bereitgestellt.",
    srcShLabel: "Original-Repo KQi2 und KQi3",
    srcHjLabel: "Original-Repo KQi 300X",

    footSource: "Quellcode",
    footReadme: "Readme",
    footDisclaimer: "Haftungsausschluss",
    footPrivacy: "Datenschutz",
    footTrademarks: "Marken",
    docClose: "Schließen",
    buildLabel: "Build",

    helpAppTitle: "Gepatchte App",
    helpApp: "Die offizielle NIU-App fragt die Firmware-Informationen beim NIU-Server ab (v5/ota/checkupdate) und bietet nur an, was der Server für diese Seriennummer zurückgibt. Die gepatchte App 4.8.12 hat zusätzlich den Bildschirm \"Niu Manual Update\" unter Einstellungen -> Über. Dort trägst du die URL einer eigenen update.json ein, und die App fragt statt des NIU-Servers diese URL ab. Der Bildschirm enthält außerdem einen Knopf, der die Bluetooth-Schlüssel in die Zwischenablage kopiert. Sichere sie dir, falls dein Konto gesperrt wird.",
    helpStepsTitle: "Ablauf in der App",
    helpSteps: "Der Link muss die Zeichenkette .json enthalten, sonst verwirft die App ihn. Nach dem Speichern zeigt ein Toast die abgelegte URL, daran siehst du dass sie gesetzt ist. Danach den OTA-Bildschirm neu öffnen, damit die Abfrage erneut läuft. Die App prüft nach dem Download nur die Dateigröße gegen den Wert aus der update.json, darum muss size exakt stimmen.",
    helpDataTitle: "Warum die Daten löschen",
    helpData: "Die Version die die App je Bauteil als zuletzt erfolgreich eingespielt gespeichert hat, liegt in einem internen Speicher (ota_share). Bietet die update.json genau diese Zeichenkette erneut an, blendet die App das Update aus. Das ist sinnvoll wenn die Firmware wirklich schon drauf ist, und falsch wenn ein Flash abgebrochen wurde. Der Speicher lässt sich ohne Root nur über die Android-App-Daten löschen. Dabei gehen die Anmeldung und die vom Mod gespeicherten Bluetooth-Schlüssel verloren, die Bindung bleibt auf dem Server. Die Schlüssel lädt die App nach dem Einloggen neu, sichern solltest du sie dir trotzdem für den Fall einer Kontosperrung.",
    disclaimerTitle: "Haftungsausschluss",
    disclaimerText: "Dieses Werkzeug ist eine Machbarkeitsstudie, kein fertiges Produkt. Es gibt keine Gewährleistung und keine Garantie für fehlerfreien Betrieb. Das Einspielen einer Firmware aus einer anderen Region hebt die Drossel auf: die ABE erlischt und der Betrieb auf öffentlichen Wegen ist dann nicht erlaubt. Ein fehlgeschlagener Flash des FOC-Controllers kann den E-Scooter unbrauchbar machen. Nutzung ausschließlich am eigenen Fahrzeug und auf eigenes Risiko. Diese Seite sendet keine Daten an einen Server, sie zeigt nur statische Links. Die Firmware-Binaries liegen in den Quell-Repos und werden hier nicht verbreitet. NIU und KQi sind Marken des jeweiligen Inhabers. Dieses Projekt ist unabhängig und nicht mit NIU verbunden."
  },

  en: {
    pageTitle: "Laufbursche NIU Firmware Updater",
    brandSub: "NIU Firmware Updater",
    langGroup: "Language",
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",

    s1Title: "Getting started",
    sub: "Ready-made update.json links for the Manual Update mod of the patched NIU app. They make the app load a firmware for the FOC controller from your own URL instead of from the NIU server. Pick model and region, copy the link, enter it in the app.",
    expWarn: "Feasibility study: this page shows what the OTA mechanism of a NIU KQi makes possible. It is not a finished product. Error-free operation is not promised and there is no warranty of any kind. Whatever you do here, you do at your own risk. <a href=\"#\" data-open-disclaimer>Read the disclaimer</a>.",
    ownDevice: "Only on your own vehicle on private ground. With firmware from another region the throttle limit is lifted, the road approval lapses and operating it on public roads is then not allowed.",

    appTitle: "Patched app",
    appHint: "You need the patched NIU app 4.8.12 that contains the \"Niu Manual Update\" screen. The unpatched app has no such path. The screen opens in the app under Settings -> About.",
    appApkLabel: "APK of the patched app 4.8.12",
    btnCopy: "Copy",
    copied: "Copied",
    copyFail: "Copy failed, please select the URL by hand",

    filterTitle: "Filter",
    allModels: "All models",
    allRegions: "All regions",
    filterHint: "Tap a model and a region. The list below shows only the matching links, and every link has its own copy button.",

    unitBytes: "bytes",
    inferredNote: "* The 300X filename carries no limit. These values were derived from the firmware and are not officially stated.",

    stepsTitle: "Entering it in the app",
    step1: "Open the app and go to Settings -> About. The \"Niu Manual Update\" screen opens.",
    step2: "Paste the copied link into the field \"Link to update json\".",
    step3: "Press the Update button. The toast must show the URL. If it shows \"You must provide a link to a json file\" instead, the link was not saved.",
    step4: "Press Back to main app.",
    step5: "Connect to the scooter and open the firmware update screen. The FOC entry must show as available.",
    stepsNote: "The app fetches the link with a GET request, so any ordinary static host works. Only the FOC component is included, so nothing else is touched.",

    dataTitle: "Clearing the app data",
    dataWhy: "The app remembers per component which firmware version it last flashed successfully. If that already equals the version the update.json offers, the update is no longer shown even though it is not on the scooter. The check is a plain text comparison, nothing is verified on the device. It can only happen after a flash that actually completed.",
    dataStep1: "Save the Bluetooth keys first. On the \"Niu Manual Update\" screen press \"Copy to clipboard\" under \"BT Secrets!\" and keep the string somewhere durable, for example mail it to yourself. Without those keys there is no Bluetooth connection any more if your account gets banned.",
    dataStep2: "In Android go to Settings -> Apps -> NIU -> Storage -> Clear data. On some phones the entry is called \"Storage and cache\".",
    dataStep3: "Restart the app, log in and reconnect the scooter.",
    dataStep4: "Enter the link again as described above, it was removed along with the data.",
    dataNote: "Clearing also removes the login, so you have to sign in again. The scooter binding lives on the NIU server and is not affected. No root is needed for this.",

    srcTitle: "Source",
    srcHint: "The firmware comes unchanged from the two community repos. Only the update.json files were taken from there, this repo distributes no firmware.",
    srcFix: "Some users had problems with the update.json files in these repos, so they were adapted and are provided here instead.",
    srcShLabel: "Original repo for KQi2 and KQi3",
    srcHjLabel: "Original repo for the KQi 300X",

    footSource: "Source",
    footReadme: "Readme",
    footDisclaimer: "Disclaimer",
    footPrivacy: "Privacy",
    footTrademarks: "Trademarks",
    docClose: "Close",
    buildLabel: "build",

    helpAppTitle: "Patched app",
    helpApp: "The official NIU app asks the NIU server for the firmware information (v5/ota/checkupdate) and only offers what the server returns for that serial number. The patched app 4.8.12 adds the \"Niu Manual Update\" screen under Settings -> About. There you enter the URL of your own update.json and the app queries that URL instead of the NIU server. The screen also has a button that copies the Bluetooth keys to the clipboard. Save them in case your account gets banned.",
    helpStepsTitle: "The procedure in the app",
    helpSteps: "The link must contain the string .json, otherwise the app rejects it. After saving, a toast shows the stored URL, which is how you confirm it was set. Then reopen the OTA screen so the query runs again. After the download the app only checks the file size against the value in the update.json, which is why size has to match exactly.",
    helpDataTitle: "Why clear the data",
    helpData: "The version the app has stored per component as the last one flashed successfully lives in an internal store (ota_share). If the update.json offers exactly that string again, the app hides the update. That is correct when the firmware really is installed, and wrong when a flash was aborted. Without root the store can only be cleared through the Android app data. Doing so removes the login and the Bluetooth keys the mod has saved, while the binding stays on the server. The app downloads the keys again after you log in, but save them anyway in case the account gets banned.",
    disclaimerTitle: "Disclaimer",
    disclaimerText: "This tool is a feasibility study, not a finished product. There is no warranty and no guarantee of error-free operation. Flashing firmware from another region lifts the throttle limit: the type approval becomes void and riding on public roads is then not allowed. A failed flash of the FOC controller can leave the scooter unusable. Use it only on your own vehicle and at your own risk. This page sends no data to any server, it only shows static links. The firmware binaries live in the source repos and are not distributed here. NIU and KQi are trademarks of their respective owner. This project is independent and not affiliated with NIU."
  }
};

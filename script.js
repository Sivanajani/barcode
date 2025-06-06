const outputElement = document.getElementById('output');

function onScanSuccess(decodedText, decodedResult) {
  outputElement.textContent = decodedText;
  console.log("Gescannter Code:", decodedText);

  html5QrcodeScanner.clear().then(() => {
    // Wenn als Popup geöffnet:
    if (window.opener) {
      // Sende den Barcode an das Hauptfenster
      window.opener.postMessage(
        { type: "barcode-scan", barcode: decodedText },
        "*" // oder spezifische URL für mehr Sicherheit
      );

      // Schließe das Scanner-Fenster nach kurzer Pause
      setTimeout(() => window.close(), 300);
    } else {
      console.warn("Kein opener gefunden.");
    }
  });
}

const html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: 250 }
);
html5QrcodeScanner.render(onScanSuccess);

const outputElement = document.getElementById('output');

function onScanSuccess(decodedText, decodedResult) {
  outputElement.textContent = decodedText;
  console.log("Gescannter Code:", decodedText);

  html5QrcodeScanner.clear().then(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");

    if (redirect) {
      const targetUrl = `${redirect}?barcode=${encodeURIComponent(decodedText)}`;

      // Wenn als Popup geöffnet: opener verwenden und Fenster schließen
      if (window.opener) {
        window.opener.location.href = targetUrl;
        setTimeout(() => window.close(), 300); // leicht verzögert schließen
      } else {
        // Wenn kein opener: normale Weiterleitung
        window.location.href = targetUrl;
      }
    } else {
      console.warn("Kein redirect-Parameter gefunden.");
    }
  });
}

// Scanner initialisieren
const html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: 250 }
);

html5QrcodeScanner.render(onScanSuccess);
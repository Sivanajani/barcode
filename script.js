const outputElement = document.getElementById('output');

function onScanSuccess(decodedText, decodedResult) {
  outputElement.textContent = decodedText;
  console.log("Gescannter Code:", decodedText);

  html5QrcodeScanner.clear(); // Stoppt den Scanner

  // Barcode auslesen und zurückleiten
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get("redirect");

  if (redirect) {
    // Leite mit Barcode zurück zur App
    window.location.href = `${redirect}?barcode=${encodeURIComponent(decodedText)}`;
  } else {
    console.warn("Kein redirect-Parameter gefunden.");
  }
}

// Scanner initialisieren
const html5QrcodeScanner = new Html5QrcodeScanner(
  "reader", { fps: 10, qrbox: 250 });

html5QrcodeScanner.render(onScanSuccess);
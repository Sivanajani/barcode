const outputElement = document.getElementById('output');

function onScanSuccess(decodedText, decodedResult) {
  outputElement.textContent = decodedText;
  console.log("Gescannter Code:", decodedText);

  html5QrcodeScanner.clear(); // Scanner stoppen

  // 👇 Rücksprung zur Hauptseite mit Barcode
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get("redirect");

  if (redirect) {
    window.location.href = `${redirect}?barcode=${encodeURIComponent(decodedText)}`;
  }
}

const html5QrcodeScanner = new Html5QrcodeScanner(
  "reader", { fps: 10, qrbox: 250 });

html5QrcodeScanner.render(onScanSuccess);
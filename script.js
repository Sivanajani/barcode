const outputElement = document.getElementById('output');

function onScanSuccess(decodedText, decodedResult) {
  outputElement.textContent = decodedText;
  console.log("Gescannter Code:", decodedText);
  html5QrcodeScanner.clear(); // Stoppt den Scanner nach erstem Treffer
}

const html5QrcodeScanner = new Html5QrcodeScanner(
  "reader", { fps: 10, qrbox: 250 });

html5QrcodeScanner.render(onScanSuccess);

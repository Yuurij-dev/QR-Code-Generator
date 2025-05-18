let qr;

  const qrcode = new QRCode(document.getElementById("qrcode"), {
    text: "https://seusite.com",
    width: 200,
    height: 200,
    correctLevel: QRCode.CorrectLevel.H
  });


function generateQRCode() {
  const url = document.getElementById("urlInput").value;
  const qrContainer = document.getElementById("qrcode");
  const areaInput = document.getElementById('area-input')
  const areaCode = document.getElementById("area-code")

  const erroInput = document.getElementById('erro-input')

  if (!url) {
    erroInput.style.visibility = 'visible'
    return;
  }

  // Limpa QR antigo
  areaInput.style.right = '2000px' 
  areaCode.style.left = 0
  qrContainer.style.display = "block";
  qrContainer.innerHTML = "";

  // Cria novo QR Code
  qr = new QRCode(qrContainer, {
    text: url,
    width: 200,
    height: 200,
    colorDark: "#111629",   
  });
}

  function downloadQRCode() {
    // Seleciona o canvas diretamente
    const canvas = document.querySelector('#qrcode canvas');

    if (!canvas) {
      alert("Por favor, gere um QR Code primeiro.");
      return;
    }

    canvas.toBlob(function (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "qrcode.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }
  //

function copyToClipboard() {
  const url = document.getElementById("urlInput").value;
  const share = document.getElementById('share')

  if (!url) {
    alert("Por favor, insira uma URL.");
    return;
  }

  navigator.clipboard.writeText(url)
    .then(() => {
        share.innerHTML = 'Copied successfully'
        share.classList.add('active-button')
    })
    .catch(() => alert("Falha ao copiar."));
}

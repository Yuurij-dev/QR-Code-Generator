let qr;

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
  const img = document.querySelector("#qrcode img");

  if (!img) {
    alert("Por favor, gere um QR Code primeiro.");
    return;
  }

  // Converte a imagem base64 em blob
  fetch(img.src)
    .then(res => res.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode.png";
      document.body.appendChild(link); // Necessário para alguns browsers
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Libera a memória
    })
    .catch(err => {
      alert("Erro ao tentar baixar o QR Code.");
      console.error(err);
    });
}

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

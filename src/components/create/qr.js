import React from 'react';
import QRCode from "qrcode.react";

export function QR() {
  const downloadQR = () => {
    const canvas = document.getElementById("123456");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "123456.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const url =  `${window.location.origin}/info/${localStorage.getItem('url')}`
  console.log(url)
  return (
    <>
      <h1>Qr</h1>
      <QRCode
        id="123456"
        value={url}
        size={290}
        level={"H"}
        includeMargin={true}
      />
      <a onClick={downloadQR}> Download QR </a>
    </>
  )
}

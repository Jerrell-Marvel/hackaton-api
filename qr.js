import qr from "qrcode";
import fs from "fs";

// let data = {
//   name: "chris",
//   email: "christianhadinata@gmail.com",
// };

// let stJson = JSON.stringify(data);
let stJson = "www.google.com";

const saveQRCode = (qrCodeData, fileName) => {
  const imagePath = `public/${fileName}`;
  fs.writeFile(imagePath, qrCodeData, "base64", (err) => {
    if (err) {
      return console.error("QR code failed to made", err);
    }
    console.log("success");
  });
};

qr.toDataURL(stJson, { type: "image/png" }, function (err, qrCodeData) {
  if (err) {
    return console.log("Fail to proccess qr code", err);
  }
  // change name image -> insert merchant ID
  const imageFileName = `${Date.now()}_merchantID.png`;
  saveQRCode(qrCodeData.replace(/^data:image\/png;base64,/, ""), imageFileName);
});

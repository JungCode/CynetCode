// encryption.js
import CryptoJS from "crypto-js";

const generateRandomIV = () => {
  const randomBytes = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 256)
  );
  return CryptoJS.lib.WordArray.create(randomBytes);
};

export const encryptAES = (message, password) => {
  const iv = generateRandomIV();

  const encrypted = CryptoJS.AES.encrypt(message, password, { iv });
  return `${iv.toString()}${encrypted.toString()}`;
};

export const decryptAES = (ciphertext, password) => {
  const iv = CryptoJS.enc.Hex.parse(ciphertext.substring(0, 32)); // Extract IV from ciphertext

  const decrypted = CryptoJS.AES.decrypt(ciphertext.substring(32), password, {
    iv,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

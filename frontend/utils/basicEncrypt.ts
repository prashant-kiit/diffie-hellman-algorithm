import CryptoJS from "crypto-js";
const KEY = "mysecretkey";

// Encrypt
export function encrypt(data: unknown) {
  const json = JSON.stringify(data);
  return CryptoJS.AES.encrypt(json, KEY).toString();
}

// Decrypt
export function decrypt(ciphertext: string) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
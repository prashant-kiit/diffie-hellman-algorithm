import CryptoJS from "crypto-js";
import keytar from "keytar";

async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Encrypt
export async function encrypt(data: any, username: string) {
  const oldkey = (await keytar.getPassword(
    "DiffieHellmanApp",
    `KEY-${username}`
  )) as string;
  console.log("oldkey", oldkey);
  const newkey = await sha256(oldkey);
  console.log("newkey", newkey);
  const json = JSON.stringify(data);
  await keytar.setPassword("DiffieHellmanApp", `KEY-${username}`, newkey);
  return CryptoJS.AES.encrypt(json, newkey).toString();
}

// Decrypt
// export function decrypt(ciphertext: string) {
//   const bytes = CryptoJS.AES.decrypt(ciphertext, KEY);
//   return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
// }

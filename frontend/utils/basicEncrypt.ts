import CryptoJS from "crypto-js";

async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Encrypt
// export function encrypt(data: unknown) {
//   const json = JSON.stringify(data);
//   return CryptoJS.AES.encrypt(json, KEY).toString();
// }

// Key should be provided only to valid users
// Hash should be stored in Context not in Local Storage
// User name specfic key from backend
// Can be a server action
// Have RSA Keys based on Double Ratched Hash
// Decrypt
export async function decrypt(ciphertext: string, key: string) {
  // const oldkey = localStorage.getItem("KEY") as string;
  // console.log("oldkey", oldkey);
  const newkey = await sha256(key);
  console.log("key", newkey);
  const bytes = CryptoJS.AES.decrypt(ciphertext, newkey);
  // localStorage.setItem("KEY", newkey);
  return [JSON.parse(bytes.toString(CryptoJS.enc.Utf8)), newkey];
}

import modPow from "./modPow";

async function fetchDynamicKey() {
  const privateDigit = Math.floor(Math.random() * 10);
  const generator = import.meta.env.VITE_GENERATOR;
  const primenumber = import.meta.env.VITE_PRIMENUMBER;
  // console.log(privateDigit);
  // console.log(import.meta.env.VITE_GENERATOR);
  // console.log(import.meta.env.VITE_PRIMENUMBER);
  const publicKeyClient = modPow(
    BigInt(generator),
    BigInt(privateDigit),
    BigInt(primenumber)
  );
  console.log(publicKeyClient);
  const response = await fetch(
    `http://localhost:8000/key?publicKeyClient=${publicKeyClient}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (response.ok) {
    const result = await response.json();
    const publicKeyServer = result?.publicKeyServer as string;
    const privateKeyClient = modPow(
      BigInt(publicKeyServer),
      BigInt(privateDigit),
      BigInt(primenumber)
    );
    // localStorage.setItem("KEY", result?.key);
    return String(privateKeyClient);
  }
}

export default fetchDynamicKey;

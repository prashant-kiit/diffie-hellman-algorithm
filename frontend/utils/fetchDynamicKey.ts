async function fetchDynamicKey() {
  const response = await fetch("http://localhost:8000/key", {
    method: "GET",
    credentials: "include",
  });
  if (response.ok) {
    const result = await response.json();
    localStorage.setItem("KEY", result?.key);
  }
}

export default fetchDynamicKey;

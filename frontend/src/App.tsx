import { useEffect, useState } from "react";
import Login from "./Login";
import Welcome from "./Welcome";
import fetchDynamicKey from "../utils/fetchDynamicKey";
import { dynamicKeyAtom } from "../atoms/dynamicKey";
import { useAtom } from "jotai";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dynamicKey, setDynamicKey] = useAtom(dynamicKeyAtom);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:8000/verify-token", {
          method: "GET",
          credentials: "include",
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error);
        }
        console.log(result);
        const key = await fetchDynamicKey();
        setDynamicKey(key);
        console.log("Dynamic key fetched", dynamicKey);
        setIsLoggedIn(true);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Welcome isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}

export default App;

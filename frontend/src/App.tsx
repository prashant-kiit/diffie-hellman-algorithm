import { useEffect, useState } from "react";
import Login from "./Login";
import Welcome from "./Welcome";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

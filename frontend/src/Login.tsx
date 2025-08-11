import { useState } from "react";
import fetchDynamicKey from "../utils/fetchDynamicKey";
import { dynamicKeyAtom } from "../atoms/dynamicKey";
import { useAtom } from "jotai";

function Login({
  setIsLoggedIn,
}: {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [dynamicKey, setDynamicKey] = useAtom(dynamicKeyAtom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/login?username=${formData?.username}&&password=${formData?.password}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error);
      }
      console.log(result);
      const key = await fetchDynamicKey();
      setDynamicKey(key);
      console.log(dynamicKey);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5>LOGIN</h5>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
        autoComplete="username"
      />
      <label htmlFor="password">Password</label>
      <input
        type="text"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        autoComplete="current-password"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;

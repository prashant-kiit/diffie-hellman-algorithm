import { useEffect, useState } from "react";

type Users = { username: string; password: string }[] | [];

function Welcome({
  isLoggedIn,
  setIsLoggedIn,
}: {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [users, setUsers] = useState<Users>([]);

  useEffect(() => {
    (async () => {
      await handleGetUsers();
    })();
  }, []);

  async function handleLogout(): Promise<void> {
    const response = await fetch("http://localhost:8000/logout", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const result = await response.json();
      alert(result.message);
      if (isLoggedIn) setIsLoggedIn(false);
    }
  }

  async function handleGetUsers(): Promise<void> {
    const response = await fetch("http://localhost:8000/users", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result?.message);
      setUsers(result?.message);
    }
  }

  return (
    <div className="welcome">
      <h3>Welcome</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={index}>
              <td>{user?.username}</td>
              <td>{user?.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-box">
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleGetUsers}>Users</button>
      </div>
    </div>
  );
}

export default Welcome;

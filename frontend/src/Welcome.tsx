function Welcome({
  isLoggedIn,
  setIsLoggedIn,
}: {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  async function handleLogout(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/logout", {
      method: "GET",
      credentials: "include",
    });

    if(response.ok) {
      const result = await response.json();
      alert(result.message);
      if (isLoggedIn) setIsLoggedIn(false);
    }
  }

  function handleGetUsers(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    e.preventDefault();
    console.log(document.cookie);
  }

  return (
    <div className="welcome">
      <h3>Welcome</h3>
      <p>Content</p>
      <div className="button-box">
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleGetUsers}>Users</button>
      </div>
    </div>
  );
}

export default Welcome;
